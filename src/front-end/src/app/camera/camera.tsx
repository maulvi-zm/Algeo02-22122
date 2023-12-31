"use client";

import React, { useEffect, useRef, useState } from "react";
import Filter from "./filter";
import { useToast } from "@/components/ui/use-toast";

function CameraVid() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const captureFrame = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadeddata = () => {
            setVideoReady(true);
          };
          mediaStream.current = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }

      return () => {
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((track) => {
            track.stop(); // Close the camera stream when leaving the page
          });
        }
      };
    };
    captureFrame();

    const intervalFunction = () => {
      let count = 5;
      const countdownInterval = setInterval(() => {
        if (count > 0) {
          count--;
        } else {
          clearInterval(countdownInterval);
          takeSnapshot();
        }
      }, 1000); // Interval set to 1 second
    };

    const interval = setInterval(intervalFunction, 6000); //6 seconds biar sama kaya filter

    return () => {
      clearInterval(interval);
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [videoReady, videoRef]);

  const takeSnapshot = () => {
    if (!videoReady || !videoRef.current) {
      console.log("Video stream not ready");
      return;
    }

    const canvas = document.createElement("canvas");
    const cropSize = 512; // Size of the cropped square
    const context = canvas.getContext("2d");

    if (context && videoRef.current) {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      const size = Math.min(videoWidth, videoHeight); // Get the minimum dimension

      canvas.width = cropSize;
      canvas.height = cropSize;

      context.drawImage(
        videoRef.current,
        (videoWidth - size) / 2, // Calculate the centered position for cropping
        (videoHeight - size) / 2,
        size,
        size,
        0,
        0,
        cropSize,
        cropSize
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Failed to create a Blob from the canvas image");
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const dataUrl = reader.result as string;
            setSnapshot(dataUrl); // Save image di state
          };

          const formData = new FormData();
          formData.append("file", blob, "snapshot.jpg");

          fetch("http://localhost:8000/capture_frame", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Image sent to the server:", data);
            })
            .catch((error) => {
              toast({
                title: "Something Went Wrong!",
                description: "Please try again later",
                variant: "destructive",
              });
            });
        },
        "image/jpeg",
        0.8
      );
    }
  };

  return (
    <div className='flex gap-10'>
      <div className='rounded-xl overflow-hidden w-[512px] h-[512px] '>
        {videoReady ? <Filter /> : null}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className='w-[512px] h-[512px] object-cover'
        />
      </div>

      <div className='rounded-xl w-[512px] h-[512px] flex justify-center items-center'>
        {snapshot ? (
          <img
            src={snapshot}
            alt='Snapshot'
            className='w-[512px] h-[512px] object-cover rounded-xl'
          />
        ) : (
          <p className='text-[24px] font-semibold text-center'>Please Wait</p>
        )}
      </div>
    </div>
  );
}

export default CameraVid;

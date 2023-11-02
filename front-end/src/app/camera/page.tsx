"use client";

import React, { useEffect, useRef, useState } from 'react';

function App() {
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaStream = useRef<MediaStream | null>(null);

    useEffect(() => {
        const captureFrame = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadeddata = () => {
                        setVideoReady(true);
                    };
                    mediaStream.current = stream;
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
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
            takeSnapshot();
        };

        const interval = setInterval(intervalFunction, 5000);

        // Clear the interval when the component unmounts
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
            console.log('Video stream not ready');
            return;
        }

        const canvas = document.createElement('canvas');
        const cropSize = 512; // Size of the cropped square
        const context = canvas.getContext('2d');

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

        canvas.toBlob((blob) => {
            if (!blob) {
                console.error('Failed to create a Blob from the canvas image');
                return;
            }
        
            const formData = new FormData();
            formData.append('file', blob, 'snapshot.jpg');
        
            fetch('http://localhost:8000/capture_frame', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                console.log('Image sent to the server:', data);
                })
                .catch((error) => {
                console.error('Error sending image:', error);
                });
            }, 'image/jpeg', 0.8);
        }
      };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline className='w-[512px] h-[512px] object-cover' />
        </div>
    );
}

export default App;

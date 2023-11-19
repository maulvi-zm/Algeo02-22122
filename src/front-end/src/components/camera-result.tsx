"use client";

import React from "react";
import RainbowTitle from "./ui/rainbow-title";
import Glass from "./ui/glassmorphism";
import RenderResult from "./render-result";
import Loading from "./ui/loading";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { clear } from "console";

export interface ImageData {
  url: string;
  percentage: number;
}

export interface JsonData {
  data: ImageData[];
  time: number;
}

const initialData: JsonData = {
  data: [],
  time: -1,
};

const texture: string = "http://localhost:8000/get-result-texture";
const color: string = "http://localhost:8000/get-result-color";

function CameraResult() {
  const [resultData, setResultData] = React.useState<JsonData>(initialData);
  const type = React.useRef<string>(color);
  const [load, setLoad] = React.useState<boolean>(false);
  const length = resultData.data.length;
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoad(true);
      const response = await fetch(type.current);
      if (!response.ok) {
        toast({
          title: "Something Went Wrong!",
          description: "Please try again later",
          variant: "destructive",
        });
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setResultData(jsonData);
    } catch (error) {
      toast({
        title: "Something Went Wrong!",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoad(false);
    }
  };

  const handleClick = () => {
    if (type.current === color) {
      type.current = texture;
    } else {
      type.current = color;
    }
  };

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const delayTimeout = setTimeout(() => {
      intervalId = setInterval(fetchData, 6000);
    }, 8000);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className='w-[80%]'>
        <div className='w-full flex justify-between'>
          <RainbowTitle title='Result' />
          {resultData.time != -1 && (
            <RainbowTitle
              title={`${length} result in ${resultData.time.toFixed(
                2
              )} seconds`}
            />
          )}
        </div>

        <Glass className='space-y-8'>
          <div className='flex items-center gap-4'>
            <div className='p-[12px] bg-white rounded-lg flex items-center gap-2'>
              <p>Color</p>
              <Switch onClick={handleClick} />
              <p>Texture</p>
            </div>
          </div>

          {load ? <Loading /> : <RenderResult data={resultData} />}
        </Glass>
      </div>
    </>
  );
}

export default CameraResult;

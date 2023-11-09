import React from "react";
import RainbowTitle from "./ui/rainbow-title";
import Glass from "./ui/glassmorphism";
import RenderResult from "./render-result";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import { Switch } from "./ui/switch";

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
  time: 0,
};

const texture: string = "http://localhost:8000/get-result-texture";
const color: string = "http://localhost:8000/get-result-color";

function Results() {
  const [resultData, setResultData] = React.useState<JsonData>(initialData);
  const [type, setType] = React.useState<string>("color");
  const [Load, setLoad] = React.useState<boolean>(false);
  const length = resultData.data.length;

  const fetchData = async () => {
    try {
      setLoad(true);
      const response = await fetch("http://localhost:8000/get-result"); // Ganti URL dengan URL yang sesuai
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      setResultData(jsonData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const handleClick = () => {
    if (type === "color") {
      setType("texture");
    } else {
      setType("color");
    }
  };

  return (
    <>
      <div className='w-[80%]'>
        <div className='w-full flex justify-between'>
          <RainbowTitle title='Result' />
          {length > 0 && (
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
            <Button onClick={fetchData}>Search</Button>
          </div>

          {Load ? <Loading /> : <RenderResult data={resultData} />}
        </Glass>
      </div>
    </>
  );
}

export default Results;

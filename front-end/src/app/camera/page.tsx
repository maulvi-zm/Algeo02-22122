"use client";

import Glass from "@/components/ui/glassmorphism";
import CameraVid from "./camera";
import RainbowTitle from "@/components/ui/rainbow-title";
import DatasetInput from "./dataset-input";

function Camera() {
  return (
    <>
      <div className='z-10 w-[80%]'>
        <Glass>
          <CameraVid />
        </Glass>
      </div>

      <div className='w-[80%]'>
        <RainbowTitle title='Dataset Input' />
        <Glass>
          <DatasetInput />
        </Glass>
      </div>
    </>
  );
}

export default Camera;

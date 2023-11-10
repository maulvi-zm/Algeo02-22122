import Camera1 from "@/assets/images/camera.png";
import Camera2 from "@/assets/images/camera2.png";
import Image from "next/image";
import RainbowTitle from "@/components/ui/rainbow-title";
import Glass from "@/components/ui/glassmorphism";
import HomeBG from "@/components/background/home";
import Hero from "./hero";

export default function Home() {
  return (
    <main className='flex h-auto flex-col justify-between p-24 relative gap-10 overflow-hidden'>
      <Hero />
      <div className='relative'>
        <HomeBG />
        <RainbowTitle title='Overview' />
        <Glass className='flex flex-row items-center'>
          <div className='text-[#292B48] flex-1 font-medium space-y-10'>
            <p className='w-full bg-white/80 rounded-xl p-10 border-2 border-white'>
              The major project We are currently working on for my Linear
              Algebra and Geometry course revolves around the implementation of
              &nbsp;
              <span className='underline font-semibold decoration-pink-500 decoration-2 underline-offset-2'>
                Content-Based Image Retrieval (CBIR)
              </span>{" "}
              using matrices and vectors. With the provided image datasets, I am
              tasked with developing a system that can retrieve images based on
              their{" "}
              <span className='underline font-semibold decoration-sky-500 decoration-2 underline-offset-2'>
                texture or color features
              </span>
              , employing various matrix and vector operations. This project
              serves as a practical application of the fundamental principles of
              linear algebra and geometry, allowing for a deeper understanding
              of their applications in modern technological solutions.
            </p>
          </div>
          <div className='h-[400px] overflow-hidden flex justify-center'>
            <Image
              src={Camera1}
              alt='camera'
              width={500}
              className='object-cover '
            />
          </div>
        </Glass>
      </div>

      <div className='flex flex-col items-end'>
        <RainbowTitle title='Overview' reversed />
        <Glass className='flex flex-row items-center'>
          <div className='h-full'>
            <Image
              src={Camera2}
              alt='camera'
              width={500}
              className='object-contain'
            />
          </div>
          <div className='text-[#292B48] flex-1 font-medium w-[50%]'>
            <p className='w-full bg-white/80 rounded-xl p-10 border-2 border-white'>
              Through this project, we aim to develop an efficient image
              retrieval system using the principles of linear algebra and
              geometry. By harnessing the power of matrices and vectors, we
              endeavor to create a platform that can accurately retrieve images
              based on their distinctive texture and color attributes. "smiLens"
              serves as a challenging yet enlightening opportunity to delve
              deeper into the intricate intersection of mathematics and modern
              image processing technologies.
            </p>
          </div>
        </Glass>
      </div>
    </main>
  );
}

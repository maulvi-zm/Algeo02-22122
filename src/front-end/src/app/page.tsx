import Camera1 from "@/assets/images/camera.png";
import Camera2 from "@/assets/images/camera2.png";
import Question from "@/assets/images/question.png";
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
              using matrices and vectors. With the provided image datasets, We
              are tasked with developing a system that can retrieve images based
              on their{" "}
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
              In the "smiLens" project, we're developing an efficient image
              retrieval system using linear algebra and geometry. This project
              also expanded our knowledge in both front end and back end
              development, exploring user interface design with HTML, CSS, and
              TypeScript, and learning back-end using python. "SmiLens" serves
              as a valuable learning experience in mathematics, image
              processing, and full-stack application development.
            </p>
          </div>
        </Glass>
      </div>

      <div className='flex flex-col'>
        <RainbowTitle title='How To Use' reversed />
        <Glass className='flex flex-row items-center'>
          <div className='text-[#292B48] flex-1 font-medium w-[50%] bg-white/80 rounded-xl p-10 border-2 border-white space-y-4'>
            <p className='text-[20px] font-semibold'>
              #Search image using another image.
            </p>
            <p>
              Step 1 Insert query images: Start by pressing upload button in
              Image Input secton. This image wil be the main image that will be
              compared against our dataset.{" "}
            </p>
            <p>
              Step 2 Insert data-set Press upload button and select the folder
              that has the data-set you prepared All set ! Now choose between
              color or texture method of search.{" "}
            </p>
            <p className='text-[20px] font-semibold'>
              {" "}
              #Search image using real-time camera.{" "}
            </p>{" "}
            <p>
              Step 1 Get ready infront of your camera. Wait for the first 5
              seconds, this range of time for you upload your data-set. After
              that wait for 5 seconds, and.. photo captured. The photo will be
              the query images.{" "}
            </p>
            <p>
              Step 2 Upload data-set. If you haven't uploaded your data-set yet
              in the first 5 seconds, you can upload your data-set. Fast! Before
              your photo uploaded again. The result will be automatically
              updated every times your photo captured.
            </p>
          </div>
          <div className='h-full'>
            <Image
              src={Question}
              alt='camera'
              width={500}
              className='object-contain'
            />
          </div>
        </Glass>
      </div>
    </main>
  );
}

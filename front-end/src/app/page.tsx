import CameraImage from "@/assets/images/camera.png";
import BgHome from "@/assets/background/bg-home.png";
import Image from "next/image";
import RainbowTitle from "@/components/ui/rainbow-title";
import Glass from "@/components/ui/glassmorphism";

export default function Home() {
  return (
    <main className='flex h-auto flex-col justify-between p-24 relative gap-10'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full'>
        <svg
          // width='1920'
          // height='1080'
          // viewBox='0 0 1920 1080'
          className='w-full h-full object-cover'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_f_1_3)'>
            <path
              d='M310.057 1133.1C-155.282 279.048 670.13 242.015 1194.5 279.048M2042 64.5C1851.49 454.12 1610.97 308.461 1194.5 279.048M1194.5 279.048C1417.27 786.239 2315.65 1388.55 426.5 1151'
              stroke='url(#paint0_linear_1_3)'
              stroke-width='842.177'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_1_3'
              x='-654.805'
              y='-557.759'
              width='3481.64'
              height='2589.75'
              filterUnits='userSpaceOnUse'
              color-interpolation-filters='sRGB'
            >
              <feFlood flood-opacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='203.274'
                result='effect1_foregroundBlur_1_3'
              />
            </filter>
            <linearGradient
              id='paint0_linear_1_3'
              x1='1693.93'
              y1='1101.69'
              x2='169.266'
              y2='118.206'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#FC833F' />
              <stop offset='0.208333' stop-color='#FD5E5E' />
              <stop offset='0.432292' stop-color='#EC5CF9' />
              <stop offset='1' stop-color='#5194E2' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='w-full text-center my-20 flex flex-col items-center'>
        {/* bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent  */}
        <p className='font-extrabold text-[64px] text-white'>
          What is smiLens?
        </p>
        <p className='w-[70%] font-semibold opacity-80 '>
          It is the second major assignment of my Linear Algebra and Geometry
          course, focusing on the practical implementation of Content-Based
          Image Retrieval (CBIR) techniques.
        </p>
      </div>

      <div>
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
              src={CameraImage}
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
              src={CameraImage}
              alt='camera'
              width={400}
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

import CameraImage from "@/assets/images/camera.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-between p-24'>
      <div className='w-full text-center my-20 flex flex-col items-center'>
        <p className='bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-extrabold text-[64px] '>
          What is smiLens?
        </p>
        <p className='w-[70%] font-semibold opacity-80 '>
          It is the second major assignment of my Linear Algebra and Geometry
          course, focusing on the practical implementation of Content-Based
          Image Retrieval (CBIR) techniques.
        </p>
      </div>
      <div className='min-h-[500px] w-full bg-white/40 rounded-xl backdrop-blur-[100px] shadow-2xl  shadow-black/20 z-10 flex flex-row items-center p-10'>
        <div className='text-[#292B48] flex-1 font-medium space-y-10'>
          <p className='w-full bg-white/80 rounded-xl p-10 border-2 border-white'>
            The major project We are currently working on for my Linear Algebra
            and Geometry course revolves around the implementation of &nbsp;
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
            linear algebra and geometry, allowing for a deeper understanding of
            their applications in modern technological solutions.
          </p>
          <p className='w-full bg-white/80 rounded-xl p-10 border-2 border-white'>
            Through this project, we aim to develop an efficient image retrieval
            system using the principles of linear algebra and geometry. By
            harnessing the power of matrices and vectors, we endeavor to create
            a platform that can accurately retrieve images based on their
            distinctive texture and color attributes. "smiLens" serves as a
            challenging yet enlightening opportunity to delve deeper into the
            intricate intersection of mathematics and modern image processing
            technologies.
          </p>
        </div>
        <div className='h-full'>
          <Image
            src={CameraImage}
            alt='camera'
            width={400}
            className='object-contain'
          />
        </div>
      </div>

      <div className='absolute top-[50px] mx-auto rotate-0 z-0'>
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1000'
          viewBox='0 0 1357 1481'
          fill='none'
        >
          <g filter='url(#filter0_f_16_2152)'>
            <path
              d='M572.425 859.42C386.859 818.377 193.585 1176.25 120.143 1360.32L244.926 130.821C313.791 257.534 805.333 119.905 972.409 120.15C1139.49 120.396 1188.28 330.936 1230.11 413.556C1271.94 496.176 1097.44 586.725 990.342 667.797C883.241 748.869 804.382 910.724 572.425 859.42Z'
              fill='url(#paint0_linear_16_2152)'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_16_2152'
              x='0.143066'
              y='0.149902'
              width='1356.32'
              height='1480.17'
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
                stdDeviation='60'
                result='effect1_foregroundBlur_16_2152'
              />
            </filter>
            <linearGradient
              id='paint0_linear_16_2152'
              x1='148.28'
              y1='1128.13'
              x2='1380.57'
              y2='261.317'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#D62828' stop-opacity='0.56' />
              <stop
                offset='0.416667'
                stop-color='#FF70E8'
                stop-opacity='0.390625'
              />
              <stop offset='1' stop-color='#143ED6' stop-opacity='0' />
            </linearGradient>
          </defs>
        </svg> */}

        <svg
          width='1124'
          height='1077'
          viewBox='0 0 1124 1077'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.8' filter='url(#filter0_f_105_3)'>
            <circle
              cx='561.998'
              cy='514.998'
              r='361.528'
              transform='rotate(-17.3762 561.998 514.998)'
              fill='url(#paint0_linear_105_3)'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_105_3'
              x='0.373047'
              y='-46.627'
              width='1123.25'
              height='1123.25'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='100'
                result='effect1_foregroundBlur_105_3'
              />
            </filter>
            <linearGradient
              id='paint0_linear_105_3'
              x1='561.998'
              y1='153.47'
              x2='561.998'
              y2='876.525'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#00C2FF' stopOpacity='0' />
              <stop offset='1' stopColor='#FF29C3' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </main>
  );
}

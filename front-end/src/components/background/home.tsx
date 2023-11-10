import React from "react";

function HomeBG() {
  return (
    <div className='absolute -z-10 top-0 left-0 -translate-x-[7.7%] -translate-y-[15%] w-full h-full'>
      <svg
        width='1440'
        height='1500'
        viewBox='0 0 1440 1500'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <rect y='348' width='1440' height='1480' fill='url(#pattern0)' />
        <g filter='url(#filter0_f_0_1)'>
          <rect
            x='-118'
            y='100'
            width='1622'
            height='393'
            fill='url(#pattern1)'
          />
        </g>
        <defs>
          <pattern
            id='pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref='#image0_0_1'
              transform='matrix(0.00044686 0 0 0.000434783 -0.0138889 0)'
            />
          </pattern>
          <filter
            id='filter0_f_0_1'
            x='-218'
            y='0'
            width='1822'
            height='593'
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
              stdDeviation='50'
              result='effect1_foregroundBlur_0_1'
            />
          </filter>
          <pattern
            id='pattern1'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref='#image0_0_1'
              transform='matrix(0.000603865 0 0 0.0024564 -0.194444 0)'
            />
          </pattern>
          <image
            id='image0_0_1'
            width='2300'
            height='2300'
          />
        </defs>
      </svg>
    </div>
  );
}

export default HomeBG;
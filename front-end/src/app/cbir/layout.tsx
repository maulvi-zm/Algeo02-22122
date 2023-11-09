import CbirBG from "@/components/background/cbir";

export default function CbirLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 relative gap-10'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full object-cover'>
        {/* <svg
          className='w-full h-full'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_103_2)'>
            <rect width='1440' height='1916' fill='white' />
            <g filter='url(#filter0_f_103_2)'>
              <path
                d='M402.545 1644.96C-805.871 3260.73 3136.64 422.868 220.445 1096.62C-502.966 2303.13 778.834 -1232.96 859.359 575.871C935.985 631.082 891.922 505.042 1440 513.241'
                stroke='url(#paint0_linear_103_2)'
                strokeWidth='889.421'
              />
            </g>
          </g>
          <defs>
            <filter
              id='filter0_f_103_2'
              x='-744.711'
              y='-694.845'
              width='2809.99'
              height='3589.53'
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
                stdDeviation='150'
                result='effect1_foregroundBlur_103_2'
              />
            </filter>
            <linearGradient
              id='paint0_linear_103_2'
              x1='3438.42'
              y1='778.746'
              x2='3170.14'
              y2='-353.211'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#9964DE' />
              <stop offset='0.294792' stopColor='#FF19B1' />
              <stop offset='0.666667' stopColor='#FB8179' />
              <stop offset='1' stopColor='#FFB800' />
            </linearGradient>
            <clipPath id='clip0_103_2'>
              <rect width='1440' height='1916' fill='white' />
            </clipPath>
          </defs>
        </svg> */}
        <CbirBG />
      </div>

      {children}
    </main>
  );
}

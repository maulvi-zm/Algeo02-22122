export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 relative gap-10'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full object-cover'>
        <svg
          width='1440'
          height='1916'
          viewBox='0 0 1440 1916'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g filter='url(#filter0_f_103_3)'>
            <path
              d='M1089.5 1838C-118.916 3453.77 3546.1 238.911 629.901 912.661C-93.5103 2119.17 127.976 -1650.84 208.5 158C285.126 213.211 -1230.08 1302.3 -682 1310.5'
              stroke='url(#paint0_linear_103_3)'
              strokeWidth='889.421'
            />
          </g>
          <defs>
            <filter
              id='filter0_f_103_3'
              x='-1546.49'
              y='-1087.38'
              width='4078.14'
              height='4129.87'
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
                result='effect1_foregroundBlur_103_3'
              />
            </filter>
            <linearGradient
              id='paint0_linear_103_3'
              x1='3438.41'
              y1='778.747'
              x2='3170.14'
              y2='-353.211'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#94DEE9' />
              <stop offset='0.333333' stopColor='#3CFE8A' />
              <stop offset='0.666667' stopColor='#84FB79' />
              <stop offset='1' stopColor='#A6EF93' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {children}
    </main>
  );
}

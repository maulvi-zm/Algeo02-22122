import Glass from "@/components/ui/glassmorphism";
import React from "react";
import Image from "next/image";
import Maulvi from "@/assets/images/maulvi.png";
import Ojan from "@/assets/images/ojan.jpg";

function About() {
  return (
    <div className='flex flex-col gap-20 w-[80%] mt-20'>
      <Glass className='flex justify-between'>
        <div className='w-[60%]'>
          <p className='text-[32px] font-bold'>Maulvi Ziadinda Maulana</p>
          <p className='text-[24px]'>13522122</p>
          <p className='my-10 leading-relaxed'>
            I'm Maulvi, a passionate 3rd-semester undergraduate student pursuing
            Informatics Engineering at ITB. I am deeply engrossed in the world
            of{" "}
            <span className='underline font-semibold decoration-sky-500 decoration-2 underline-offset-2'>
              front-end development
            </span>{" "}
            and continuously honing my skills in this area to create engaging
            digital experiences. Currently, I'm expanding my skills into
            full-stack development, exploring the intricacies of back-end
            programming and databases.{" "}
            <p className='mt-4'>
              {" "}
              Check out my portofolio at{" "}
              <a
                className='underline'
                href='https://maulvi-zm.github.io'
                target='_blank'
              >
                maulvi-zm.github.io
              </a>
            </p>
          </p>
        </div>
        <div className='rounded-full overflow-hidden w-[300px] flex items-center h-full m-auto'>
          <Image src={Maulvi} alt='' width={300} height={300} className='' />
        </div>
      </Glass>

      <Glass className='flex flex-row-reverse justify-between'>
        <div className='w-[60%]'>
          <p className='text-[32px] font-bold'>Muhammad Fauzan Azhim</p>
          <p className='text-[24px]'>13522153</p>
          <p className='my-10 leading-relaxed'>
            Hello! I'm Fauzan, a{" "}
            <span className='underline font-semibold decoration-pink-500 decoration-2 underline-offset-2'>
              a passionate Game Developer
            </span>{" "}
            with a keen interest in{" "}
            <span className='underline font-semibold decoration-sky-500 decoration-2 underline-offset-2'>
              Capture The Flag (CTF) competitions
            </span>
            . Currently in his 3rd semester of Informatics Engineering, and i
            deeply involved in a mobile game project, which is yet to be named.
            If you want to contact me, sent dm at my instagram,{" "}
            <a
              className='underline'
              href='https://instagram.com/fauzannazz'
              target='_blank'
            >
              @fauzannazz
            </a>
            .
          </p>
        </div>
        <div className='rounded-full overflow-hidden w-[300px] flex items-center h-full m-auto'>
          <Image src={Ojan} alt='' width={300} height={300} className='' />
        </div>
      </Glass>
    </div>
  );
}

export default About;

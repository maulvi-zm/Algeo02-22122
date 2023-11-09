import Glass from "@/components/ui/glassmorphism";
import React from "react";
import Image from "next/image";
import Maulvi from "@/assets/images/maulvi.png";

function About() {
  return (
    <div className='flex flex-col gap-20'>
      <Glass className='flex justify-between'>
        <div className='w-[60%]'>
          <p className='text-[32px] font-bold'>Maulvi Ziadinda Maulana</p>
          <p className='text-[24px]'>13522122</p>
          <p className='my-10 leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            et laoreet nisi, laoreet vulputate magna. Ut mollis, elit vitae
            lobortis tempus, enim purus ullamcorper ligula, nec dignissim sapien
            sem nec odio. Nam risus enim, venenatis at cursus non, fermentum
            lobortis dolor. Etiam consequat vestibulum euismod. Vivamus laoreet
            vestibulum dignissim. Fusce vehicula laoreet eros at convallis.
            Phasellus velit ligula, feugiat sed elit vel, eleifend fermentum ex.
            Aliquam velit ex, egestas a tortor non, vehicula molestie leo. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Maecenas porttitor suscipit lacinia. Donec viverra
            ultricies scelerisque. Proin vel dui porttitor, malesuada velit eu,
            tempor sem. Etiam aliquet augue eget tristique posuere. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Vivamus magna lacus, imperdiet laoreet congue id,
            pulvinar a erat.
          </p>
        </div>
        <div className='rounded-full overflow-hidden w-[300px] flex items-center h-full m-auto'>
          <Image src={Maulvi} alt='' width={300} height={300} className='' />
        </div>
      </Glass>

      <Glass className='flex flex-row-reverse justify-between'>
        <div className='w-[60%]'>
          <p className='text-[32px] font-bold'>Muhammad Fauzan Azhim</p>
          <p className='text-[24px]'>13522122</p>
          <p className='my-10 leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            et laoreet nisi, laoreet vulputate magna. Ut mollis, elit vitae
            lobortis tempus, enim purus ullamcorper ligula, nec dignissim sapien
            sem nec odio. Nam risus enim, venenatis at cursus non, fermentum
            lobortis dolor. Etiam consequat vestibulum euismod. Vivamus laoreet
            vestibulum dignissim. Fusce vehicula laoreet eros at convallis.
            Phasellus velit ligula, feugiat sed elit vel, eleifend fermentum ex.
            Aliquam velit ex, egestas a tortor non, vehicula molestie leo. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Maecenas porttitor suscipit lacinia. Donec viverra
            ultricies scelerisque. Proin vel dui porttitor, malesuada velit eu,
            tempor sem. Etiam aliquet augue eget tristique posuere. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Vivamus magna lacus, imperdiet laoreet congue id,
            pulvinar a erat.
          </p>
        </div>
        <div className='rounded-full overflow-hidden w-[300px] flex items-center h-full m-auto'>
          <Image src={Maulvi} alt='' width={300} height={300} className='' />
        </div>
      </Glass>
    </div>
  );
}

export default About;

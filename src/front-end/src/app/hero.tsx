"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "@/components/ui/animated-title";

function Hero() {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [500, 800], [-1000, 0]);
  const x2 = useTransform(scrollY, [500, 800], [1000, 0]);

  return (
    <>
      <div className='w-full flex flex-col min-h-[680px] justify-center'>
        <AnimatedText>
          <p className='font-bold text-[72px] -translate-y-20'>smiLens.</p>
        </AnimatedText>
        <AnimatedText>
          <p className='w-[70%] text-[20px] opacity-80 -translate-y-20'>
            The second major assignment of our Linear Algebra and Geometry
            course, focusing on the practical implementation of Content-Based
            Image Retrieval (CBIR) techniques.
          </p>
        </AnimatedText>
      </div>
      <div className='w-full flex flex-col min-h-[680px] justify-center text-[72px] font-bold text-center gap-8'>
        <motion.p style={{ x: x1 }}>Made only by 2 people</motion.p>
        <motion.p style={{ x: x2 }}>But yet, nothing's impossible.</motion.p>
      </div>
    </>
  );
}

export default Hero;

import React from 'react';
import Image from 'next/image';

function MusicExperience() {
  return (
    <main className='w-full flex justify-center items-center mt-10 mb-1'>
      <div className="sm:w-full md:w-[80%] p-5 h-auto md:h-[400px] flex flex-col md:flex-row justify-center items-center bg-black">
        {/* Heading */}
        <div className="w-full md:w-[50%] p-4 text-center md:text-left">
          <h3 className="text-green-500 font-bold">Categories</h3>
          <h1 className="text-white font-bold text-3xl md:text-5xl pt-4">Enhance your</h1>
          <h1 className="text-white font-bold text-3xl md:text-5xl pt-4">Music Experience</h1>

          <div className='flex sm:flex-wrap sm:justify-center md:justify-start pt-5 pb-4 gap-4'>

            <div className='bg-slate-50 w-[70px] h-[70px] rounded-[50%] flex flex-col justify-center items-center'>
              <span className='font-bold text-lg'>23</span>
              <span className='sm:text-sx md:text-sm'>Hours</span>
            </div>

            <div className='bg-slate-50 w-[70px] h-[70px] rounded-[50%] flex flex-col justify-center items-center'>
              <span className='font-bold text-lg'>05</span>
              <span className='sm:text-sx md:text-sm'>Days</span>
            </div>

            <div className='bg-slate-50 w-[70px] h-[70px] rounded-[50%] flex flex-col justify-center items-center'>
              <span className='font-bold text-lg'>59</span>
              <span className='sm:text-sx md:text-sm'>Minutes</span>
            </div>

            <div className='bg-slate-50 w-[70px] h-[70px] rounded-[50%] flex flex-col justify-center items-center'>
              <span className='font-bold text-lg'>35</span>
              <span className='sm:text-sx md:text-sm'>Seconds</span>
            </div>
          </div>

          <button className="bg-green-700 hover:bg-green-800 px-7 py-2 text-white font-bold rounded-sm mt-3">
            Buy Now!
          </button>
        </div>

        {/* image */}
        <div className='sm:w-full md:w-[40%] lg-w-[40%] pl-6 justify-center items-center'>
          <Image
            src="/music.png"
            alt="music"
            width={500}
            height={500}
            className="relative z-10 w-full h-auto rounded-lg"
          />

        </div>
      </div>
    </main>
  );
}

export default MusicExperience;

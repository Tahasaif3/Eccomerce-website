import React from 'react';
import Image from 'next/image';

function MusicExperience() {
  return (
    <main className="w-full flex justify-center items-center mt-10 mb-1">
      <div className="w-full sm:w-[90%] md:w-[80%] p-5 h-auto flex flex-col md:flex-row justify-center items-center bg-black">
        {/* Heading */}
        <div className="w-full md:w-[50%] p-4 text-center md:text-left">
          <h3 className="text-green-500 font-bold">Categories</h3>
          <h1 className="text-white font-bold text-3xl md:text-5xl pt-4">Enhance your</h1>
          <h1 className="text-white font-bold text-3xl md:text-5xl pt-4">Music Experience</h1>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center md:justify-start pt-5 pb-4 gap-4">
            {[
              { value: "23", label: "Hours" },
              { value: "05", label: "Days" },
              { value: "59", label: "Minutes" },
              { value: "35", label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full flex flex-col justify-center items-center"
              >
                <span className="font-bold text-base sm:text-lg">{item.value}</span>
                <span className="text-xs sm:text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="bg-green-700 hover:bg-green-800 px-5 sm:px-7 py-2 text-white font-bold rounded-sm mt-3">
            Buy Now!
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-[40%] mt-6 md:mt-0 flex justify-center items-center">
          <Image
            src="/music.png"
            alt="music"
            width={500}
            height={500}
            className="w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}

export default MusicExperience;

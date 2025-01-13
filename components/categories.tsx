"use client"

import React, { useState } from 'react';
import { AiOutlineLaptop, AiOutlinePrinter } from 'react-icons/ai';
import { BiMicrochip } from 'react-icons/bi';
import { BsSmartwatch, BsTablet } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight, FaCamera, FaChargingStation, FaLightbulb, FaMicrophoneAlt, FaMobileAlt } from 'react-icons/fa';
import { FaHeadphones } from 'react-icons/fa6';
import { GiVirtualMarker } from 'react-icons/gi';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoWatchOutline } from 'react-icons/io5';
import { MdRouter, MdSpeakerGroup } from 'react-icons/md';
import { RiSmartphoneFill } from 'react-icons/ri';
import { TbDeviceGamepad } from 'react-icons/tb';

const CategoryBox = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className='group shadow-2xl border-solid border-2 rounded-md hover:bg-red-500 w-[150px] h-[150px] flex flex-col gap-y-2 justify-center items-center cursor-pointer relative'>
    <Icon className='text-4xl font-bold' />
    <p className='font-bold text-center text-sm'>{title}</p>
  </div>
);

function Categories() {
  const categories = [
    { icon: FaMobileAlt, title: 'Phones' },
    { icon: HiOutlineComputerDesktop, title: 'Computers' },
    { icon: BsSmartwatch, title: 'Smart Watches' },
    { icon: FaCamera, title: 'Cameras' },
    { icon: FaHeadphones, title: 'Headphones' },
    { icon: TbDeviceGamepad, title: 'Gaming' },
    { icon: BsTablet, title: 'Tablets' },
    { icon: AiOutlineLaptop, title: 'Laptops' },
    { icon: GiVirtualMarker, title: 'Virtual Reality' },
    { icon: BiMicrochip, title: 'PC Components' },
    { icon: MdRouter, title: 'Networking' },
    { icon: FaMicrophoneAlt, title: 'Microphones' },
    { icon: AiOutlinePrinter, title: 'Printers' },
    { icon: IoWatchOutline, title: 'Wearables' },
    { icon: FaLightbulb, title: 'Smart Home' },
    { icon: RiSmartphoneFill, title: 'Accessories' },
    { icon: MdSpeakerGroup, title: 'Speakers' },
    { icon: FaChargingStation, title: 'Charging Stations' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerRow = 6;
  const totalItems = categories.length;
  const maxIndex = Math.max(0, Math.ceil(totalItems / itemsPerRow) - 1);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  return (
    <section className='py-10'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
          <div>
            <h3 className='text-red-500 font-bold border-l-8 border-red-500 pl-3 ml-1'>Categories</h3>
            <h1 className='text-slate-900 font-bold text-2xl sm:text-3xl pt-4'>Browse By Category</h1>
          </div>

          <div className='flex gap-2 mt-4 sm:mt-0'>
            <div
              className='w-[46px] h-[46px] bg-transparent rounded-full flex justify-center items-center cursor-pointer'
              onClick={handlePrev}
            >
              <FaArrowLeft className='text-black' />
            </div>
            <div
              className='w-[46px] h-[46px] bg-transparent rounded-full flex justify-center items-center cursor-pointer'
              onClick={handleNext}
            >
              <FaArrowRight className='text-black' />
            </div>
          </div>
        </div>

        <div className='overflow-hidden bg-transparent'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className='flex-shrink-0 flex-grow-0 basis-1/6 px-2'
              >
                <CategoryBox icon={category.icon} title={category.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;

'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { FaArrowLeft, FaArrowRight, FaRegStar, FaStar } from 'react-icons/fa';
import { Eye, Heart } from 'lucide-react';
import { useRef } from 'react';

interface Products {
    name: string,
    image: string,
    price: number,
    originalPrice: number,
    rating: number;
    reviews: number
}

const products:Products[] = [
  {
    name: 'HAVIT HV-G92 Gamepad',
    image: '/flash1.png',
    price: 120,
    originalPrice: 160,
    rating: 5,
    reviews: 88,
  },
  {
    name: 'AK-900 Wired Keyboard',
    image: '/flash2.png',
    price: 960,
    originalPrice: 1160,
    rating: 4,
    reviews: 75,
  },
  {
    name: 'IPS LCD Gaming Monitor',
    image: '/flash3.png',
    price: 370,
    originalPrice: 400,
    rating: 5,
    reviews: 99,
  },
  {
    name: 'S-Series Comfort Chair',
    image: '/flash4.png',
    price: 375,
    originalPrice: 400,
    rating: 4,
    reviews: 99,
  },
  {
    name: 'Logitech G Pro Wireless Mouse',
    image: '/flash5.jpeg',
    price: 130,
    originalPrice: 150,
    rating: 5,
    reviews: 145,
  },
  {
    name: 'Corsair RGB Gaming Headset',
    image: '/flash6.jpeg',
    price: 250,
    originalPrice: 300,
    rating: 5,
    reviews: 212,
  },
  {
    name: 'Razer BlackWidow Keyboard',
    image: '/flash7.jpeg',
    price: 120,
    originalPrice: 180,
    rating: 4,
    reviews: 200,
  },
  {
    name: 'Asus TUF Gaming Laptop',
    image: '/flash8.jpeg',
    price: 1500,
    originalPrice: 1800,
    rating: 5,
    reviews: 120,
  },
  {
    name: 'Cooler Master CPU Cooler',
    image: '/flash9.webp',
    price: 80,
    originalPrice: 100,
    rating: 4,
    reviews: 45,
  },
  {
    name: 'SteelSeries QcK Gaming Mousepad',
    image: '/flash10.jpeg',
    price: 20,
    originalPrice: 25,
    rating: 5,
    reviews: 300,
  },
  {
    name: 'MSI Optix Curved Gaming Monitor',
    image: '/flash11.jpeg',
    price: 450,
    originalPrice: 550,
    rating: 5,
    reviews: 150,
  },
  {
    name: 'HyperX Cloud II Gaming Headset',
    image: '/flash12.jpeg',
    price: 140,
    originalPrice: 200,
    rating: 5,
    reviews: 400,
  },
];

const ProductCard = ({ name, image, price, originalPrice, rating, reviews }: Products) => {
  return (
    <div className="relative bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative group">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />

      
        <button className="absolute bottom-0 left-0 w-full h-8 bg-black text-white py-2 text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add to Cart
        </button>

        <div className="absolute top-[20%] mb-10 right-1 transform -translate-y-1/2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-black bg-white p-2 rounded-full shadow hover:bg-gray-200">
            <Eye />
          </button>
          <button className="text-black bg-white p-2 rounded-full shadow hover:bg-gray-200">
            <Heart />
          </button>
        </div>

        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
          -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 text-sm font-semibold">{name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-red-500 font-bold">${price}</p>
          <p className="text-gray-400 line-through text-sm">${originalPrice}</p>
        </div>
        <div className="flex items-center space-x-1 text-yellow-400 text-md pt-1">
          {[...Array(5)].map((_, index) =>
            index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
          )}
          <span className="text-gray-400 text-sm ml-1">{reviews}</span>
        </div>
      </div>
    </div>
  );
};

function FlashSales() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth; // Scroll by the visible width
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-4 mb-1 pt-10 sm:pt-20">
      <div className="w-full px-4 sm:px-6 md:w-[90%] lg:w-[80%] pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div>
            <h3 className="text-red-500 font-bold border-l-8 border-red-500 pl-3 ml-1">
              Today`s
            </h3>
            <h1 className="text-slate-800 font-bold text-2xl sm:text-3xl lg:text-4xl pt-2">
              Flash Sales
            </h1>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4 text-center">
            <div>
              <p className="text-gray-600">Days</p>
              <p className="text-xl font-bold">03</p>
            </div>
            <span>:</span>
            <div>
              <p className="text-gray-600">Hours</p>
              <p className="text-xl font-bold">23</p>
            </div>
            <span>:</span>
            <div>
              <p className="text-gray-600">Minutes</p>
              <p className="text-xl font-bold">19</p>
            </div>
            <span>:</span>
            <div>
              <p className="text-gray-600">Seconds</p>
              <p className="text-xl font-bold">56</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 mt-4 sm:mt-0">
            <div
              onClick={() => handleScroll('left')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer"
            >
              <FaArrowLeft className="text-black" />
            </div>
            <div
              onClick={() => handleScroll('right')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer"
            >
              <FaArrowRight className="text-black" />
            </div>
          </div>
        </div>

        {/* Fixed Product List */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-hidden mt-7"
        >
          {products.map((product) => (
            <div key={product.name} className="min-w-[250px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="bg-red-500 hover:bg-red-600">View All Products</Button>
        </div>
      </div>
    </div>
  );
}

export default FlashSales;


// 'use client'

// import React from 'react'
// import { Button } from "@/components/ui/button"
// import { ProductCard } from "./product-card"
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// const products = [
//   {
//     name: "HAVIT HV-G92 Gamepad",
//     image: "/fss1.png",
//     price: 120,
//     originalPrice: 160,
//     rating: 5,
//     reviews: 88,
//   },
//   {
//     name: "AK-900 Wired Keyboard",
//     image: "/fss2.png",
//     price: 960,
//     originalPrice: 1160,
//     rating: 4,
//     reviews: 75,
//   },
//   {
//     name: "IPS LCD Gaming Monitor",
//     image: "/fss3.png",
//     price: 370,
//     originalPrice: 400,
//     rating: 5,
//     reviews: 99,
//   },
//   {
//     name: "S-Series Comfort Chair",
//     image: "/fss4.png",
//     price: 375,
//     originalPrice: 400,
//     rating: 4,
//     reviews: 99,
//   },
//   {
//     name: "Logitech G Pro Wireless Mouse",
//     image: "/fss5.png",
//     price: 130,
//     originalPrice: 150,
//     rating: 5,
//     reviews: 145,
//   },
//   {
//     name: "Corsair RGB Gaming Headset",
//     image: "/fss6.png",
//     price: 250,
//     originalPrice: 300,
//     rating: 5,
//     reviews: 212,
//   },
//   {
//     name: "Razer BlackWidow Keyboard",
//     image: "/fss7.png",
//     price: 120,
//     originalPrice: 180,
//     rating: 4,
//     reviews: 200,
//   },
//   {
//     name: "Asus TUF Gaming Laptop",
//     image: "/fss8.png",
//     price: 1500,
//     originalPrice: 1800,
//     rating: 5,
//     reviews: 120,
//   },
//   {
//     name: "Cooler Master CPU Cooler",
//     image: "/fss9.png",
//     price: 80,
//     originalPrice: 100,
//     rating: 4,
//     reviews: 45,
//   },
//   {
//     name: "SteelSeries QcK Gaming Mousepad",
//     image: "/fss10.png",
//     price: 20,
//     originalPrice: 25,
//     rating: 5,
//     reviews: 300,
//   },
//   {
//     name: "MSI Optix Curved Gaming Monitor",
//     image: "/fss11.png",
//     price: 450,
//     originalPrice: 550,
//     rating: 5,
//     reviews: 150,
//   },
//   {
//     name: "HyperX Cloud II Gaming Headset",
//     image: "/fss12.png",
//     price: 140,
//     originalPrice: 200,
//     rating: 5,
//     reviews: 400,
//   },
// ];


// function FlashSales() {
//   return (
//     <div className='w-full flex justify-center items-center mt-4 mb-1 pt-10 sm:pt-20'>
//       <div className='w-full px-4 sm:px-6 md:w-[90%] lg:w-[80%] pb-10'>
//         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
//           <div>
//             <h3 className='text-red-500 font-bold border-l-8 border-red-500 pl-3 ml-1'>
//               Today`s
//             </h3>
//             <h1 className='text-slate-800 font-bold text-2xl sm:text-3xl lg:text-4xl pt-2'>Flash Sales</h1>
//           </div>
 
//           {/* countdown timer */}
//     <div className='w-[702px] h-[50px] relative flex justify-between items-center ml-10'>

// {/* day */}
// <div className='left-0 top-0 absolute flex-col gap-1 inline-flex'>
// <div className='w-[31px] text-black font-medium font-["Poppins"] leading-[18px]'>
//  Days
// </div>
// <div className='w-[46px] h-7 text-black text-[32px] font-bold font-["Inter"] leading-[30px] tracking-wider'>
// 03
// </div> 
// </div>

// {/* {hours section */}
// <div className='w-[42px] h-[50px] left-[84px] top-0 absolute flex-col justify-start items-center gap-1 inline-flex '>
// <div className='w-[35px] text-black font-medium font-["Poppins] leading-[18px]'>
// Hours </div>
// <div className='text-black text-[32px] font-bold font-["Inter"] leading-[30px] tracking-wider'>23
// </div>
// </div> 

// {/* minutes section */}
// <div className='w-[49px] h-[50px] left-[164px] top-0 absolute flex-col justify-start items-start gap-1 inline-flex'>
// <div className='w-[49px] text-black font-medium font-["Poppins"] leading-[18px]'>
// Minutes
// </div> 
// <div className='w-[39px] h-7  text-black text-[32px] font-bold font-["Inter"] leading-[30px] tracking-wider'>
// 19
// </div>  
// </div>
// {/* seconds section */}

// <div className='w-[51px] h-[50px] left-[251px] top-0 absolute flex-col justify-start items-start gap-1 inline-flex'> <div className='w-[52px] text-black font-medium font-["Poppins"] leading-[18px]'> Seconds </div> <div className='text-black text-[32px] font-bold font-["Inter"] leading-[30px] tracking-wider'> 56 </div> </div>
// {/* separate timer dots days*/}

// <div className='left-[63px] top-[26px] absolute flex-col justify-start items-start gap-2 inline-flex'> <div className='w-1 h-1 bg-red-500 rounded-full'></div> <div className='w-1 h-1 bg-red-500 rounded-full'></div> </div>
// {/* separate timer dots hours */}
// <div className='left-[143px] top-[26px] absolute flex-col justify-start items-start gap-2 inline-flex'> <div className='w-1 h-1 bg-red-500 rounded-full'></div> <div className='w-1 h-1 bg-red-500 rounded-full'></div> </div>
// {/* separate timer dots minutes */}
// <div className='left-[230px] top-[26px] absolute flex-col justify-start items-start gap-2 inline-flex'> <div className='w-1 h-1 bg-red-500 rounded-full'></div> <div className='w-1 h-1 bg-red-500 rounded-full'></div> </div> </div>

//           {/* navigation */}
//           <div className='flex gap-2 mt-4 sm:mt-0'>
//             <div className='w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer'>
//               <FaArrowLeft className='text-black' />
//             </div>
//             <div className='w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer'>
//               <FaArrowRight className='text-black' />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
//           {products.map((product) => (
//             <ProductCard key={product.name} {...product} />
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <Button className="bg-red-500 hover:bg-red-600">
//             View All Products
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FlashSales


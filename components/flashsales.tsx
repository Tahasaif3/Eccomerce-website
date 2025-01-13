'use client';

import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import { FaArrowLeft, FaArrowRight, FaRegStar, FaStar } from 'react-icons/fa';
import { Eye, Heart } from 'lucide-react';
import { useCart } from "../context/cartContext";
import { toast } from 'sonner';

interface Product {
  name: string,
  image: string,
  price: number,
  originalPrice: number,
  rating: number;
  reviews: number
}

const products:Product[] = [
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

const ProductCard = ({ product, addToCart }: { product: Product; addToCart: (product: Product) => void }) => {
  return (
    <div className="relative bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <button 
          className="absolute bottom-0 left-0 w-full h-8 bg-black text-white py-2 text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => addToCart(product)}
        >
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
          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-800 text-sm font-semibold">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-red-500 font-bold">${product.price}</p>
          <p className="text-gray-400 line-through text-sm">${product.originalPrice}</p>
        </div>
        <div className="flex items-center space-x-1 text-yellow-400 text-md pt-1">
          {[...Array(5)].map((_, index) =>
            index < product.rating ? <FaStar key={index} /> : <FaRegStar key={index} />
          )}
          <span className="text-gray-400 text-sm ml-1">{product.reviews}</span>
        </div>
      </div>
    </div>
  );
};

function FlashSales() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      //@ts-expect-error:code reolved
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      //@ts-expect-error:solved error
      quantity: 1,
    });
    toast.success(`Added ${product.name} to cart`);
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
            //@ts-expect-error:code resolved
            <div key={product.id} className="min-w-[250px]">
              <ProductCard product={product} addToCart={handleAddToCart} />
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


// 'use client';

// import React from 'react';
// import { Button } from '../components/ui/button';
// import { FaArrowLeft, FaArrowRight, FaRegStar, FaStar } from 'react-icons/fa';
// import { Eye, Heart } from 'lucide-react';
// import { useRef } from 'react';
// import { useCart } from "../context/cartContext";

// interface Products {
//     name: string,
//     image: string,
//     price: number,
//     originalPrice: number,
//     rating: number;
//     reviews: number
// }

// const products:Products[] = [
//   {
//     name: 'HAVIT HV-G92 Gamepad',
//     image: '/flash1.png',
//     price: 120,
//     originalPrice: 160,
//     rating: 5,
//     reviews: 88,
//   },
//   {
//     name: 'AK-900 Wired Keyboard',
//     image: '/flash2.png',
//     price: 960,
//     originalPrice: 1160,
//     rating: 4,
//     reviews: 75,
//   },
//   {
//     name: 'IPS LCD Gaming Monitor',
//     image: '/flash3.png',
//     price: 370,
//     originalPrice: 400,
//     rating: 5,
//     reviews: 99,
//   },
//   {
//     name: 'S-Series Comfort Chair',
//     image: '/flash4.png',
//     price: 375,
//     originalPrice: 400,
//     rating: 4,
//     reviews: 99,
//   },
//   {
//     name: 'Logitech G Pro Wireless Mouse',
//     image: '/flash5.jpeg',
//     price: 130,
//     originalPrice: 150,
//     rating: 5,
//     reviews: 145,
//   },
//   {
//     name: 'Corsair RGB Gaming Headset',
//     image: '/flash6.jpeg',
//     price: 250,
//     originalPrice: 300,
//     rating: 5,
//     reviews: 212,
//   },
//   {
//     name: 'Razer BlackWidow Keyboard',
//     image: '/flash7.jpeg',
//     price: 120,
//     originalPrice: 180,
//     rating: 4,
//     reviews: 200,
//   },
//   {
//     name: 'Asus TUF Gaming Laptop',
//     image: '/flash8.jpeg',
//     price: 1500,
//     originalPrice: 1800,
//     rating: 5,
//     reviews: 120,
//   },
//   {
//     name: 'Cooler Master CPU Cooler',
//     image: '/flash9.webp',
//     price: 80,
//     originalPrice: 100,
//     rating: 4,
//     reviews: 45,
//   },
//   {
//     name: 'SteelSeries QcK Gaming Mousepad',
//     image: '/flash10.jpeg',
//     price: 20,
//     originalPrice: 25,
//     rating: 5,
//     reviews: 300,
//   },
//   {
//     name: 'MSI Optix Curved Gaming Monitor',
//     image: '/flash11.jpeg',
//     price: 450,
//     originalPrice: 550,
//     rating: 5,
//     reviews: 150,
//   },
//   {
//     name: 'HyperX Cloud II Gaming Headset',
//     image: '/flash12.jpeg',
//     price: 140,
//     originalPrice: 200,
//     rating: 5,
//     reviews: 400,
//   },
// ];

// const ProductCard = ({ name, image, price, originalPrice, rating, reviews }: Products) => {
//   return (
//     <div className="relative bg-white shadow-md rounded-md overflow-hidden">
//       <div className="relative group">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//         />

      
//         <button className="absolute bottom-0 left-0 w-full h-8 bg-black text-white py-2 text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           Add to Cart
//         </button>

//         <div className="absolute top-[20%] mb-10 right-1 transform -translate-y-1/2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button className="text-black bg-white p-2 rounded-full shadow hover:bg-gray-200">
//             <Eye />
//           </button>
//           <button className="text-black bg-white p-2 rounded-full shadow hover:bg-gray-200">
//             <Heart />
//           </button>
//         </div>

//         <div className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
//           -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="text-gray-800 text-sm font-semibold">{name}</h3>
//         <div className="flex items-center gap-2 mt-2">
//           <p className="text-red-500 font-bold">${price}</p>
//           <p className="text-gray-400 line-through text-sm">${originalPrice}</p>
//         </div>
//         <div className="flex items-center space-x-1 text-yellow-400 text-md pt-1">
//           {[...Array(5)].map((_, index) =>
//             index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
//           )}
//           <span className="text-gray-400 text-sm ml-1">{reviews}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// function FlashSales() {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const handleScroll = (direction: 'left' | 'right') => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = scrollContainerRef.current.offsetWidth; // Scroll by the visible width
//       if (direction === 'left') {
//         scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       } else {
//         scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-center mt-4 mb-1 pt-10 sm:pt-20">
//       <div className="w-full px-4 sm:px-6 md:w-[90%] lg:w-[80%] pb-10">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
//           <div>
//             <h3 className="text-red-500 font-bold border-l-8 border-red-500 pl-3 ml-1">
//               Today`s
//             </h3>
//             <h1 className="text-slate-800 font-bold text-2xl sm:text-3xl lg:text-4xl pt-2">
//               Flash Sales
//             </h1>
//           </div>

//           {/* Countdown Timer */}
//           <div className="flex items-center gap-4 text-center">
//             <div>
//               <p className="text-gray-600">Days</p>
//               <p className="text-xl font-bold">03</p>
//             </div>
//             <span>:</span>
//             <div>
//               <p className="text-gray-600">Hours</p>
//               <p className="text-xl font-bold">23</p>
//             </div>
//             <span>:</span>
//             <div>
//               <p className="text-gray-600">Minutes</p>
//               <p className="text-xl font-bold">19</p>
//             </div>
//             <span>:</span>
//             <div>
//               <p className="text-gray-600">Seconds</p>
//               <p className="text-xl font-bold">56</p>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex gap-2 mt-4 sm:mt-0">
//             <div
//               onClick={() => handleScroll('left')}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer"
//             >
//               <FaArrowLeft className="text-black" />
//             </div>
//             <div
//               onClick={() => handleScroll('right')}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 rounded-full flex justify-center items-center cursor-pointer"
//             >
//               <FaArrowRight className="text-black" />
//             </div>
//           </div>
//         </div>

//         {/* Fixed Product List */}
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-6 overflow-hidden mt-7"
//         >
//           {products.map((product) => (
//             <div key={product.name} className="min-w-[250px]">
//               <ProductCard {...product} />
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <Button className="bg-red-500 hover:bg-red-600">View All Products</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FlashSales;


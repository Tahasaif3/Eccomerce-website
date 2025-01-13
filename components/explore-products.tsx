"use client";

import Image from "next/image";
import {FaRegHeart, FaRegStar, FaStar} from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useCart } from "../context/cartContext";

type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: string | null;
  image: string;
  rating: number;
  reviews: number
};

const products: Product[] = [
  { 
    id: "1",
    title: "Breed Dry Dog Food",
    image: "/p1.png", 
    price: 100,
    rating: 5,
    reviews: 35
  },
  { 
    id: "2",
    title: "CANON EOS DSLR Camera",
    image: "/p2.png",
    price: 360,
    rating: 4,
    reviews: 95 
  },
  {
    id: "3",
    title: "ASU S FHD Gaming Laptop",
    image: "/p3.png",
    price: 700,
    rating: 5,
    reviews: 325
  },
  {
    id: "4",
    title: "Curology Product Set",
    image: "/p4.png",
    price: 500,
    rating: 4,
    reviews: 145 
  },
  {
    id: "5",
    title: "Kids Electric Car",
    image: "/p5.png",
    price: 960,
    rating: 5,
    reviews: 65
  },
  { 
    id: "6",
    title: "Jr. Zoom Soccer Cleats",
    image: "/p6.png",
    price: 1160,
    rating: 5,
    reviews: 35 
  },
  { 
    id: "7",
    title: "GP11 Shooter USB Gamepad",
    image: "/p7.png",
    price: 660,
    rating: 4,
    reviews: 55 
  },
  {
    id: "8",
    title: "Quilted Satin Jacket",
    image: "/p8.png",
    price: 660,
    rating: 4,
    reviews: 55 
  }
];

const ProductsBox = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
      <div className="group shadow-md bg-neutral-100 w-full h-[250px] flex justify-center items-center relative cursor-pointer">
        <Image src={product.image} width={150} height={100} alt={product.title} />
        <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
          <FaRegHeart className="text-2xl text-black rounded-full p-1 bg-white" />
          <FiEye className="text-2xl text-black rounded-full p-1 bg-white" />
        </div>
        <button 
          className="w-full absolute bottom-0 bg-black text-white px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         // @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <h1 className="font-semibold text-base font-sans mb-2 pt-3">{product.title}</h1>
      <div className="flex items-center space-x-2">
        <span className="text-red-500 font-bold">${product.price}</span>
        {product.oldPrice && (
          <span className="text-gray-400 font-bold line-through">
            {product.oldPrice}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-1 text-yellow-400 text-md pt-1">
        {[...Array(5)].map((_, index) =>
          index < product.rating ? (
            <FaStar key={index} />
          ) : (
            <FaRegStar key={index} />
          )
        )}
        <span className="text-gray-400 text-sm ml-1">{product.reviews}</span>
      </div>
    </div>
  );
};

export default function ExploreProducts() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-6">
          <h3 className="text-red-500 font-bold border-l-8 border-red-400 pl-3 ml-1">
            Our Products
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <h1 className="text-gray-800 font-bold text-2xl sm:text-3xl mb-4 sm:mb-0">
              Explore Our Products
            </h1>
            <a
              href="#products"
              className="bg-red-500 hover:bg-red-600 px-4 sm:px-7 py-2 text-sm text-white rounded-sm"
            >
              View All
            </a>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          {products.map((product) => (
            <ProductsBox key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}


"use client"

import { useState } from 'react';
import Link from 'next/link';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { CiSearch, CiHeart } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
  <div>
    <header className="bg-white border-b shadow-sm mx-auto flex flex-col">
      {/* Top Banner */}
      <div className="bg-black text-white py-2 text-center flex flex-wrap justify-center items-center px-4 sm:px-8 w-full text-xs sm:text-sm">
        <div className="text-center flex-1 mb-2 sm:mb-0">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <Link href="#" className="font-semibold ml-2 hover:underline text-slate-300">
            ShopNow
          </Link>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="text-white text-sm font-normal leading-[20px]">English</div>
          <RiArrowDropDownLine className="text-white text-3xl" />
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-44 py-4 relative">
        {/* Logo */}
        <h1 className="text-xl mr-10 sm:text-2xl font-bold text-black">Exclusive</h1>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
          <Link href="/" className="text-slate-500 no-underline hover:text-black hover:underline">Home</Link>
          <Link href="/Contact" className="text-slate-500 no-underline hover:text-black hover:underline">Contact</Link>
          <Link href="/About" className="text-slate-500 no-underline hover:text-black hover:underline">About</Link>
          <Link href="/products" className="text-slate-500 no-underline hover:text-black hover:underline">Products</Link>
          <Link href="/signup" className="text-slate-500 no-underline hover:text-black hover:underline">Signup</Link>
          <Link href="/track-order" className="text-slate-500 no-underline hover:text-black hover:underline">Track</Link>
        </nav>

        {/* Search and icons */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-md px-3 py-2 ml-10">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-slate-100 outline-none text-sm w-full"
            />
            <CiSearch />
          </div>

          {/* Wishlist Icon */}
          <Link href={"/Wishlist"}>
            <CiHeart className="text-2xl" />
          </Link>

          {/* Cart Icon */}
          <Link href={"/Cart"}>
            <IoCartOutline className="text-2xl" />
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1"
            >
              <FaUser className="text-xl" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-30 backdrop-blur-sm text-white rounded-lg shadow-lg overflow-hidden">
                <ul>
                  <li className="px-3 py-2 text-md hover:bg-opacity-40 hover:backdrop-blur-sm cursor-pointer">
                    <Link href="/account">Manage My Account</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-opacity-40 hover:backdrop-blur-sm cursor-pointer">
                    <Link href="/orders">My Orders</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-opacity-40 hover:backdrop-blur-sm cursor-pointer">
                    <Link href="/my-cancellations">My Cancellations</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-opacity-40 hover:backdrop-blur-sm cursor-pointer">
                    <Link href="/my-reviews">My Reviews</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-opacity-40 hover:backdrop-blur-sm cursor-pointer">
                    <Link href="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <nav className="flex flex-col space-y-2 px-4">
            <Link href="/" className="text-slate-500 no-underline hover:text-black hover:underline">Home</Link>
            <Link href="/Contact" className="text-slate-500 no-underline hover:text-black hover:underline">Contact</Link>
            <Link href="/About" className="text-slate-500 no-underline hover:text-black hover:underline">About</Link>
            <Link href="/products" className="text-slate-500 no-underline hover:text-black hover:underline">Products</Link>
            <Link href="/signup" className="text-slate-500 no-underline hover:text-black hover:underline">Signup</Link>
            <Link href="/track-order" className="text-slate-500 no-underline hover:text-black hover:underline">Track</Link>
          </nav>
          <div className="flex justify-around mt-4">
            <Link href={"/Wishlist"}><CiHeart className="text-2xl" /></Link>
            <Link href={"/Cart"}><IoCartOutline className="text-2xl" /></Link>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <FaUser className="text-xl" />
            </button>
          </div>
          <div className="flex items-center bg-slate-100 rounded-md px-3 py-2 mt-4 mx-4">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-slate-100 outline-none text-sm w-full"
            />
            <CiSearch />
          </div>
        </div>
      )}
    </header>
  </div>
);
}

export default Navbar;


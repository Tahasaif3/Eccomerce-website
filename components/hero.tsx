import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { FaApple, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
    return (
        <div className='flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10'>
            <div className='max-w-[1440px] flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full'>
                {/* left side sidebar */}
                <div className='border-r-2 border-neutral-200 py-4 px-4 md:px-6 hidden md:block md:w-56'>
                    <ul className='space-y-2 md:space-y-4'>
                        {[
                            "Woman's Fashion",
                            "Men's Fashion",
                            "Electronics",
                            "Home & Lifestyle",
                            "Medicine",
                            "Sports & Outdoor",
                            "Baby's & Toys",
                            "Groceries & Pets",
                            "Health & Beauty",
                        ].map((item, index) => (
                            <li
                                key={index}
                                className='flex justify-between items-center text-sm md:text-base text-slate-800 leading-loose hover:underline cursor-pointer hover:text-blue-500 transition-all duration-150'
                            >
                                <span>{item}</span>
                                {index < 2 && <IoIosArrowForward className='text-lg ml-3' />}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side */}
                <div className='flex flex-col sm:flex-row items-center bg-black rounded-lg p-4 sm:p-6 md:px-8 lg:px-10 w-full md:w-auto'>
                    <div className='text-white flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5 w-full sm:w-[180px] md:w-[250px] lg:w-[300px]'>
                        <div className='flex items-center gap-2'>
                            <FaApple className='text-2xl sm:text-3xl md:text-4xl' />
                            <span className='text-sm sm:text-base md:text-lg font-semibold'>
                                iPhone 14 Series
                            </span>
                        </div>

                        {/* right side heading */}
                        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug'>
                            Up to 10%
                        </h1>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug'>
                            off Voucher
                        </h1>
                        <div className='h-2'></div>
                        <Link
                            href={"products"}
                            className='underline underline-offset-4 hover:font-semibold flex items-center gap-2 text-sm sm:text-base'
                        >
                            Shop now
                            <FaArrowRight />
                        </Link>
                    </div>

                    {/* Right Side Image */}
                    <div className="mt-4 sm:mt-0 sm:ml-auto">
                        <Image
                            src="/iphone.png"
                            alt="iphone 14 series"
                            width={350}
                            height={500}
                            className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] h-auto"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}


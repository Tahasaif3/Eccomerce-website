import React from 'react'
import Image from 'next/image'

function NewArrival() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-5 h-10 bg-[#DB4444]" />
        <span className="text-[#DB4444] font-semibold">Featured</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 pt-4 mb-8">New Arrival</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
          <Image
            src="/neww1.png"
            alt="PS5"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-rows-2 gap-6">
          <div className="relative aspect-[2/1] bg-black rounded-lg overflow-hidden">
            <Image
              src="/neww2.png"
              alt="Women's Collections"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
              <Image
                src="/neww3.png"
                alt="Speakers"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
              <Image
                src="/neww4.png"
                alt="Perfume"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewArrival


import React from 'react'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { BsHeadset } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'

function Delivery() {
    return (
        <div className='w-full py-16 flex justify-center items-center'>
            <div className='w-full max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {/* box-1 */}
                <DeliveryBox
                    icon={<TbTruckDelivery className='text-3xl text-slate-400' />}
                    title="FREE AND FAST DELIVERY"
                    description="Free delivery for all orders over $140"
                />

                {/* box-2 */}
                <DeliveryBox
                    icon={<BsHeadset className='text-3xl text-slate-400' />}
                    title="24/7 CUSTOMER SERVICE"
                    description="Friendly 24/7 customer support"
                />

                {/* box-3 */}
                <DeliveryBox
                    icon={<AiFillSafetyCertificate className='text-3xl text-slate-400' />}
                    title="MONEY BACK GUARANTEE"
                    description="We return money within 30 days"
                />
            </div>
        </div>
    )
}

interface DeliveryBoxProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function DeliveryBox({ icon, title, description }: DeliveryBoxProps) {
    return (
        <div className='flex flex-col items-center text-center'>
            <div className='w-[50px] h-[50px] rounded-full bg-black flex justify-center items-center border-stone-400 border-8 mb-4'>
                {icon}
            </div>
            <h2 className='font-bold text-lg mb-2'>{title}</h2>
            <p className='text-sm text-gray-600'>{description}</p>
        </div>
    )
}

export default Delivery


import React from 'react'

import PlaceHolder from "../assets/pl2.jpeg"
import Bg2 from "../assets/placeholder.jpg"
const CaptainDetails = () => {
    return (
        <div className='p-6 flex flex-col gap-5'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center justify-between gap-2'>
                    <img className='h-16 w-16 rounded-full' src={Bg2} alt="" />
                    <h4 className='text-lg font-medium'>harsh patel</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>$12</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex justify-between gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-2xl font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hour Online</p>
                </div>

                <div className='text-center'>
                    <i className="text-2xl font-thin ri-speed-up-fill  "></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hour Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hour Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
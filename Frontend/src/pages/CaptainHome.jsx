import React from 'react'
import { Link } from 'react-router-dom'
import PlaceHolder from "../assets/pl2.jpeg"
import Bg2 from "../assets/placeholder.jpg"
const CaptainHome = () => {
  return (
    <div className='h-screen '>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={PlaceHolder} alt="" />
        <Link to='/home' className='w-10 h-10 bg-white flex items-center justify-center'>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-2/3'>
        <img src={Bg2} alt="" className='h-full w-full object-cover' />
      </div>
      <div className='h-1/3 p-6 flex flex-col gap-5'>
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
    </div>
  )
}

export default CaptainHome
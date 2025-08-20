import React from 'react'
import { Link } from 'react-router-dom'
import PlaceHolder from "../assets/pl2.jpeg"
import Bg2 from "../assets/placeholder.jpg"
import CaptainDetails from '../components/CaptainDetails'
const CaptainHome = () => {
  return (
    <div className='h-screen '>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={PlaceHolder} alt="" />
        <Link to='/home' className='w-10 h-10 bg-white flex items-center justify-center'>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/4'>
        <img src={Bg2} alt="" className='h-full w-full object-cover' />
      </div>
      <div className='h-1/4'>
        <CaptainDetails/>
      </div>
    </div>
  )
}

export default CaptainHome
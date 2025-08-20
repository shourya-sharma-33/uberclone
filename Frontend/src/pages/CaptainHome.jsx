import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceHolder from "../assets/pl2.jpeg"
import Bg2 from "../assets/placeholder.jpg"
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopupPanel] = useState(false)
  const ridePopUpPanelRef = useRef()
  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])


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
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-ful bg-white px-3 py-10 pt-12'>
        <RidePopUp />
      </div>
    </div>
  )
}

export default CaptainHome
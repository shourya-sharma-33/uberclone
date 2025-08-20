import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceHolder from "../assets/pl2.jpeg"
import Bg2 from "../assets/placeholder.jpg"
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import ConfirmRidePopup from '../components/ConfirmRidePopup'

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopup, setConfirmRidePopup] = useState(false)
  const [captainDetail, setCaptainDetail] = useState(true)
  const ridePopUpPanelRef = useRef()
  const captainDetailRef = useRef()
  const confirmRidePopupRef = useRef()
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

  useGSAP(function () {
    if (captainDetail) {
      gsap.to(captainDetailRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(captainDetailRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [captainDetail])


  useGSAP(function () {
    if (confirmRidePopup) {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopup])




  return (
    <div className='h-screen overflow-y-hidden '>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={PlaceHolder} alt="" />
        <Link to='/home' className='w-10 h-10 bg-white flex items-center justify-center'>
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/4'>
        <img src={Bg2} alt="" className='h-full w-full object-cover' />
      </div>
      <div ref={captainDetailRef} className='h-1/4'>
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} />
      </div>
      <div ref={confirmRidePopupRef} className='fixed w-full h-5/6 py-10 z-10 bottom-0 translate-y-ful bg-white px-3'>
        <div className="">
          <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setRidePopupPanel={setRidePopupPanel} />

        </div>
      </div>
    </div>
  )
}

export default CaptainHome  
import React, { useRef, useState } from 'react'
import Bgplaceholder from "../assets/placeholder.jpg"
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "100%",
        borderRadius : "0px",
        duration: 0.5,
        ease: "power2.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "25%",
        duration: 0.5,
        ease: "power2.inOut"
      })
      gsap.to(panelCloseRef.current, {
        opacity :0
      })
    }
  }, [panelOpen, panelCloseRef]) 

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])
  return (
    <div className='overflow-y-hidden h-screen relative'>
      <img src="a8ysas" alt="Uber" className='w-16 absolute left-5 top-5' />

      <div className='h-screen w-screen'>
        <img src={Bgplaceholder} alt="" className='h-full w-full object-cover' />
      </div>

      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>
        <div
          ref={panelRef} 
          className='h-[25%] bg-white p-5 relative rounded-2xl'
        >
          <h5 ref={panelCloseRef}  className='absolute top-3 right-3 text-4xl opacity-0' onClick={() => {
            setPanelOpen(false)
          }}>
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold m-2'>Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-12 left-[35px] w-1 top-24 bg-black rounded-bl-sm'></div>
            <input
              type="text"
              placeholder='Add a Pickup Location'
              className='bg-[#eee] px-8 py-2 m-1 w-full text-lg rounded-lg shadow-md'
              value={pickup}
              onClick={() => setPanelOpen(true)} // 👈 triggers animation
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              type="text"
              placeholder='Enter your Destination'
              className='bg-[#eee] px-8 w-full h-[20%] shadow-md m-1 py-2 text-lg rounded-lg'
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
          <div className=" mt-10">
            <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen}/>
          </div>
        </div>
        
      </div>

      <div ref={vehiclePanelRef} className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg rounded-t-2xl translate-y-full rounded-xl">
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg rounded-t-2xl translate-y-full rounded-xl">
        <ConfirmRide/>
      </div>

    </div>
  )
}

export default Home

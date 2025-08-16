import React, { useRef, useState } from 'react'
import Bgplaceholder from "../assets/placeholder.jpg"
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

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
  return (
    <div className='h-screen relative'>
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
              className='bg-[#eee] px-8 w-full h-[10%] shadow-md m-1 py-2 text-lg rounded-lg'
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home

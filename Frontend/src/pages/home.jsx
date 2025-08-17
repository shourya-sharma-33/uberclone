import React, { useRef, useState } from 'react'
import Bgplaceholder from "../assets/placeholder.jpg"
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import LocationSearchPanel from '../components/LocationSearchPanel';

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
              className='bg-[#eee] px-8 w-full h-[20%] shadow-md m-1 py-2 text-lg rounded-lg'
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
          <div className=" mt-10">
            <LocationSearchPanel />
            <LocationSearchPanel />
            <LocationSearchPanel />
          </div>
        </div>
        
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg rounded-t-2xl  rounded-xl">
        <h3 className='text-2xl font-semibold mb-3'>Choose a Vehicle</h3>
        <div className="flex items-center justify-between gap-4">
          <img
            src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
            alt="Uber Car"
            className="h-20 object-contain"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                UberGo
                <span className="ml-2 inline-flex items-center text-gray-600 text-sm">
                  <i className="ri-user-3-fill mr-1"></i> 4
                </span>
              </h4>
              <span className="text-xl font-bold text-gray-900">$10</span>
            </div>
            <p className="text-sm text-green-600 font-medium">2 mins away</p>
            <p className="text-xs text-gray-500">Affordable, compact rides</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <img
            src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
            alt="Uber Car"
            className="h-20 object-contain"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                UberGo
                <span className="ml-2 inline-flex items-center text-gray-600 text-sm">
                  <i className="ri-user-3-fill mr-1"></i> 4
                </span>
              </h4>
              <span className="text-xl font-bold text-gray-900">$10</span>
            </div>
            <p className="text-sm text-green-600 font-medium">2 mins away</p>
            <p className="text-xs text-gray-500">Affordable, compact rides</p>
          </div>

          {/* Comment for myself :3, come back and replace these images with uber auto png, uber car png, and uber auto png please ;3 */}
        </div>
      </div>


    </div>
  )
}

export default Home

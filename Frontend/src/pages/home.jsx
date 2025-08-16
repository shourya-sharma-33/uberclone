import React from 'react'
import Bgplaceholder from "../assets/placeholder.jpg"
const Home = () => {
  return (
    <div className='h-screen relative'>
      <img src="" alt="Uber" className='w-16 absolute left-5 top-5'/>

      <div className='h-screen w-screen'>
        <img src={Bgplaceholder} alt="" className='h-full w-full object-cover'/>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute bottom-0 w-full '>
        <div className='h-[30%] bg-white p-5'>
          <h4 className='text-3xl font-semibold py-2 m-1 '>Find a Trip</h4>
          <form>
            <input type="text" placeholder='Add a Pickup Location' className='bg-[#eee] px-8 py-2 m-1 w-full text-lg rounded-lg shadow-md' />
            <input type="text" placeholder='Enter your Destination' className='bg-[#eee] px-8 w-full shadow-md m-1 py-2 text-lg rounded-lg' />
          </form>
        </div>
        <div className='h-[70%] bg-red-500 p-5 hidden'>

        </div>
      </div>
    </div> 
  ) 
}

export default Home
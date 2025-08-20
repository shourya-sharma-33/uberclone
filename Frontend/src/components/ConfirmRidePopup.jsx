import React from 'react'
import placeholder1 from '../assets/placeholder (1).jpg'

const ConfirmRidePopup = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setConfirmRidePanel(false)
      }}>
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>
      <h3 className="text-3xl font-semibold mb-5">Confirm Ride</h3>
      <div className='flex  items-center justify-between bg-yellow-300 py-4 px-5 rounded-lg'>
        <div className=' flex items-center gap-3 '>
          <img src={placeholder1} alt=""
            className='h-10 rounded-full object-cover w-10' />
          <h2 className='text-lg font-medium'>Meow</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex justify-between flex-col items-center'>
        {/* <img
                    src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                    alt="Uber Car"
                    className="object-contain"
                /> */}
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Bhopal</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
        }} className='w-full mt-5 bg-green-400 text-white font-semibold p-2 rounded-sm'>Confirm</button>
        <button onClick={() => {
          props.setConfirmRidePopup(false)
        }} className='w-full mt-2 bg-gray-400 text-gray-700 font-semibold p-2 rounded-sm'>Cancel</button>
      </div>
    </div>
  )
}

export default ConfirmRidePopup
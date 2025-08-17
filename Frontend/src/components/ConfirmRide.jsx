import React from 'react'

const ConfirmRide = () => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
            props.setVehiclePanel(false)
        }}>
            <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

        <div className='flex justify-between flex-col items-center'>
              <img
                  src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                  alt="Uber Car"
                  className="object-contain"
              />
              <div className='w-full'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <button className='w-full bg-green-400 text-white font-semibold p-2 rounded-sm'>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmRide
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
    </div>
  )
}

export default ConfirmRide
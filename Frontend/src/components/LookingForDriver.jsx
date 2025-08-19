import React from 'react'

const LookingForDriver = () => {
  return (
      <div>
          <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
              props.setVehiclePanel(false)
          }}>
              <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
          </h5>
          <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

          <div className='flex justify-between flex-col items-center'>
              <img
                  src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                  alt="Uber Car"
                  className="object-contain"
              />
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
              </div>
      </div>
  )
}

export default LookingForDriver
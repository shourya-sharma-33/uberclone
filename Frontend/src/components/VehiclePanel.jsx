import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
          <h4 className='p-3 text-center absolute top-0 right-[5px]' onClick={() => {
              props.setVehiclePanel(false)
          }}><i className="ri-arrow-down-wide-line"></i></h4>
          <h3 className='text-2xl font-semibold mb-3'>Choose a Vehicle</h3>
          <div onClick={() => {
            props.setConfirmRidePanel(true)
          }}
           className="flex items-center justify-between gap-4">
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
          <div onClick={() => {
              props.setConfirmRidePanel(true)
          }}
          className="flex items-center justify-between gap-4">
              <img
                  src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                  alt="Uber Car"
                  className="h-20 object-contain"
              />
              <div className="flex-1">
                  <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                          Motorbike
                          <span className="ml-2 inline-flex items-center text-gray-600 text-sm">
                              <i className="ri-user-3-fill mr-1"></i> 4
                          </span>
                      </h4>
                      <span className="text-xl font-bold text-gray-900">$5</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">5 mins away</p>
                  <p className="text-xs text-gray-500">Affordable, compact rides</p>
              </div>

              {/* Comment for myself :3, come back and replace these images with uber auto png, uber car png, and uber auto png please ;3 */}
          </div>
          <div onClick={() => {
              props.setConfirmRidePanel(true)
          }}
          className="flex items-center justify-between gap-4">
              <img
                  src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                  alt="Uber Car"
                  className="h-20 object-contain"
              />
              <div className="flex-1">
                  <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                          Rickshaw
                          <span className="ml-2 inline-flex items-center text-gray-600 text-sm">
                              <i className="ri-user-3-fill mr-1"></i> 4
                          </span>
                      </h4>
                      <span className="text-xl font-bold text-gray-900">$2</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">2 mins away</p>
                  <p className="text-xs text-gray-500">Affordable, compact rides</p>
              </div>

              {/* Comment for myself :3, come back and replace these images with uber auto png, uber car png, and uber auto png please ;3 */}
          </div>
    </div>
  )
}

export default VehiclePanel
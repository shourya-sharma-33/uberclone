import React from 'react'

// const RidesComponent = ({ imageUrl, vehicleName, price, distance }) => {
const RidesComponent = () => {
  return (
    <div>
          <div className=" bottom-0 left-0 right-0 z-10 bg-white p-4 shadow-lg rounded-t-2xl  rounded-xl">
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
          </div>

    </div>
  )
}

export default RidesComponent
import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props)
  const location = [
    "abcd, abcdpur, abcd nagar, abcd country",
    "abcd, abcdpur, abcd nagar, abcd country",
    "abcd, abcdpur, abcd nagar, abcd country",
    "abcd, abcdpur, abcd nagar, abcd country"
  ]

  return (
    <div>
      {
        location.map(function(elem){
          return (
            <div className='border-b-4 py-3' onClick={() => {
              props.setVehiclePanel(true)
            }}>
              <div className='flex items-center gap-4 justify-start '>
                <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center  rounded-full'><i className='ri-map-pin-fill text-xl'></i></h2>
                <h4 className='text-lg font-medium'>{elem}</h4>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default LocationSearchPanel
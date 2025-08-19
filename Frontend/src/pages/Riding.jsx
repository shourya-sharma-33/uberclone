import React from 'react'
import Bg2 from '../assets/pl2.jpeg'
const Riding = () => {
    return (
        <div className='h-screen '>
            <div className='h-1/2'>
                <img src={Bg2} alt="" className='h-full w-full object-cover' />
            </div>
            <div className='h-1/2 p-4'>


                <div className='flex items-center justify-between'>
                    <img
                        src="https://toppng.com/public/uploads/preview/car-png-11545045307loxqxkku4n.png"
                        alt="Uber Car"
                        className="object-contain w-28"
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium '>Ramu</h2>
                        <h4 className='text-2xl font-bold -mt-1 -mb-1'>M404 AB 1234</h4>
                        <p className='text-sm text-gray-500'>Maruti Shuzuzki Alto</p>
                    </div>
                </div>


                <div className='flex justify-between flex-col items-center'>
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
                <button>Make a Payment</button>


            </div>
        </div>
    )
}

export default Riding
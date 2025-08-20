import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
    return (
        <div className='h-screen relative'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-box-line'></i>
                </Link>
            </div>

            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gMx05pgIIShbfnX.gif" alt="" />
            </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'>
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => { }}>
                    <i className='text-3xl text-gray-800 ri-arrow-up-wide-line'></i>
                </h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='bg-green-600 text-white font-semibold px-10 py-3 rounded-lg'>Complete Ride</button>
            </div>
        </div>
    )
}

export default CaptainRiding

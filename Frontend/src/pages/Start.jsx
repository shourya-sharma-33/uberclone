import React from 'react'
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className='h-screen flex  flex-col justify-between  w-full bg-red-400 bg-[url(https://tse3.mm.bing.net/th/id/OIP.zbQCOAuHC1eo9OSFbqG2fQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3)] bg-cover bg-center'>
      
     <div className=''>
       <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" className='w-16 ml-8 mt-8' alt="" />
      </div> 
      <div className="bg-white py-5 px-10">
       
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to='/login'><button className='w-full block justify-self-center bg-black text-white p-3 text-2xl m-3 rounded-xl'>Continue</button></Link>

      </div>
    </div>
  )
}

export default Start;
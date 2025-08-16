import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext }  from '../context/UserContext';
const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword]  = useState('');
  const [userData, setUserData] = useState({})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const navigate = useNavigate()
  const {user ,setUser} = React.useContext(UserContext)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullName : {
        firstname : firstname,
        lastname : lastname
      },
      user : email,
      password : password
    }

    const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)
    if(responce.status === 201) {
      const data = responce.data 
      setUser(data.user)
      navigate('/home')
    }

    console.log(userData)
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
  }
  return  (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeeee]">
      <div className="w-full m-5 max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
      <div className='w-full justify-center'>
        <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" className='w-32 justify-self-center' alt="" />
      </div>
        <h2 className=" font-bold text-black/80 mb-8 text-center tracking-wide text-lg">
          Signup
        </h2>
        <form className="flex flex-col gap-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-black text-sm font-medium mb-2" htmlFor="email">
              Name
            </label>
            <div className="flex gap-2">
              <input
              id="firstname"
              type="firstname"
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                }}
              placeholder="Shourya"
              className="w-[50%] px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
            />
            <input
              id="lastname"
              type="lastname"
              required
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                }}
              placeholder="Sharma"
              className="w-[50%] px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
            />
            </div>
          </div>
          <div>
            <label className="block text-black text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                }}
              placeholder="shouryasharma@developer.com"
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-medium mb-2" htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                }}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
            />
          </div>
          <div id='vehicle'>

          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-black text-white font-semibold tracking-wider hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>
         <Link
         to='/captain-signup'
           >
            <button  className="w-full py-3 mt-4 rounded bg-purple-800  text-white font-semibold tracking-wider hover:bg-gray-900 transition"
            
            >Signup as captain</button>
          </Link>
        <div className="mt-6 text-center text-gray-500 text-sm">
          already a User?{' '}
          <Link to='/login' className="underline cursor-pointer text-black hover:text-gray-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

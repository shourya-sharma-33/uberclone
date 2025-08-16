import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    }
    console.log(captainData);
    
    const response = await axios.post(`http://localhost:3000/captains/login`, captainData)

    if (response.status  === 200) {
      console.log("done");
      
      const data = response.data
      setCaptainData(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/')
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeeee]">
      <div className="w-full m-5 max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className='w-full justify-center'>
          <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" className='w-32 justify-self-center' alt="" />
        </div>
        <h2 className=" font-bold text-black/80 mb-8 text-center tracking-wide text-lg">
          Sign in to your captain account
        </h2>
        <form className="flex flex-col gap-6" onSubmit={submitHandler}>
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
            <label className="block text-black text-sm font-medium mb-2" htmlFor="password">
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
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-black text-white font-semibold tracking-wider hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>
        <Link
          to='/login'
        >
          <button className="w-full py-3 mt-4 rounded bg-green-800  text-white font-semibold tracking-wider hover:bg-gray-900 transition"
          >Sign in as user</button>
        </Link>
        <div className="mt-6 text-center text-gray-500 text-sm">
          New to Uber?{' '}
          <Link to='/signup' className="underline cursor-pointer text-black hover:text-gray-700">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  ); 
};

export default CaptainLogin;

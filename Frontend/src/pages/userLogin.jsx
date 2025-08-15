import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      user : email,
      password : password
    })
    console.log(userData)
    setEmail('')
    setPassword('')
  }
  return  (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeeee]">
      <div className="w-full m-5 max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
      <div className='w-full justify-center'>
        <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" className='w-32 justify-self-center' alt="" />
      </div>
        <h2 className=" font-bold text-black/80 mb-8 text-center tracking-wide text-lg">
          Sign in to your account
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
                console.log(email);
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
                console.log(password);
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
         to='/captain-login'
           >
            <button  className="w-full py-3 mt-4 rounded bg-purple-800  text-white font-semibold tracking-wider hover:bg-gray-900 transition"
            
            >Sign in as captain</button>
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

export default UserLogin;

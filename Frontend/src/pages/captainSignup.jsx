import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext';
const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext) 

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstname: firstname,
        lastname: lastname
      },
      captain: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType
      }
    }

    const response = await axios.post(`http://localhost:3000/captains/register`, captainData)

    console.log(captainData);
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eeeeee]">
      <div className="w-full m-5 max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className='w-full justify-center'>
          <img src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" className='w-32 justify-self-center' alt="" />
        </div>
        <h2 className="font-bold text-black/80 mb-8 text-center tracking-wide text-lg">
          Captain Signup
        </h2>
        <form className="flex flex-col gap-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-black text-sm font-medium mb-2" htmlFor="firstname">
              Name
            </label>
            <div className="flex gap-2">
              <input
                id="firstname"
                type="text"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
                className="w-[50%] px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
              />
              <input
                id="lastname"
                type="text"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last Name"
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="captain@uber.com"
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
            />
            <label className="block text-black text-sm font-medium my-3">
              Vehicle
            </label>
            <div id='vehicle' className='grid grid-cols-2 gap-3'>
              <div>
                <p>Color</p>
                <input
                  type="text"
                  required
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  placeholder="Black"
                  className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <p>Plate</p>
                <input
                  type="text"
                  required
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="AB-1234"
                  className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <p>Capacity</p>
                <input
                  type="number"
                  required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  placeholder="4"
                  className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>
              <div>
                <p>Type</p>
                <input
                  type="text"
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  placeholder="Sedan"
                  className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded bg-black text-white font-semibold tracking-wider hover:bg-gray-900 transition"
          >
            Signup as Captain
          </button>
        </form>
        <Link to='/signup'>
          <button className="w-full py-3 mt-4 rounded bg-green-800 text-white font-semibold tracking-wider hover:bg-gray-900 transition">
            Signup as User
          </button>
        </Link>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Already a Captain?{' '}
          <Link to='/captain-login' className="underline cursor-pointer text-black hover:text-gray-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;

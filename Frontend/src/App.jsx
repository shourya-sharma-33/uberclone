import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import { UserDataContext } from './context/UserContext'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import 'remixicon/fonts/remixicon.css';
import Riding from './pages/Riding.jsx'



const App = () => {

  const [user, setUser] = useState({
    email : '',
    fullName : {
      firstName : '' ,
      lastName : ''
    }
  })
  return (
    <div>
      <Routes>
        <Route path='/start' element={<Start/>}/>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/> 
          </UserProtectWrapper>
        }/> 
        <Route path='/captain-home'
        element={<CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
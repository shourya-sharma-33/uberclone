import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`http://localhost:3000`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((responce) => {
        if (responce.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
    
    return (
        <div>UserLogout</div>
    )
}

export default UserLogout
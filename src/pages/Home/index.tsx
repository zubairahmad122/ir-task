import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const {  logout,isAuthenticated } = useAuth();
    const navigate = useNavigate()
    useEffect(() =>{
        if(!isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])
    return (
    <div className=' flex items-center justify-center flex-col gap-10 min-h-[70vh]'>
        <h2 className='text-5xl text-center'>Welcome !</h2>
        <button className='px-6 py-3 text-white font-medium tracking-wide hover:bg-blue-900 bg-blue-600' onClick={logout}>Sign out</button>
    </div>
  )
}

export default index
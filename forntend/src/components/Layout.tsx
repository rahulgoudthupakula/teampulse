import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useGlobalState } from '../context/GlobalState'
import Navbar from '../components/Navbar/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobalState()

  const handleLogout = () => {
    authService.logout()
    dispatch({ type: 'CLEAR_USER' })
    dispatch({ type: 'ADD_NOTIFICATION', payload: 'Logged out successfully' })
    navigate('/login')
  }

  

  return (
    <div className={`min-h-screen`}>
      <Navbar/>

      <main>
        <div className='pt-16'>
          {children}
        </div>
      </main>

      
    </div>
  )
}
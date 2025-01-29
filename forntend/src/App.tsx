import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { GlobalStateProvider } from './context/GlobalState'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import Index from './pages/Index'
/*
import { InternshipsHome } from './components/Internship/InternshipsHome'
import InternshipsList from './components/Internship/internship-listings'
import JobList from './components/Jobs/Job-listings'
import { JobsHome } from './components/Jobs/JobsHome'
import  CarrerHome  from './components/Career/CareerHome'
import  ScholarshipHome  from './components/Scholarship/ScholarshipHome'
import ScholarshipList from './components/Scholarship/scholarshipList'*/


export default function App() {
  return (
    <GlobalStateProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      
        
        
        
        <Route path="/" element={<Navigate to="/index" replace />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </GlobalStateProvider>
  )
}
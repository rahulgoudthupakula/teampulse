import React from 'react'
import { Navigate } from 'react-router-dom'
import { authService } from '../services/authService'
import Layout from './Layout'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <Layout>{children}</Layout>
}
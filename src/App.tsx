import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginScreen from './frontend/screens/LoginScreen'
import RegisterScreen from './frontend/screens/RegisterScreen'
import HomeScreen from './frontend/screens/HomeScreen'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#22c55e',
              color: 'white',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App

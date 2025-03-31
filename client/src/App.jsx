import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './hooks/ProtectedRoute'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddUser from './pages/AddUser'
import ViewUsers from './pages/ViewUsers'
import Navbar from './pages/Navbar'
import EditUser from './pages/EditUser'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<ViewUsers />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/edit/:id' element={<EditUser />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
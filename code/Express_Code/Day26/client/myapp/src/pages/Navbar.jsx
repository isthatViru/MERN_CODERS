import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex w-full bg-blue-500 text-white font-semibold items-center justify-evenly h-15'>
     <Link to='/'>View User</Link>
     <Link to='/add'>Add User</Link>

    </div>
  )
}

export default Navbar
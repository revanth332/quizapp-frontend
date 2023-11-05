import React from 'react'
import './navbar.css'
const logo = require('../Images/quizlogo2.png')

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} height={60}/>
        </div>
    </div>
  )
}

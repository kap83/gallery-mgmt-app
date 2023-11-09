import React from 'react'
import logo from '../images/logo.jpg'
import '../index.css'

export default function Header() {
  return (
    <header>
      <img className='logo' src={logo} alt='logo' />
    </header>
  )
}

import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.jpg'
import Logout from './Logout'



export default function NavBar() {
   
    
  return (
    <>
    
     <div className='navBar'>
     <img className='navLogo' src={logo} alt='logo' />
     <NavLink
          to='/'
          style={{
            textDecoration: 'none',
            color: 'black',
            transition: 'font-size 0.2s ease', 
          }}
          activestyle={{ color: 'blue' }}
          className='navLink'
        >
          Exhibitions
        </NavLink>

        <NavLink
          to='/artists'
          style={{
            textDecoration: 'none',
            color: 'black',
            transition: 'font-size 0.2s ease', 
          }}
          activestyle={{ color: 'blue' }}
          className='navLink' 
        >
          Artists
        </NavLink>
          <Logout />
       </div>

    </>

   
   
  )
}

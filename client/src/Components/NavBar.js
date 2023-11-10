import React, {useContext} from 'react'
import {UserContext} from '../Context/User'
import { NavLink } from 'react-router-dom'
//import Header from './Header';

export default function NavBar() {
    const {handleLogout} = useContext(UserContext)
    
  return (
    <div className='navBar'>
    <NavLink
        to='/'
    >
        Exhibitions
    </NavLink>
    <NavLink
        to='/artists'
    >
        Artists
    </NavLink>

    <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

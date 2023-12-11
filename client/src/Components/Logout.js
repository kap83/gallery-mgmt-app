
import React, {useContext} from 'react'
import {UserContext} from '../Context/User'

export default function Logout() {
    const {handleLogout, currentUser} = useContext(UserContext)

    console.log(currentUser)
  return (
    <>
       <img className='headerAvatar' src={currentUser.avatar_url} alt='avatar'/>
        <button className='logOutBtn' onClick={handleLogout}>LOGOUT</button>
    </>
  )
}

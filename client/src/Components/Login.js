import React, {useState, useContext} from 'react'
import {UserContext} from '../Context/User'
import logo from '../images/logo.jpg'

import '../index.css'

export default function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const {setLoggedIn, setCurrentUser} = useContext(UserContext)

function handleSubmit(e) {
    e.preventDefault()
    const loginValues = {
        username: username,
        password: password
      }

    fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginValues)
    })
    .then(res => {
        if(res.ok) {
          res.json()
          .then(data => {
            setCurrentUser(data)
            setLoggedIn(true)
            setUsername('')
            setPassword('')
          })
        }
        else {
          res.json()
          .then(data =>{
              const errorMsg = data.error
              alert(errorMsg)
          })
        }
      })
}


  return (
    <div className='loginStyle'>
      <img className='logo' src={logo} alt='logo' />
      <form className='loginStyle' onSubmit={handleSubmit}>
        <label className='loginLabelStyle'>
            USERNAME:
            <input className='loginInputStyle'
              type='text'
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
        </label>
        <label className='loginLabelStyle'>
            PASSWORD:
            <input className='loginInputStyle'
              type='text'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
        </label>
        <button className='loginBtnStyle' type='submit'>LOGIN</button>
      </form>
      
    </div>
  )
}

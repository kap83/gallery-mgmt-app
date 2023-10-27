import React, {useState, useContext} from 'react'
import {UserContext} from '../Context/User'

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
    <>
        <div>
      <form onSubmit={handleSubmit}>
        <label>
            USERNAME:
            <input
              type='text'
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
        </label>
        <label>
            PASSWORD:
            <input
              type='text'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
        </label>
        <button type='submit'>LOGIN</button>
        

      </form>
    </div>
    </>
  )
}
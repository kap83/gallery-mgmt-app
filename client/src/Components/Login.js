import React, {useState, useContext} from 'react'
import {UserContext} from '../Context/User'
import logo from '../images/logo.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorHandling from '../Components/ErrorHandling'

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

      const myPromise = new Promise((resolve, reject) => {
        fetch('/login', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginValues)
      })
          .then((res) => {
            if (res.ok) {
              return res.json().then((data) => {
                resolve(data)
                setCurrentUser(data)
                setLoggedIn(true)
                setUsername('')
                setPassword('')
              });
            } else {
              return res.json().then((data) => {
                reject(data)
              });
            }
          })
          .catch((error) => {
            reject(error)
          });
      });
  
      toast.promise(myPromise, {
        pending: { render: "One moment! Authorizing!" },
        success: "Welcome!",
  
        error: {
          render({ data }) {
            console.error("in error", Object.entries(data));
            let test = Object.values(data)
            return <ErrorHandling errors={data && test} />
          }
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
      <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
  )
}

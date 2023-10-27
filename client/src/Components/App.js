
import React, {useContext} from 'react'
import {UserContext} from '../Context/User'
import Login from './Login';
//import './App.css';


function App() {
  const {loggedIn} = useContext(UserContext)

  return (
    <>
    <Login />
    {loggedIn ? <p>👋</p> : <p>😔</p> }
    </>
  )

}

export default App;

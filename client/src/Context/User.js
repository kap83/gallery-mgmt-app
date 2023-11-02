import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // eslint-disable-next-line
  const [notLoggedInError, setNotLoggedInError] = useState('')

  console.log("in context", currentUser)
  console.log("in context", loggedIn)

  useEffect(()=> {
    fetch("/me").then(res=> {
      if (res.ok) {
        res.json()
        .then(data => {
          console.log("in useEffect", data)
          setCurrentUser(data)
          setLoggedIn(true)
        })
      } else {
        res.json()
        .then(data => {
          setNotLoggedInError(data.error)
        })
      }
    })
  }, [])


  function handleLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(()=> {
      setCurrentUser()
      setLoggedIn(false)
    })
  }




  const userValues = {
    setLoggedIn,
    loggedIn,
    setCurrentUser,
    currentUser,
    handleLogout

  }


  return <UserContext.Provider value={userValues}>{children}</UserContext.Provider>;
}
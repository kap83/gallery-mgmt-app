import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {



  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // eslint-disable-next-line
  const [notLoggedInError, setNotLoggedInError] = useState('')

  //console.log("in context user", currentUser)
  // console.log("in context", loggedIn)

  useEffect(()=> {
    fetch("/me").then(res=> {
      if (res.ok) {
        res.json()
        .then(data => {
          //console.log("in useEffect", data)
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

  const handleCurrentUserNewExhibition = (newExhibition) => {
      //console.log("newExhibition", newExhibition)
    const updateExhibitions = [...currentUser.exhibitions, newExhibition]
  
      setCurrentUser({
        ...currentUser,
        exhibitions: updateExhibitions
      })
  }

  const handleCurrentUserDeletedExhibitions = (deletedExhibition) => {
    //console.log("in handle", deletedExhibition)
    
    const updatedExhibitionsArr = currentUser.exhibitions.filter(e => e.id !== deletedExhibition.id)
    setCurrentUser({
      ...currentUser,
      exhibitions: updatedExhibitionsArr
    })
  }




  const userValues = {
    setLoggedIn,
    loggedIn,
    setCurrentUser,
    currentUser,
    handleLogout,
    handleCurrentUserNewExhibition,
    handleCurrentUserDeletedExhibitions
  }


  return <UserContext.Provider value={userValues}>{children}</UserContext.Provider>;
}
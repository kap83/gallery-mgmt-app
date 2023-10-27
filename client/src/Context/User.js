import React, { useState } from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({});
  // eslint-disable-next-line
  const [notLoggedInError, setNotLoggedInError] = useState('')

  console.log("in context", currentUser)
  console.log("in context", loggedIn)

  const userValues = {
    setLoggedIn,
    loggedIn,
    setCurrentUser

  }


  return <UserContext.Provider value={userValues}>{children}</UserContext.Provider>;
}
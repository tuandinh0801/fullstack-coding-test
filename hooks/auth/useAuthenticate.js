import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'services/firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authState) => {
      setUser(authState || null)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthenticate = () => useContext(AuthContext)


export { useAuthenticate, AuthProvider }

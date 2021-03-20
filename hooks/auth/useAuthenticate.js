import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'services/firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(firebase.auth().currentUser)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authState) => {
      setUser(authState)
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthenticate = () => useContext(AuthContext)


export { useAuthenticate, AuthProvider }

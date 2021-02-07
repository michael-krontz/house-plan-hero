import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signupUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signupUser
  }
  
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    
  )
}

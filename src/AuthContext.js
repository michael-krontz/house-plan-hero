import React, { useContext } from 'react'
import { auth } from './firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  function signupUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signupUser
  }
  
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    
  )
}

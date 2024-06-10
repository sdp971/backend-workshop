import { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (authUser.role === 3) {
      setIsAdmin(true);
    }
  }, [authUser.role]);

  const logout = () => {
    setToken(" ")
    setIsAdmin(false);
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
  }


  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
    token,
    setToken,
    logout,

    
  };



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };

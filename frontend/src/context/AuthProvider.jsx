import  { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authUser.role === 3) {
      setIsAdmin(true);
    }
  }, [authUser.role]);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth, AuthContext };

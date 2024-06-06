import { useAuth } from "../../context/AuthProvider"



function Profile() {
  
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  
  return (
    <h2>
      Page de profil
    </h2>
  )
}

export default Profile

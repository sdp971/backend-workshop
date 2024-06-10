import { useAuth } from "../../context/AuthProvider"



function Profile() {
  
  const { authUser, isLoggedIn } = useAuth();

  
  return (
    
    <h2>
      {isLoggedIn ? ` Bienvenue ${authUser.username} sur votre page de profil` : "Unauthorized access ⛔"}
    </h2>
  )
}

export default Profile

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';




function Navbar() {
  const { isLoggedIn,logout } = useAuth();
  const navigate = useNavigate();



  


  function handleLogout() {
  
  logout()
  navigate('/login');
   
  }

   let authButton;
   if (isLoggedIn) {
     authButton = <Button onClick={handleLogout}>Se déconnecter</Button>;
   } else {
     authButton = (
       <NavLink to='/login' className='navlink'>
         <Button>Se connecter</Button>
       </NavLink>
     );
   }



  return (
    <nav>
      <header className='navigation'>
        <p className='logo'>Bibliothèque</p>
        <ul className='navigation_links'>
          <li>
            <NavLink to='/' className='navlink'>
              Page d' accueil
            </NavLink>
          </li>
          <li>
            <NavLink to='/media' className='navlink'>
              Liste des médias
            </NavLink>
          </li>
          <li>{authButton}</li>
        </ul>
      </header>
    </nav>
  );
}

export default Navbar;

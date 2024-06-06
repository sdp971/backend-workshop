import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const { isLoggedIn } = useAuth;
  
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
        </ul>
        <NavLink to='/login' className='navlink'>
          <button className='btn-login'>Se connecter</button>
        </NavLink>
      </header>
    </nav>
  );
}

export default Navbar;

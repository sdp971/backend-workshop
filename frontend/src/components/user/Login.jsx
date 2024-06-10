import { useState } from 'react';
import useAPI from '../../api/useApi.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider.jsx';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const api = useAPI();
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser, setToken } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (surname === '' || password === '') {
      console.error('Veuillez remplir tous les champs');
      return;
    }

    const user = {
      password: password,
      username: surname,
    };

    api
      .post('/api/login/', user)
      .then((res) => {
        setIsLoggedIn(true);

        const token = res.data.token;
        setToken(token);
        sessionStorage.setItem('token', token);
        api.defaults.headers.authorization = `Bearer ${token}`;
        const decodedToken = jwtDecode(token);

        setAuthUser({
          id: decodedToken.userId,
          username: decodedToken.username,
          role: decodedToken.role,
        });

        

        navigate('/profile');
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response.data);
        }
      });
  };

 

  return (
    <form>
      <label htmlFor='surname'>Nom utilisateur:</label>
      <input
        type='text'
        id='surname'
        name='surname'
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <label htmlFor='password'>Mot de passe:</label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit' onClick={handleSubmit}>
        Se connecter
      </button>
    
    </form>
  );
}

export default Login;

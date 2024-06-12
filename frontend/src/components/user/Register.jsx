import { useState } from "react";
import { NavLink } from 'react-router-dom';


function Register() {

const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
const [surname, setSurname] = useState('');
const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  return (
    <>
      <form>
        <h2 className='form-title'>FORMULAIRE D' INSCRIPTION</h2>

        <label htmlFor='firstname' className="labelText">Nom :</label>
        <input
          type='text'
          id='firstname'
          name='firstname'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor='lastname'>Prénom :</label>
        <input
          type='text'
          id='lastname'
          name='lastname'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor='lastname'>Age :</label>
        <input
          type='integer'
          id='age'
          name='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor='lastname'>Numéro de téléphone :</label>
        <input
          type='integer'
          id='phoneNumber'
          name='phoneNumber'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
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
        {error && <p className='error-message'>{errorMessage}</p>}
        <button type='submit'>S'inscrire</button>

        <NavLink to='/login' className='register-link'>
          {' '}
          Vous avez un compte ? Connectez-vous ici
        </NavLink>
      </form>
    </>
  );
    
}

export default Register

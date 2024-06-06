import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Media from './pages/Media.jsx';
import Login from './components/user/Login.jsx';
import Home from './pages/Home.jsx';
import Profile from './components/user/Profile.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import Navbar from './components/Navbar.jsx';




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/media' element={<Media />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

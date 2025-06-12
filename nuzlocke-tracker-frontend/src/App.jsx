import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrackerPage from './pages/TrackerPage';
import BoxPage from './pages/BoxPage';
import GravePage from './pages/GravePage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/tracker' element={<TrackerPage />} />
      <Route path='/box' element={<BoxPage />} />
      <Route path='/grave' element={<GravePage />} />
    </Routes>
  );
};

export default App

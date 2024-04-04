import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

function App() {
  const [page, setPage] = useState('home');
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'));
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('access_token'));
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <div className='h-dvh w-screen flex flex-col'>
        <Outlet />
        <NavBar setPage={setPage} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

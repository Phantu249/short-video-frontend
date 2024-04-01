import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

function App() {
  const [page, setPage] = useState('home');
  const [isAuth, setIsAuth] = useState(false);
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

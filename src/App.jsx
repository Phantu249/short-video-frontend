import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { createContext, useEffect, useRef, useState } from 'react';
import { Messages } from 'primereact/messages';

export const AuthContext = createContext();
export const MessagesContext = createContext();

function App() {
  const [page, setPage] = useState('home');
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'));
  const globalMessage = useRef(null);
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('access_token'));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <div className='flex justify-center items-center'>
        <Messages ref={globalMessage} className='globalMessage' />
      </div>
      <MessagesContext.Provider value={globalMessage}>
        <div className='h-dvh w-screen flex flex-col'>
          <Outlet />
          <NavBar setPage={setPage} />
        </div>
      </MessagesContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

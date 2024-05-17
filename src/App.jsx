import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { createContext, useEffect, useRef, useState } from 'react';
import { Messages } from 'primereact/messages';
import ReactLoading from 'react-loading';
import { jwtDecode } from 'jwt-decode';
import useWebSocket from 'react-use-websocket';
import { instanceWToken, WS_URL } from './instance.js';
import { useAsync } from 'react-use';

export const AppContext = createContext();
export const MessagesContext = createContext();

function App() {
  const [page, setPage] = useState('home');
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'));
  const [userId, setUserId] = useState(null);
  const globalMessage = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasNotif, setHasNotif] = useState(false);
  const [socketUrl, setSocketUrl] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useAsync(async () => {
    if (!localStorage.getItem('access_token')) {
      return;
    }
    try {
      const payload = jwtDecode(localStorage.getItem('access_token'));
      setUserId(payload.user_id);
      setIsAuth(!!localStorage.getItem('access_token'));
      try {
        const ticket = await instanceWToken.get('getticket');
        if (ticket.status === 200) {
          setSocketUrl(`${WS_URL}notification/${payload.user_id}?uuid=${ticket.data.uuid}`);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.log(error);
    }
  }, [localStorage.getItem('access_token')]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    retryOnError: true,
  });

  useEffect(() => {
    console.log('ready', readyState);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.action === 'message') {
        return setHasNotif(true);
      }
      globalMessage.current.show([
        {
          severity: 'info',
          detail: lastJsonMessage.message,
          closable: true,
        },
      ]);
    }
  }, [lastJsonMessage]);

  return (
    <AppContext.Provider
      value={{ isAuth, setIsAuth, setLoading, userId, hasNotif, setHasNotif, isSearching, setIsSearching }}>
      <div className='flex justify-center items-center'>
        <Messages ref={globalMessage} className='globalMessage' />
      </div>
      <MessagesContext.Provider value={globalMessage}>
        <div className='relative h-dvh w-screen flex flex-col'>
          {loading ? (
            <ReactLoading
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        p-2 rounded-2xl bg-gray-500 bg-opacity-80 z-[100]'
              type={'spin'}
              color={'white'}
              width={80}
              height={80}
            />
          ) : (
            ''
          )}
          <Outlet />
          <NavBar setPage={setPage} />
        </div>
      </MessagesContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

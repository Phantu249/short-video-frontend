import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import { createContext, useEffect, useRef, useState } from 'react';
import { Messages } from 'primereact/messages';
import ReactLoading from 'react-loading';
import { jwtDecode } from 'jwt-decode';
import useWebSocket from 'react-use-websocket';
import instance, { instanceWToken, WS_URL } from './instance.js';
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
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [watched, setWatched] = useState([]);
  const [homeState, setHomeState] = useState('forYou');
  const [playingVideo, setPlayingVideo] = useState(0);

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

  useAsync(async () => {
    setLoading(true);
    setVideos([]);
    setWatched([]);
    const data = {
      type: homeState,
      watched: [],
    };
    try {
      if (isAuth) {
        const response = await instanceWToken.post(`videorecommend`, data);
        if (response.status === 200) {
          setVideos(response.data);
          const arr = response.data.map((video) => video.id);
          setWatched(arr);
        }
      } else {
        const response = await instance.post(`videorecommend`, data);
        if (response.status === 200) {
          setVideos(response.data);
          const arr = response.data.map((video) => video.id);
          setWatched(arr);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status === 401) {
        return navigate('/login');
      }
    }
    setLoading(false);
  }, [homeState]);

  useEffect(() => {
    setPlayingVideo(0);
  }, [homeState]);

  const loadMore = async () => {
    const data = {
      type: homeState,
      watched,
    };
    try {
      if (isAuth) {
        const response = await instanceWToken.post(`videorecommend`, data);
        if (response.status === 200) {
          setVideos((prev) => [...prev, ...response.data]);
          const arr = response.data.map((video) => video.id);
          setWatched((prev) => [...prev, ...arr]);
        }
      } else {
        const response = await instance.post(`videorecommend`, data);
        if (response.status === 200) {
          setVideos((prev) => [...prev, ...response.data]);
          const arr = response.data.map((video) => video.id);
          setWatched((prev) => [...prev, ...arr]);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return navigate('/login');
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        setLoading,
        userId,
        hasNotif,
        setHasNotif,
        isSearching,
        setIsSearching,
        videos,
        setVideos,
        watched,
        setWatched,
        homeState,
        setHomeState,
        playingVideo,
        setPlayingVideo,
        loadMore,
      }}>
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

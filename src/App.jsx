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
import { useMediaQuery } from 'react-responsive';
import HeaderDesktop from './components/desktop_component/HeaderDesktop.jsx';
import NavBarDesktop from './components/desktop_component/NavBarDesktop.jsx';

export const AppContext = createContext({});
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
  const [reloadHome, setReloadHome] = useState(true);

  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [reloadProfile, setReloadProfile] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isHidden = useMediaQuery({ query: '(max-width: 860px)' });

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      return;
    }
    try {
      const payload = jwtDecode(localStorage.getItem('access_token'));
      setUserId(payload.user_id);
      setIsAuth(!!localStorage.getItem('access_token'));
      setSocketUrl(`${WS_URL}notification/${payload.user_id}?token=${localStorage.getItem('access_token')}`);
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.log(error);
    }
  }, [localStorage.getItem('access_token')]);

  useAsync(async () => {
    if (!isAuth) {
      return;
    }
    if (!reloadProfile) return;
    setLoading(true);
    try {
      const res = await instanceWToken.get('profile');
      if (res.status === 200) {
        setLoading(false);

        const { user_id, profile, follower, following, username, first_name, last_name, like_count } = res.data;
        setUsername(username);
        setProfile(profile);
        setFollow({ follower, following });
        setLikeCount(like_count);
        setFirst_name(first_name);
        setLast_name(last_name);
        setUserId(user_id);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
    setLoading(false);
  }, [isAuth, reloadProfile]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      return isAuth;
    },
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
    if (!reloadHome) return;
    console.log('reload home');
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
        console.log('not auth');
        if (homeState === 'follow') {
          setLoading(false);
          setPlayingVideo(0);
          setReloadHome(false);
          globalMessage.current.show([
            {
              severity: 'error',
              detail: 'You need to login',
              closable: true,
            },
          ]);
          return;
        }
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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
    setLoading(false);
    setPlayingVideo(0);
    setReloadHome(false);
  }, [reloadHome]);

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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
  };
  return (
    <AppContext.Provider
      value={{
        loading,
        isMobile,
        isHidden,
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
        setReloadHome,
        reloadHome,
        loadMore,
        username,
        profile,
        follow,
        likeCount,
        first_name,
        last_name,
        setReloadProfile,
      }}>
      <div className='flex justify-center items-center'>
        <Messages ref={globalMessage} className='globalMessage z-[100]' />
      </div>
      <MessagesContext.Provider value={globalMessage}>
        <div className={`relative h-dvh w-screen flex flex-col`}>
          {loading && (
            <ReactLoading
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        p-2 rounded-2xl bg-gray-500 bg-opacity-80 z-[100]'
              type={'spin'}
              color={'white'}
              width={80}
              height={80}
            />
          )}
          {!isMobile && (
            <>
              <HeaderDesktop />
              <div className='flex relative w-full flex-grow flex-row overflow-y-hidden z-[1] h-full'>
                <NavBarDesktop setPage={setPage} />
                <Outlet />
              </div>
            </>
          )}
          {isMobile && (
            <>
              <Outlet />
              <NavBar setPage={setPage} />
            </>
          )}
        </div>
      </MessagesContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

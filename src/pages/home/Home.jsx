import { useContext, useState } from 'react';
import Header from '../../components/Header.jsx';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import instance, { instanceWToken } from '../../instance.js';
import { useAsync } from 'react-use';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [homeState, setHomeState] = useState('forYou');
  const { isAuth, setLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const [watched, setWatched] = useState([]);

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

  console.log('watched', watched);

  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            bg-black
            z-[1]
            h-full'>
      <Header homeState={homeState} setHomeState={setHomeState} />
      {videos.length > 0 ? <VideoPlayer loadMore={loadMore} videos={videos} homeState={homeState} /> : ''}
    </div>
  );
};
export default Home;

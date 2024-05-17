import { memo, useContext } from 'react';
import Header from '../../components/Header.jsx';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuth, setLoading, videos, setVideos, homeState, watched, setWatched } = useContext(AppContext);
  const navigate = useNavigate();

  // const loadMore = async () => {
  //   const data = {
  //     type: homeState,
  //     watched,
  //   };
  //   try {
  //     if (isAuth) {
  //       const response = await instanceWToken.post(`videorecommend`, data);
  //       if (response.status === 200) {
  //         setVideos((prev) => [...prev, ...response.data]);
  //         const arr = response.data.map((video) => video.id);
  //         setWatched((prev) => [...prev, ...arr]);
  //       }
  //     } else {
  //       const response = await instance.post(`videorecommend`, data);
  //       if (response.status === 200) {
  //         setVideos((prev) => [...prev, ...response.data]);
  //         const arr = response.data.map((video) => video.id);
  //         setWatched((prev) => [...prev, ...arr]);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response.status === 401) {
  //       return navigate('/login');
  //     }
  //   }
  // };

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
      <Header />
      {videos.length > 0 ? <VideoPlayer /> : ''}
    </div>
  );
};
export default memo(Home);

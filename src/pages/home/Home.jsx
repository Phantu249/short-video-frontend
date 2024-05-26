import { memo, useContext } from 'react';
import Header from '../../components/Header.jsx';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import VideoSwiper from '../../components/VideoSwiper.jsx';

const Home = () => {
  const { isAuth, setLoading, videos, setVideos, homeState, watched, setWatched } = useContext(AppContext);
  const navigate = useNavigate();

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
      {videos?.length > 0 && <VideoSwiper />}
    </div>
  );
};
export default memo(Home);

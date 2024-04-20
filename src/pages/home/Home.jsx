import { useContext, useState } from 'react';
import Header from '../../components/Header.jsx';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import instance, { instanceWToken } from '../../instance.js';
import { useAsync } from 'react-use';
import { AuthContext } from '../../App.jsx';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const { isAuth } = useContext(AuthContext);

  useAsync(async () => {
    try {
      if (isAuth) {
        const response = await instanceWToken.get('/video');
        if (response.status === 200) {
          setVideos(response.data);
        }
      } else {
        const response = await instance.get('/video');
        if (response.status === 200) {
          setVideos(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            z-[1]
            h-full'>
      <Header />
      {videos.length > 0 ? <VideoPlayer videos={videos} /> : ''}
    </div>
  );
};
export default Home;

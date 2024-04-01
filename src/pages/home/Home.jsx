import DetailVideo from '../../components/home/DetailVideo.jsx';
import ActionButtonContainer from '../../components/home/ActionButtonContainer.jsx';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import CommentContainer from '../../components/home/CommentContainer.jsx';
import Header from '../../components/Header.jsx';
import axios from 'axios';
import { AuthContext } from '../../App.jsx';

export const HomeContext = createContext();
const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const videoRef = useRef(null);
  const [video, setVideo] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(0);
  const [position, setPosition] = useState([]);
  const [direction, setDirection] = useState(null);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/video/')
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.getItem('refresh_token') ? setIsAuth(true) : setIsAuth(false);
  }, []);

  const handleClick = (e) => {
    // if Cmt is opening => just close it else do the play/pause video
    if (isCommentOpen) {
      setIsCommentOpen(false);
    } else {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
    setIsPlaying(videoRef.current.paused);
  };
  const handleTouchStart = (e) => {
    setPosition([e.touches[0].clientX, e.touches[0].clientY]);
  };

  const handleTouchMove = (e) => {
    if (e.target.id === 'home-container' || e.target.id === 'video-player') {
      const curPosition = [e.touches[0].clientX, e.touches[0].clientY];

      if (curPosition[1] - position[1] > 0) {
        setDirection('down');
      }
      if (curPosition[1] - position[1] < 0) {
        setDirection('top');
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (direction === 'down') {
      setPlayingVideo((cur) => (cur - 1 + video.length) % video.length);
    }
    if (direction === 'top') {
      setPlayingVideo((cur) => (cur + 1) % video.length);
    }
    setDirection('');
    setIsPlaying(false);
  };
  return (
    <HomeContext.Provider value={{ isCommentOpen, setIsCommentOpen }}>
      <Header />
      <div
        className='
            flex
            relative
            w-full
            flex-grow
            overflow-y-hidden
            justify-center
            items-center
            z-[1]
            bg-black
            h-full
        '
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        id='home-container'>
        <video
          loop
          autoPlay
          src={video[playingVideo]?.video_path}
          className='
            max-w-full
            max-h-full
            z-[1]
          '
          id='video-player'
          ref={videoRef}>
          {/*if u want add autoPlay u need set isPlaying init to true*/}
          {/*but remember autoPlay is blocked by browser*/}
        </video>

        <FaPlay
          className={`
            absolute
            z-[3]
            text-white
            size-10
            opacity-[0.5]
            drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
            ${isPlaying ? 'block' : 'hidden'}`}
        />

        <DetailVideo content={[video[playingVideo]?.user_name, video[playingVideo]?.description]} />
        <ActionButtonContainer />
        <CommentContainer display={`${isCommentOpen ? 'block' : 'hidden'}`} comments={video[playingVideo]?.comments} />
      </div>
    </HomeContext.Provider>
  );
};
export default Home;

import DetailVideo from './home/DetailVideo.jsx';
import ActionButtonContainer from './home/ActionButtonContainer.jsx';
import CommentContainer from './home/CommentContainer.jsx';
import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';

export default function VideoPlayer({ videos }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const videoRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(0);
  const [position, setPosition] = useState([]);
  const [direction, setDirection] = useState(null);

  // useEffect(() => {
  //   setIsPlaying(false);
  //   setIsCommentOpen(false);
  // }, []);

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
      setPlayingVideo((cur) => (cur - 1 + videos.length) % videos.length);
    }
    if (direction === 'top') {
      setPlayingVideo((cur) => (cur + 1) % videos.length);
    }
    setDirection('');
    setIsPlaying(false);
  };
  return (
    <div
      className='
            flex
            absolute
            top-0
            left-0
            w-full
            flex-grow
            overflow-y-hidden
            justify-center
            items-center
            z-[1]
            bg-black
            h-full
        '
      // style={{ display: display ? 'flex' : 'none' }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id='home-container'>
      <video
        loop
        autoPlay
        src={videos[playingVideo]?.video_path}
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
            opacity-[0.6]
            drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
            ${isPlaying ? 'block' : 'hidden'}`}
      />

      <DetailVideo content={[videos[playingVideo]?.user_name, videos[playingVideo]?.description]} />
      {videos[playingVideo] ? (
        <ActionButtonContainer
          video={videos[playingVideo]}
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
        />
      ) : (
        ''
      )}

      <CommentContainer
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        comments={videos[playingVideo]?.comments}
      />
    </div>
  );
}

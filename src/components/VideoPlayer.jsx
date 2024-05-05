import DetailVideo from './home/DetailVideo.jsx';
import ActionButtonContainer from './home/ActionButtonContainer.jsx';
import CommentContainer from './home/CommentContainer.jsx';
import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import Hls from 'hls.js';

export default function VideoPlayer({ setReload, videos, homeState }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const videoRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(0);
  const [position, setPosition] = useState([]);
  const [direction, setDirection] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  useEffect(() => {
    setPlayingVideo(0);
  }, [homeState]);

  useEffect(() => {
    const videoSrc = videos[playingVideo].video_path;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
    }
  }, [playingVideo]);

  const handleClick = (e) => {
    // if Cmt is opening => just close it else do the play/pause video
    if (isCommentOpen) {
      setIsCommentOpen(false);
    } else {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
    setIsPlaying(videoRef.current.paused);
  };

  const handleMouseStart = (e) => {
    setPosition([e.clientX, e.clientY]);
    setMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (!mouseDown) return;
    if (e.target.id === 'home-container' || e.target.id === 'video-player') {
      const curPosition = [e.clientX, e.clientY];
      if (curPosition[1] - position[1] > 20) {
        setDirection('down');
      }
      if (curPosition[1] - position[1] < -20) {
        setDirection('top');
      }
    }
  };
  const handleTouchStart = (e) => {
    setPosition([e.touches[0].clientX, e.touches[0].clientY]);
  };

  const handleTouchMove = (e) => {
    if (e.target.id === 'home-container' || e.target.id === 'video-player') {
      const curPosition = [e.touches[0].clientX, e.touches[0].clientY];

      if (curPosition[1] - position[1] > 20) {
        setDirection('down');
      }
      if (curPosition[1] - position[1] < -20) {
        setDirection('top');
      }
    }
  };

  const handleMove = (e) => {
    setMouseDown(false);
    if (direction === 'down') {
      setPlayingVideo((cur) => (cur - 1 + videos.length) % videos.length);
    }
    if (direction === 'top') {
      setPlayingVideo((cur) => (cur + 1) % videos.length);
    }
    setDirection('');
    setIsPlaying(false);
    if (videos.length === playingVideo + 2) {
      setReload(1);
    }
  };

  useEffect(() => {
    if (!isCommentOpen) {
      document.addEventListener('keydown', handelKeyDown);
    }
    if (isCommentOpen) {
      return () => {
        document.removeEventListener('keydown', handelKeyDown);
      };
    }
    return () => {
      document.removeEventListener('keydown', handelKeyDown);
    };
  }, [isCommentOpen]);

  const handelKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setPlayingVideo((cur) => (cur + 1) % videos.length);
    }
    if (e.key === 'ArrowDown') {
      setPlayingVideo((cur) => (cur - 1 + videos.length) % videos.length);
    }
    if (videos.length === playingVideo + 2) {
      setReload(1);
    }
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
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMove}
      id='home-container'>
      <video
        loop
        autoPlay
        className='
            max-w-full
            max-h-full
            z-[1]
          '
        id='video-player'
        ref={videoRef}>
        preLoad='metadata'
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

      <DetailVideo content={[videos[playingVideo]?.full_name, videos[playingVideo]?.description]} />
      {videos[playingVideo] ? (
        <ActionButtonContainer
          video={videos[playingVideo]}
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
        />
      ) : (
        ''
      )}

      {videos[playingVideo] ? (
        <CommentContainer
          video={videos[playingVideo]}
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
}

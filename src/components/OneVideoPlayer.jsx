import { useParams } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import DetailVideo from './home/DetailVideo.jsx';
import ActionButtonContainer from './home/ActionButtonContainer.jsx';
import CommentContainer from './home/CommentContainer.jsx';
import { useRef, useState } from 'react';
import { useAsync } from 'react-use';
import instance from '../instance.js';
import { IoIosArrowBack } from 'react-icons/io';

export default function OneVideoPlayer() {
  const { pk } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const videoRef = useRef(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  useAsync(async () => {
    setIsPlaying(false);
    setIsCommentOpen(false);
    try {
      const response = await instance.get(`video/${pk}`);
      if (response.status === 200) {
        setPlayingVideo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleBackClick = (e) => {
    e.stopPropagation();
    window.history.back();
  };

  return (
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
      id='home-container'>
      <IoIosArrowBack
        className='size-8 text-white drop-shadow-md shadow-black absolute top-4 left-3 z-[2]'
        onClick={handleBackClick}
      />
      <video
        loop
        autoPlay
        src={playingVideo?.video_path}
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
      {playingVideo && <DetailVideo content={[playingVideo?.full_name, playingVideo?.description]} />}
      {playingVideo && (
        <ActionButtonContainer video={playingVideo} isCommentOpen={isCommentOpen} setIsCommentOpen={setIsCommentOpen} />
      )}
      {playingVideo && (
        <CommentContainer video={playingVideo} isCommentOpen={isCommentOpen} setIsCommentOpen={setIsCommentOpen} />
      )}
    </div>
  );
}

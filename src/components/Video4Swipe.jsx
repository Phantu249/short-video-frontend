import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../App.jsx';
import Hls from 'hls.js';
import { FaPlay } from 'react-icons/fa6';
import DetailVideo from './home/DetailVideo.jsx';
import ActionButtonContainer from './home/ActionButtonContainer.jsx';

export default function Video4Swipe(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const { playingVideo, setPlayingVideo, videos, loadMore, isHidden } = useContext(AppContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [hlsReady, setHlsReady] = useState(false);
  const [currThumbnail, setCurrThumbnail] = useState(null);
  // const [isCommentOpen, setIsCommentOpen] = useState(false);

  // useEffect(() => {
  //   props.setIsCommentOpen(isCommentOpen);
  // }, [isCommentOpen]);

  useEffect(() => {
    if (props.isPlay) {
      setCurrentVideo(videos[playingVideo]);
    } else if (props.realIdx === props.idx + 1 || props.realIdx === props.idx - 2) {
      setCurrentVideo(videos[playingVideo - 1]);
    } else if (props.realIdx === props.idx - 1 || props.realIdx === props.idx + 2) {
      setCurrentVideo(videos[playingVideo + 1]);
    }
  }, [playingVideo]);

  useEffect(() => {
    if (videos.length === 0) return;
    if (!currentVideo) return;
    setCurrThumbnail(currentVideo.thumbnail);
    setHlsReady(false);
    const videoSrc = currentVideo.video_path;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoSrc;
    }
    setHlsReady(true);
    // setIsPlaying(!videoRef.current.paused);
  }, [currentVideo, props.idx]);

  const handleClick = (e) => {
    // if Cmt is opening => just close it else do the play/pause video
    if (props.isCommentOpen) {
      return props.setIsCommentOpen(false);
    } else {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
    setIsPlaying(videoRef.current.paused);
  };

  useEffect(() => {
    if (!hlsReady) return;
    setIsPlaying(!props.isPlay);
    if (props.isPlay) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [props.isPlay, hlsReady]);

  return (
    <div
      className={`
        flex
        relative
        w-full
        justify-center
        items-center
        z-[1]
        h-full
        overflow-hidden
        ${isHidden ? '' : 'rounded-xl'}`}
      onClick={handleClick}
      id='home-container'>
      <video
        loop
        className='
            max-w-full
            max-h-full
            z-[1]
            rounded-md
          '
        id='video-player'
        ref={videoRef}></video>
      {!isHidden && (
        <img
          src={currThumbnail}
          alt='thumbnail'
          className={`absolute object-cover top-0 left-0 z-[0] w-full h-full blur-lg opacity-[0.6]`}></img>
      )}

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
      {currentVideo && <DetailVideo content={[currentVideo.full_name, currentVideo.description]} />}
      {currentVideo && (
        <ActionButtonContainer
          video={currentVideo}
          isCommentOpen={props.isCommentOpen}
          setIsCommentOpen={props.setIsCommentOpen}
        />
      )}
    </div>
  );
}

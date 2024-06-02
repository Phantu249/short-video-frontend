import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-use';
import instance from '../instance.js';
import Hls from 'hls.js';
import { FaPlay } from 'react-icons/fa6';
import DetailVideo from '../components/home/DetailVideo.jsx';

export default function Test() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleSlideChange = (swiper) => {
    console.log('slide change', swiper.realIndex, swiper.swipeDirection);
    setPlayingVideo(swiper.realIndex);
  };

  return (
    <div className='flex w-[100vw] h-[100vh] justify-center items-center '>
      <div className='w-[200px] h-[300px] bg-gray-300'>
        Test Swiper
        <Swiper className='h-full' direction={'vertical'} loop={true}>
          <SwiperSlide className='h-full'>
            <img src='https://picsum.photos/200/300' alt='1' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://picsum.photos/200/300' alt='2' />
          </SwiperSlide>
          <SwiperSlide>
            <img src='https://picsum.photos/200/300' alt='3' />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='w-[200px] h-[300px] bg-gray-300 '>
        <Swiper onSlideChange={handleSlideChange} className='h-full w-full' direction={'vertical'} loop={true}>
          <SwiperSlide className='h-full w-full'>
            <Video isPlay={playingVideo === 0} id={{ pk: 2 }} />
          </SwiperSlide>
          <SwiperSlide>
            <Video isPlay={playingVideo === 1} id={{ pk: 4 }} />
          </SwiperSlide>
          <SwiperSlide>
            <Video isPlay={playingVideo === 2} id={{ pk: 16 }} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

function Video({ id, isPlay }) {
  const { pk } = id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  let videoRef = useRef();
  const [playingVideo, setPlayingVideo] = useState(null);

  useAsync(async () => {
    setIsCommentOpen(false);
    try {
      const response = await instance.get(`video/${pk}`);
      if (response.status === 200) {
        setPlayingVideo(response.data);
        const videoSrc = response.data.video_path;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(videoRef.current);
        }
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

  useEffect(() => {
    setIsPlaying(!isPlay);
    if (isPlay) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlay]);

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
      <video
        loop
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
    </div>
  );
}

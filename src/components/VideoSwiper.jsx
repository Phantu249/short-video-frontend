import Video4Swipe from './Video4Swipe.jsx';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function VideoSwiper() {
  const { playingVideo, setPlayingVideo, videos, loadMore } = useContext(AppContext);
  const [playing, setPlaying] = useState(0);
  const [direction, setDirection] = useState(null);
  const arr = new Array(videos.length > 3 ? 3 : videos.length).fill(0);

  useEffect(() => {
    if (videos.length === 0) return;
    if (playingVideo + 2 >= videos.length) {
      console.log('load more');
      loadMore();
    }
  }, [playingVideo]);

  useEffect(() => {
    if (direction === 'next') {
      setPlayingVideo((prev) => prev + 1);
    } else if (direction === 'prev') {
      setPlayingVideo((prev) => prev - 1);
    }
    setDirection(null);
  }, [playing]);

  const handleSlideChange = (swiper) => {
    setDirection(swiper.swipeDirection);
    setPlaying(swiper.realIndex);
  };
  return (
    <div
      className='
            w-full
            z-[1]
            h-full'>
      <Swiper
        allowSlideNext={playingVideo < videos.length - 1}
        allowSlidePrev={playingVideo > 0}
        onSlideChange={handleSlideChange}
        className='
            w-full
            h-full'
        direction={'vertical'}
        loop={true}>
        {arr.length > 0
          ? arr.map((video, idx) => {
              return (
                <SwiperSlide key={idx} className='h-full'>
                  <Video4Swipe isPlay={playing === idx} realIdx={playing} idx={idx} />
                </SwiperSlide>
              );
            })
          : ''}
      </Swiper>
    </div>
  );
}

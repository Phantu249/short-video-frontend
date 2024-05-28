import Video4Swipe from './Video4Swipe.jsx';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommentContainer from './home/CommentContainer.jsx';

export default function VideoSwiper() {
  const { playingVideo, setPlayingVideo, videos, loadMore, isHidden } = useContext(AppContext);
  const [playing, setPlaying] = useState(0);
  const [direction, setDirection] = useState(null);
  const arr = new Array(videos.length > 3 ? 3 : videos.length).fill(0);
  const [currVideo, setCurrVideo] = useState(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    if (videos.length === 0) return;
    setCurrVideo(videos[playingVideo]);
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
    <div className='flex w-full z-[1] h-full overflow-hidden'>
      <Swiper
        allowSlideNext={playingVideo < videos.length - 1 && !isCommentOpen}
        allowSlidePrev={playingVideo > 0 && !isCommentOpen}
        onSlideChange={handleSlideChange}
        className='flex flex-col flex-grow w-full h-full'
        direction={'vertical'}
        loop={true}>
        {arr.length > 0
          ? arr.map((video, idx) => {
              return (
                <SwiperSlide key={idx} className={`h-full ${isHidden ? '' : 'p-3'}`}>
                  <Video4Swipe
                    isCommentOpen={isCommentOpen}
                    setIsCommentOpen={setIsCommentOpen}
                    setCurrVideo={setCurrVideo}
                    isPlay={playing === idx}
                    realIdx={playing}
                    idx={idx}
                  />
                </SwiperSlide>
              );
            })
          : ''}
      </Swiper>
      {currVideo && (
        <CommentContainer video={currVideo} isCommentOpen={isCommentOpen} setIsCommentOpen={setIsCommentOpen} />
      )}
    </div>
  );
}

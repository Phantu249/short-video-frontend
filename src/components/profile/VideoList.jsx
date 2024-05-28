import Video from './Video.jsx';
import { useContext } from 'react';
import { AppContext } from '../../App.jsx';

export default function VideoList(props) {
  const { isMobile } = useContext(AppContext);
  const handleDel = (id) => {
    const newVideos = props.videos.filter((video) => video.id !== id);
    props.setVideos(newVideos);
  };
  const handleScroll = (e) => {
    if (!isMobile) return;
    if (Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight) {
      console.log('loadmore');
      if (props.loadMore) props.loadMore();
    }
  };
  return (
    <div
      onScroll={handleScroll}
      className={`flex w-full flex-wrap flex-grow h-full  border-t-[1px]
                    ${isMobile ? 'overflow-y-auto' : 'border-[#444444]'}`}>
      {props.videos.length === 0 && <div className='text-center text-gray-400 w-full p-[5rem]'>No videos found</div>}
      {props.videos.map((video, idx) => {
        return <Video key={idx} video={video} board={props.board} handleDel={handleDel} />;
      })}
    </div>
  );
}

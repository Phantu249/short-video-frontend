import Video from './Video.jsx';
import { useContext } from 'react';
import { AppContext } from '../../App.jsx';

export default function VideoList(props) {
  const { isMobile } = useContext(AppContext);
  const handleDel = (id) => {
    const newVideos = props.videos.filter((video) => video.id !== id);
    props.setVideos(newVideos);
  };
  return (
    <div
      className={`flex w-full flex-wrap flex-grow h-full  border-t-[1px]
                    ${isMobile ? 'overflow-y-auto' : 'border-[#444444]'}`}>
      {props.videos.map((video, idx) => {
        return <Video key={idx} video={video} board={props.board} handleDel={handleDel} />;
      })}
    </div>
  );
}

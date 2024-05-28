import { useContext, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import VideoList from './VideoList.jsx';
import { useAsync } from 'react-use';
import instance from '../../instance.js';
import { AppContext } from '../../App.jsx';

export default function VideoBoard(props) {
  // const [board, setBoard] = useState('userVideo');
  // const [videos, setVideos] = useState([]);
  const { isMobile } = useContext(AppContext);
  const [deleteVideo, setDeleteVideo] = useState(false);

  useAsync(async () => {
    props.setVideos([]);
    try {
      const res = await instance.get(
        `videoprofile?user_id=${encodeURIComponent(props.user_id)}&type=${encodeURIComponent(props.board)}`,
      );
      if (res.status === 200) {
        props.setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [props.board]);
  return (
    <div className={` flex flex-col flex-grow w-full h-full ${isMobile ? 'overflow-y-hidden' : ''}`}>
      <div className={`flex gap-5 w-full h-4 my-2 ${isMobile ? 'justify-center' : 'px-5 items-center'}`}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            props.setBoard('userVideo');
          }}
          className={`flex justify-center cursor-pointer ${props.board === 'userVideo' ? (isMobile ? 'text-black border-b-2 border-black' : 'text-white border-b-2 border-black') : 'text-gray-600'} h-5`}>
          <FaRegUser />
        </div>
        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.setBoard('userVideo');
            }}>
            Video
          </button>
        )}

        <span
          className='
            h-4
            border-l-2
            border-gray-400
          '></span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.setBoard('likedVideo');
          }}
          className={`flex justify-center cursor-pointer ${props.board === 'likedVideo' ? (isMobile ? 'text-black border-b-2 border-black' : 'text-white border-b-2 border-black') : 'text-gray-600'} h-5`}>
          <FaRegHeart />
        </button>
        {!isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.setBoard('likedVideo');
            }}>
            Đã thích
          </button>
        )}
      </div>
      <VideoList loadMore={props.loadMore} videos={props.videos} setVideos={props.setVideos} board={props.board} />
    </div>
  );
}

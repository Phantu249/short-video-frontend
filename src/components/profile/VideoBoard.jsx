import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import VideoList from './VideoList.jsx';
import { useAsync } from 'react-use';
import instance from '../../instance.js';

export default function VideoBoard(props) {
  const [board, setBoard] = useState('userVideo');
  const [videos, setVideos] = useState([]);
  const [deleteVideo, setDeleteVideo] = useState(false);

  useAsync(async () => {
    try {
      const res = await instance.get(
        `videoprofile?user_id=${encodeURIComponent(props.user_id)}&type=${encodeURIComponent(board)}`,
      );
      if (res.status === 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [board]);
  return (
    <div
      className='
            flex
            flex-col
            flex-grow
            w-full
            h-full
            overflow-y-hidden
    '>
      <div className='flex justify-center gap-5 w-full h-4 my-2'>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setBoard('userVideo');
          }}
          className={`${board === 'userVideo' ? 'text-black border-b-2 border-black' : 'text-gray-400'} h-5`}>
          <FaRegUser />
        </div>
        <span
          className='
            h-4
            border-l-2
            border-gray-400
          '></span>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setBoard('likedVideo');
          }}
          className={`${board === 'likedVideo' ? 'text-black border-b-2 border-black' : 'text-gray-400'} h-5`}>
          <FaRegHeart />
        </div>
      </div>
      <VideoList videos={videos} setVideos={setVideos} board={board} />
    </div>
  );
}

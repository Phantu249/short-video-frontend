import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import VideoList from './VideoList.jsx';

export default function VideoBoard() {
  const [board, setBoard] = useState('likedVideo');

  const handleClick = () => {
    setBoard('likedVideo' === board ? 'userVideo' : 'likedVideo');
  };
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
          onClick={handleClick}
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
          onClick={handleClick}
          className={`${board === 'likedVideo' ? 'text-black border-b-2 border-black' : 'text-gray-400'} h-5`}>
          <FaRegHeart />
        </div>
      </div>
      <VideoList />
    </div>
  );
}

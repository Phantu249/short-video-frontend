import { useState } from 'react';
import { useAsync } from 'react-use';
import instance from '../../instance.js';
import { FaRegUser } from 'react-icons/fa6';
import VideoList from '../../components/profile/VideoList.jsx';

export default function VideoBoardNotOwner(props) {
  const [videos, setVideos] = useState([]);

  useAsync(async () => {
    try {
      const res = await instance.get(`videoprofile?user_id=${encodeURIComponent(props.user_id)}&type=userVideo`);
      if (res.status === 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        <div className='text-black border-b-2 border-black h-5'>
          <FaRegUser />
        </div>
      </div>
      <VideoList videos={videos} board={false} />
    </div>
  );
}

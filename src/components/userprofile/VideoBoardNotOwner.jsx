import { useContext } from 'react';
import { useAsync } from 'react-use';
import instance from '../../instance.js';
import { FaRegUser } from 'react-icons/fa6';
import VideoList from '../profile/VideoList.jsx';
import { AppContext } from '../../App.jsx';

export default function VideoBoardNotOwner(props) {
  // const [videos, setVideos] = useState([]);
  const { isMobile } = useContext(AppContext);

  useAsync(async () => {
    try {
      const res = await instance.get(`videoprofile?user_id=${encodeURIComponent(props.user_id)}&type=userVideo`);
      if (res.status === 200) {
        props.setVideos(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [props.user_id]);

  return (
    <div className={` flex flex-col flex-grow w-full h-full ${isMobile ? 'overflow-y-hidden' : ''}`}>
      <div
        className={`flex items-center gap-5 w-full h-4 my-2  ${isMobile ? 'justify-center text-black ' : 'text-white px-4'}`}>
        <div className={`border-b-2 border-black h-5`}>
          <FaRegUser />
        </div>
        {!isMobile && <div>Video</div>}
      </div>
      <VideoList loadMore={props.loadMore} videos={props.videos} board={false} />
    </div>
  );
}

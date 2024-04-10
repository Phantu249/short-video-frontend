import VideoBoard from '../../components/profile/VideoBoard.jsx';
import UserBoard from '../../components/profile/UserBoard.jsx';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import { instanceWToken } from '../../instance.js';
import { useAsync } from 'react-use';
import EditProfile from './EditProfile.jsx';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [videos, setVideos] = useState([]);
  const [follow, setFollow] = useState({});
  const [first_name, setFirst_name] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  useAsync(async () => {
    if (!isAuth) {
      return navigate('/login');
    }
    try {
      const res = await instanceWToken.get('profile');
      if (res.status === 200) {
        const { profile, videos, follower, following, username, first_name } = res.data;
        setUsername(username);
        setProfile(profile);
        setFollow({ follower, following });
        setVideos(videos);
        setFirst_name(first_name);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isEditOpen]);
  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            z-[1]
            h-full'>
      <UserBoard
        username={username}
        first_name={first_name}
        profile={profile}
        follow={follow}
        setIsEditOpen={setIsEditOpen}
      />
      <VideoBoard videos={videos} />
      <EditProfile
        username={username}
        first_name={first_name}
        profile={profile}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
    </div>
  );
}

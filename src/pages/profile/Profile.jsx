import VideoBoard from '../../components/profile/VideoBoard.jsx';
import UserBoard from '../../components/profile/UserBoard.jsx';
import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import { instanceWToken } from '../../instance.js';
import { useAsync } from 'react-use';
import EditProfile from './EditProfile.jsx';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { isAuth, setLoading } = useContext(AppContext);

  useAsync(async () => {
    if (!isAuth) {
      return navigate('/login');
    }
    setLoading(true);
    try {
      const res = await instanceWToken.get('profile');
      if (res.status === 200) {
        setLoading(false);

        const { user_id, profile, follower, following, username, first_name, last_name, like_count } = res.data;
        setUsername(username);
        setProfile(profile);
        setFollow({ follower, following });
        setLikeCount(like_count);
        setFirst_name(first_name);
        setLast_name(last_name);
        setUserId(user_id);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }
    setLoading(false);
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
        last_name={last_name}
        profile={profile}
        follow={follow}
        likeCount={likeCount}
        setIsEditOpen={setIsEditOpen}
        owner={true}
      />
      {userId && <VideoBoard user_id={userId} />}
      <EditProfile
        username={username}
        first_name={first_name}
        last_name={last_name}
        profile={profile}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
    </div>
  );
}

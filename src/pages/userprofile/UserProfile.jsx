import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useAsync } from 'react-use';
import instance from '../../instance.js';
import UserBoardNotOwner from './UserBoardNotOwner.jsx';
import VideoBoardNotOwner from './VideoBoardNotOwner.jsx';
import BackButton from '../../components/BackButton.jsx';

export default function UserProfile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);
  const id = useParams().pk;

  useAsync(async () => {
    try {
      const res = await instance.get(`user/${id}`);
      if (res.status === 200) {
        const { profile, follower, following, username, first_name, last_name, like_count } = res.data;
        setUsername(username);
        setProfile(profile);
        setFollow({ follower, following });
        setLikeCount(like_count);
        setFirst_name(first_name);
        setLast_name(last_name);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }
  }, []);
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
      <BackButton />
      <UserBoardNotOwner
        user_id={id}
        username={username}
        first_name={first_name}
        last_name={last_name}
        profile={profile}
        follow={follow}
        likeCount={likeCount}
      />
      <VideoBoardNotOwner user_id={id} />
    </div>
  );
}

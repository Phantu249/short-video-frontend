import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useAsync } from 'react-use';
import instance from '../../instance.js';
import UserBoardNotOwner from '../../components/userprofile/UserBoardNotOwner.jsx';
import VideoBoardNotOwner from '../../components/userprofile/VideoBoardNotOwner.jsx';
import BackButton from '../../components/BackButton.jsx';

export default function UserProfile() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState({});
  const [follow, setFollow] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const navigate = useNavigate();
  const { isAuth, userId, isMobile } = useContext(AppContext);
  const id = useParams().pk;

  useEffect(() => {
    if (id - '0' === userId) {
      return navigate('/profile');
    }
  }, []);

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
      className={`flex relative flex-grow flex-col z-[1]
                    ${isMobile ? 'w-full overflow-y-hidden' : 'overflow-y-auto bg-black text-white'}`}>
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

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
  const [videos, setVideos] = useState([]);
  const { isAuth, userId, isMobile } = useContext(AppContext);
  const id = useParams().pk;

  useEffect(() => {
    if (id - '0' === userId) {
      return navigate('/profile');
    }
  }, []);

  useAsync(async () => {
    setVideos([]);
    setProfile({});
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
  }, [id]);

  const loadMore = async () => {
    if (videos.length < 10) return;
    try {
      const res = await instance.get(
        `videoprofile?user_id=${encodeURIComponent(id)}&type=userVideo&total_length=${videos.length}&last_id=${videos[videos.length - 1].id}`,
      );
      if (res.status === 200) {
        setVideos([...videos, ...res.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = async (e) => {
    if (isMobile) return;
    if (Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight) {
      console.log('loadmore');
      await loadMore();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className={`flex relative flex-grow flex-col z-[1]
                    ${isMobile ? 'w-full overflow-y-hidden' : 'custom-scrollbar overflow-y-auto bg-black text-white'}`}>
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
      <VideoBoardNotOwner videos={videos} setVideos={setVideos} loadMore={loadMore} user_id={id} />
    </div>
  );
}

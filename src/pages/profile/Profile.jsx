import VideoBoard from '../../components/profile/VideoBoard.jsx';
import UserBoard from '../../components/profile/UserBoard.jsx';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../../components/profile/EditProfile.jsx';
import Follow from '../../components/profile/Follow.jsx';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ChangePassword from '../../components/profile/ChangePassword.jsx';
import instance from '../../instance.js';

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const navigate = useNavigate();
  const [followType, setFollowType] = useState('follower');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [board, setBoard] = useState('userVideo');
  const { isAuth, username, userId, profile, follow, likeCount, first_name, last_name, setReloadProfile, isMobile } =
    useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }
  }, [isAuth]);

  useEffect(() => {
    setReloadProfile(!isEditOpen);
  }, [isEditOpen]);

  const loadMore = async () => {
    if (videos.length < 10) return;
    try {
      const res = await instance.get(
        `videoprofile?user_id=${encodeURIComponent(userId)}&type=${encodeURIComponent(board)}&total_length=${videos.length}&last_id=${videos[videos.length - 1].id}`,
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
      className={`flex relative flex-grow flex-col z-[1] overflow-x-hidden
                    ${isMobile ? 'w-full overflow-y-hidden' : 'custom-scrollbar overflow-y-auto bg-black text-white'}
                    ${isEditOpen || isFollowOpen || isChangePasswordOpen ? 'overflow-y-hidden' : ''}`}>
      <UserBoard
        username={username}
        first_name={first_name}
        last_name={last_name}
        profile={profile}
        follow={follow}
        likeCount={likeCount}
        setIsEditOpen={setIsEditOpen}
        owner={true}
        setFollowType={setFollowType}
        setIsFollowOpen={setIsFollowOpen}
        setIsChangePasswordOpen={setIsChangePasswordOpen}
      />
      {userId && (
        <VideoBoard
          loadMore={loadMore}
          videos={videos}
          setVideos={setVideos}
          board={board}
          setBoard={setBoard}
          user_id={userId}
        />
      )}
      <EditProfile
        username={username}
        first_name={first_name}
        last_name={last_name}
        profile={profile}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
      <ConfirmDialog className='absolute z-[100]' />
      <Follow user_id={userId} isFollowOpen={isFollowOpen} setIsFollowOpen={setIsFollowOpen} followType={followType} />
      <ChangePassword isChangePasswordOpen={isChangePasswordOpen} setIsChangePasswordOpen={setIsChangePasswordOpen} />
    </div>
  );
}

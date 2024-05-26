import VideoBoard from '../../components/profile/VideoBoard.jsx';
import UserBoard from '../../components/profile/UserBoard.jsx';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../../components/profile/EditProfile.jsx';
import Follow from '../../components/profile/Follow.jsx';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ChangePassword from '../../components/profile/ChangePassword.jsx';

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFollowOpen, setIsFollowOpen] = useState(false);
  const navigate = useNavigate();
  const [followType, setFollowType] = useState('follower');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
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

  return (
    <div
      className={`flex relative flex-grow flex-col z-[1] 
                    ${isMobile ? 'w-full overflow-y-hidden' : 'overflow-y-auto bg-black text-white'}
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
      {userId && <VideoBoard user_id={userId} />}
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

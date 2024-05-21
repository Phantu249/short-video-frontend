import ProfileButton from './ProfileButton.jsx';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useContext } from 'react';
import { instanceWToken } from '../../instance.js';

export default function UserBoard(props) {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AppContext);
  const handleLogout = async () => {
    try {
      const response = await instanceWToken.post('logout', {
        refresh_token: localStorage.getItem('refresh_token'),
      });
      if (response.status === 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuth(false);
        console.log('Logout success');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditProfile = (e) => {
    e.stopPropagation();
    props.setIsEditOpen(true);
  };

  const handleFollowingClick = (e) => {
    e.stopPropagation();
    props.setFollowType('following');
    props.setIsFollowOpen(true);
  };

  const handleFollowerClick = (e) => {
    e.stopPropagation();
    props.setFollowType('follower');
    props.setIsFollowOpen(true);
  };
  return (
    <div
      className='
            flex
            flex-col
            w-full
            h-fit
            items-center
            border-b-2
            relative
        '>
      <div className='m-2 font-bold w-full text-center text-lg h-[32px]'>
        {props.first_name} {props.last_name}
      </div>
      <button className='absolute top-2 right-2' onClick={handleLogout}>
        <IoLogOutOutline className='size-7' />
      </button>
      <img
        src={props.profile.profile_pic}
        alt='avt'
        className='
            w-28
            h-28
            object-cover
            rounded-full
            border-4
            border-black
            my-2'
      />
      <div>@{props.username}</div>
      <div className='flex w-full justify-center items-center gap-2'>
        <div className='text-center w-20 font-semibold cursor-pointer' onClick={handleFollowingClick}>
          <div>{props.follow.following}</div>
          <div className='text-gray-400 font-normal'>Following</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20 font-semibold cursor-pointer' onClick={handleFollowerClick}>
          <div>{props.follow.follower}</div>
          <div className='text-gray-400 font-normal'>Follower</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20 font-semibold'>
          <div>{props.likeCount}</div>
          <div className='text-gray-400 font-normal'>Like</div>
        </div>
      </div>
      <div className='flex w-full justify-center m-2'>
        <ProfileButton onClick={handleEditProfile}>Sửa hồ sơ</ProfileButton>
      </div>
      <div className='text-center w-full h-fit max-h-12 mb-2 px-2 text-ellipsis overflow-x-hidden overflow-y-auto'>
        {props.profile.bio}
      </div>
    </div>
  );
}

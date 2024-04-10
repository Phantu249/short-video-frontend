import ProfileButton from './ProfileButton.jsx';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';
import { useContext } from 'react';
import instance from '../../instance.js';

export default function UserBoard(props) {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await instance.post('logout', {
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
      <div className='m-2 font-bold'>{props.first_name}</div>
      <button className='absolute top-2 right-2' onClick={handleLogout}>
        <IoLogOutOutline className='size-7' />
      </button>
      <img
        src={props.profile.profile_pic}
        alt='profile-avt'
        className='
            w-28
            h-28
            object-cover
            rounded-full
            border-4
            border-black
            my-2'
      />
      <div>{props.username}</div>
      <div className='flex w-full justify-center items-center gap-2'>
        <div className='text-center w-20'>
          <div>{props.follow.following}</div>
          <div className='text-gray-400'>Following</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20'>
          <div>{props.follow.follower}</div>
          <div className='text-gray-400'>Follower</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20'>
          <div>3</div>
          <div className='text-gray-400'>Like</div>
        </div>
      </div>
      <div className='flex w-full justify-center m-2'>
        <ProfileButton onClick={handleEditProfile}>Sửa hồ sơ</ProfileButton>
      </div>
      <div className='text-center w-full h-6 mb-2 px-2 overflow-y-auto'>{props.profile.bio}</div>
    </div>
  );
}

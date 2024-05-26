import ProfileButton from './ProfileButton.jsx';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useContext, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { CgMenuRightAlt } from 'react-icons/cg';
import { FaRegEdit } from 'react-icons/fa';

export default function UserBoard(props) {
  const navigate = useNavigate();
  const { setIsAuth, isMobile } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      className={` flex flex-col w-full h-fit items-center border-b-[1px] ${isMobile ? '' : 'border-[#444444]'} relative `}>
      {isMobile && (
        <>
          <div className='m-2 font-bold w-full text-center text-lg h-[32px]'>
            {props.first_name} {props.last_name}
          </div>

          <div className='absolute top-3 right-3 cursor-pointer' onClick={() => setIsMenuOpen((prev) => !prev)}>
            <CgMenuRightAlt className='size-7' />
            <div
              className={`absolute ${isMenuOpen ? 'm-active' : 'm-inactive'} bg-white w-32 flex flex-col gap-1 py-2 right-0 border-[1px] rounded-xl`}>
              <div onClick={() => props.setIsChangePasswordOpen(true)} className=' hover:bg-gray-200 px-2 '>
                Đổi mật khẩu
              </div>
              <div onClick={handleLogout} className=' hover:bg-gray-200 px-2 '>
                Đăng xuất
              </div>
            </div>
          </div>

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
        </>
      )}
      {!isMobile && (
        <>
          <div className='flex w-full px-8 pt-7 gap-5'>
            <img
              src={props.profile.profile_pic}
              alt='avt'
              className=' w-28 h-28 object-cover rounded-full border-4 border-[#444444] my-2'
            />
            <div className='flex flex-col justify-center gap-1'>
              <div className='font-semibold w-full text-center text-3xl h-[32px]'>
                {props.first_name} {props.last_name}
              </div>
              <div className='pl-1 text-sm mb-2'>@{props.username}</div>
              <ProfileButton
                className={'flex justify-center items-center gap-1 w-32 bg-[#333333]'}
                onClick={handleEditProfile}>
                <FaRegEdit size='18' />
                Sửa hồ sơ
              </ProfileButton>
            </div>
          </div>
          <div className='flex w-full px-6 py-2 gap-5'>
            <div className='flex gap-2 font-semibold cursor-pointer' onClick={handleFollowingClick}>
              <div>{props.follow.following}</div>
              <div className='text-gray-400 font-normal'>Following</div>
            </div>
            <div className='flex gap-2 font-semibold cursor-pointer' onClick={handleFollowerClick}>
              <div>{props.follow.follower}</div>
              <div className='text-gray-400 font-normal'>Follower</div>
            </div>
            <div className='flex gap-2 font-semibold cursor-pointer'>
              <div>{props.likeCount}</div>
              <div className='text-gray-400 font-normal'>Like</div>
            </div>
          </div>
          <div className='w-full h-fit max-h-12 px-6 mb-6 text-ellipsis overflow-x-hidden overflow-y-auto'>
            {props.profile.bio}
          </div>
        </>
      )}
    </div>
  );
}

import ProfileButton from '../../components/profile/ProfileButton.jsx';
import FollowButton from '../../components/search/FollowButton.jsx';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useContext } from 'react';

export default function UserBoardNotOwner(props) {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const handleMessageClick = (e) => {
    e.stopPropagation();
    if (!isAuth) {
      return navigate('/login');
    }
    navigate(`/chat/${props.user_id}`);
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
      <div>@{props.username}</div>
      <div className='flex w-full justify-center items-center gap-2'>
        <div className='text-center w-20 font-semibold'>
          <div>{props.follow.following}</div>
          <div className='text-gray-400 font-normal'>Following</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20 font-semibold'>
          <div>{props.follow.follower}</div>
          <div className='text-gray-400 font-normal'>Follower</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400'></span>
        <div className='text-center w-20 font-semibold'>
          <div>{props.likeCount}</div>
          <div className='text-gray-400 font-normal'>Like</div>
        </div>
      </div>
      <div className='flex w-full gap-2 justify-center items-center m-2'>
        <FollowButton userid={props.user_id} />
        <ProfileButton onClick={handleMessageClick}>Nhắn tin</ProfileButton>
      </div>
      <div className='text-center w-full h-6 mb-2 px-2 overflow-y-auto'>{props.profile.bio}</div>
    </div>
  );
}

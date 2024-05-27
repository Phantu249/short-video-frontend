import FollowButton from './FollowButton.jsx';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useContext } from 'react';

export default function UserResult(props) {
  const { isMobile } = useContext(AppContext);
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(`/user/${props.user.user_id}`);
  };
  return (
    <div
      onClick={handleUserClick}
      className={`
          flex
          flex-none
          w-full
          ${!isMobile ? 'max-w-[600px] bg-[#222222] rounded-lg' : 'w-full'}
          h-20
          place-content-between
          cursor-pointer
          p-2`}>
      <div className='flex flex-none justify-center items-center h-full w-[4.5rem]'>
        <img src={props.user.profile_pic} alt='avt' className='w-16 h-16 border-2 object-cover rounded-full' />
      </div>
      <div className='flex flex-col flex-grow overflow-hidden h-full min-w-36 pl-2  justify-center items-start'>
        <div className='font-semibold h-6 overflow-hidden'>{props.user.full_name}</div>
        <div className='text-gray-400 text-sm h-[18px]'> @{props.user.username}</div>
        <div className='text-gray-400 text-sm h-[18px]'> {props.user.follower} follower</div>
      </div>
      <div className='flex justify-center items-center flex-none z-[9] h-full w-28'>
        {props.user && <FollowButton userid={props.user.user_id} />}
      </div>
    </div>
  );
}

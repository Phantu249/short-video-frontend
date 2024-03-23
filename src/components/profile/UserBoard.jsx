import ProfileButton from './ProfileButton.jsx';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';

export default function UserBoard() {
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
      <div className='m-2 font-bold'>Hồ sơ</div>
      <Link to='/login' className='absolute top-2 right-2'>
        <IoLogOutOutline className='size-7' />
      </Link>
      <img
        src='/pic.png'
        alt='profile-avt'
        className='
            w-28
            h-28
            rounded-full
            border-4
            border-black
            bg-gray-500
            my-2'
      />
      <div>Tú Phan</div>
      <div className='flex w-full justify-center items-center gap-2'>
        <div className='text-center w-20'>
          <div>249</div>
          <div className='text-gray-400'>Following</div>
        </div>
        <span
          className='
            h-6
            border-l-2
            border-gray-400
          '></span>
        <div className='text-center w-20'>
          <div>0</div>
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
        <ProfileButton>Sửa hồ sơ</ProfileButton>
      </div>
    </div>
  );
}

import Button from './Button.jsx';
import { FaRegMessage, FaRegSquarePlus, FaRegUser } from 'react-icons/fa6';
import { HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import { useContext } from 'react';
import { AppContext } from '../App.jsx';
import { TbReload } from 'react-icons/tb';

const NavBar = (props) => {
  const { hasNotif, reloadHome } = useContext(AppContext);
  return (
    <div
      className='
            bg-black
            text-white
            w-full
            h-16
            z-[100]
            flex
            flex-none
            justify-between
            outline-none
            border-t
            border-gray-500
            '>
      <Button setPage={props.setPage} page={'home'} navigateTo={'/home'}>
        {reloadHome ? <TbReload className='size-6 animate-spin' /> : <HiOutlineHome className='size-6' />}
        Trang chủ
      </Button>
      <Button setPage={props.setPage} page={'search'} navigateTo={'/search'}>
        <HiOutlineSearch className='size-6' />
        Tìm kiếm
      </Button>
      <Button setPage={props.setPage} page={'create'} navigateTo={'/create'}>
        <FaRegSquarePlus className='size-7' />
      </Button>
      <Button setPage={props.setPage} page={'notification'} navigateTo={'/notification'}>
        <FaRegMessage className='size-5' />
        Tin nhắn
        <div
          className={`${hasNotif ? 'display' : 'hidden'} animate-ping absolute top-2 right-[40%] w-2 h-2 z-[200] rounded-full bg-red-500`}></div>
      </Button>
      <Button setPage={props.setPage} page={'profile'} navigateTo={'/profile'}>
        <FaRegUser className='size-5' />
        Hồ sơ
      </Button>
    </div>
  );
};
export default NavBar;

import { useContext } from 'react';
import { AppContext } from '../../App.jsx';
import { TbReload } from 'react-icons/tb';
import { HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import { FaRegMessage, FaRegSquarePlus, FaRegUser } from 'react-icons/fa6';
import ButtonDesktop from './ButtonDesktop.jsx';

export default function NavBarDesktop(props) {
  const { hasNotif, reloadHome, isHidden } = useContext(AppContext);
  return (
    <div
      className={`
          pt-5
          bg-[#111111]
          text-white
          ${!isHidden ? 'w-[220px]' : 'w-[50px]'}
          h-full
          z-[10]
          flex
          flex-col
          flex-none
          outline-none
          border-r
          border-[#222222]
          gap-2
          `}>
      <ButtonDesktop setPage={props.setPage} page={'home'} navigateTo={'/home'}>
        {reloadHome ? <TbReload className='size-6 animate-spin' /> : <HiOutlineHome className='size-6' />}
        {!isHidden && 'Trang chủ'}
      </ButtonDesktop>
      <ButtonDesktop setPage={props.setPage} page={'search'} navigateTo={'/search'}>
        <HiOutlineSearch className='size-6' />

        {!isHidden && 'Tìm kiếm'}
      </ButtonDesktop>
      <ButtonDesktop setPage={props.setPage} page={'create'} navigateTo={'/create'}>
        <FaRegSquarePlus className='size-6' />

        {!isHidden && 'Đăng tải video'}
      </ButtonDesktop>
      <ButtonDesktop setPage={props.setPage} page={'notification'} navigateTo={'/notification'}>
        <FaRegMessage className='size-5' />

        {!isHidden && 'Tin nhắn'}
        <div
          className={`${hasNotif ? 'display' : 'hidden'} animate-ping absolute top-2 right-[40%] w-2 h-2 z-[200] rounded-full bg-red-500`}></div>
      </ButtonDesktop>
      <ButtonDesktop setPage={props.setPage} page={'profile'} navigateTo={'/profile'}>
        <FaRegUser className='size-5' />
        {!isHidden && 'Hồ sơ'}
      </ButtonDesktop>
    </div>
  );
}

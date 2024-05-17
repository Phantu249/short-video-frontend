import Button from './Button.jsx';
import { FaRegMessage, FaRegSquarePlus, FaRegUser } from 'react-icons/fa6';
import { HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import { useContext } from 'react';
import { AppContext } from '../App.jsx';

const NavBar = (props) => {
  const { hasNotif } = useContext(AppContext);
  return (
    <div
      className='
            bg-black
            text-white
            w-full
            h-16
            z-[100]
            flex
            justify-between
            outline-none
            border-t
            border-gray-500
            '>
      <Button setPage={props.setPage} page={'home'} navigateTo={'/home'}>
        {/*<Link className={'customLink'} to='/home'>*/}
        <HiOutlineHome
          className='
                size-6
                '
        />
        Trang chủ
        {/*</Link>*/}
      </Button>
      <Button setPage={props.setPage} page={'search'} navigateTo={'/search'}>
        {/*<Link className={'customLink'} to='/search'>*/}
        <HiOutlineSearch
          className='
                size-6
                '
        />
        Tìm kiếm
        {/*</Link>*/}
      </Button>
      <Button setPage={props.setPage} page={'create'} navigateTo={'/create'}>
        {/*<Link className={'customLink'} to='/create'>*/}
        <FaRegSquarePlus
          className='
                size-7
                '
        />
        {/*</Link>*/}
      </Button>
      <Button setPage={props.setPage} page={'notification'} navigateTo={'/notification'}>
        {/*<Link className={'customLink'} to='/notification'>*/}
        <FaRegMessage
          className='
                size-5
                '
        />
        Tin nhắn
        <div
          className={`${hasNotif ? 'display' : 'hidden'} animate-ping absolute top-2 right-[40%] w-2 h-2 z-[200] rounded-full bg-red-500`}></div>
        {/*</Link>*/}
      </Button>
      <Button setPage={props.setPage} page={'profile'} navigateTo={'/profile'}>
        {/*<Link className={'customLink'} to='/profile'>*/}
        <FaRegUser
          className='
                size-5
                '
        />
        Hồ sơ
        {/*</Link>*/}
      </Button>
    </div>
  );
};
export default NavBar;

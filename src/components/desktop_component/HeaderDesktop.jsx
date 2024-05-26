import HeaderSearch from './HeaderSearch.jsx';
import HeaderMenu from './HeaderMenu.jsx';
import ChangePassword from '../profile/ChangePassword.jsx';
import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';

export default function HeaderDesktop() {
  const { isHidden } = useContext(AppContext);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  return (
    <div className=' bg-black text-white w-full h-16 z-[10] flex flex-none justify-between items-center outline-none border-b border-gray-800 px-3'>
      <div className='flex items-center gap-2'>
        <img className='w-10 h-10' src='/cat.png' alt='logo' />
        <div className='text-xl font-light'>Short Video</div>
      </div>
      {!isHidden && <HeaderSearch />}
      <HeaderMenu setChangePW={setIsChangePasswordOpen} />
      <ChangePassword isChangePasswordOpen={isChangePasswordOpen} setIsChangePasswordOpen={setIsChangePasswordOpen} />
    </div>
  );
}

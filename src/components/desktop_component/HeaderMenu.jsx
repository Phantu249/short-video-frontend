import { AppContext } from '../../App.jsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceWToken } from '../../instance.js';

export default function HeaderMenu(props) {
  const { profile, isAuth, first_name, setIsAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await instanceWToken.post('logout', {
        refresh_token: localStorage.getItem('refresh_token'),
      });
      if (response.status === 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuth(false);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.header-menu')) {
        return;
      }
      setIsHeaderMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='header-menu w-fit max-w-[30%] z-[11] h-full flex justify-center items-center'>
      {isAuth ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsHeaderMenuOpen(!isHeaderMenuOpen);
          }}
          className='relative flex items-center justify-center gap-2'>
          <div className='text-sm font-light'>Xin Chào {first_name}</div>
          <img
            className='w-10 h-10 object-cover rounded-full border-[2px] border-[#444444] cursor-pointer'
            src={profile.profile_pic}
            alt='avatar'
          />
          <div
            className={`absolute ${isHeaderMenuOpen ? 'm-active' : 'm-inactive'} bg-[#222222] text-white w-36
                        flex flex-col items-center justify-center gap-2 py-3 -bottom-36 -right-2 rounded-lg`}>
            <div className='absolute z-[9] -top-3 right-4 w-6 h-6 bg-[#222222]  origin-center rotate-45 '></div>
            <div className='w-fit h-fit z-[10]'>
              <div
                onClick={() => navigate('/profile')}
                className=' cursor-pointer rounded-xl hover:bg-[#444444] p-1 px-3 '>
                Hồ sơ
              </div>
              <div
                onClick={() => navigate('/change-password')}
                className=' cursor-pointer rounded-xl hover:bg-[#444444] p-1 px-3 '>
                Đổi mật khẩu
              </div>
              <div onClick={handleLogout} className='cursor-pointer rounded-xl hover:bg-[#444444] p-1 px-3 '>
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/login');
          }}
          className='p-2 rounded-lg bg-red-600 text-sm font-light'>
          Đăng nhập
        </button>
      )}
    </div>
  );
}

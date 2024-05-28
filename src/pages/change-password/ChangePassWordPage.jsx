import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, MessagesContext } from '../../App.jsx';
import { instanceWToken } from '../../instance.js';
import ProfileButton from '../../components/profile/ProfileButton.jsx';
import BackButton from '../../components/BackButton.jsx';

export default function ChangePassWordPage(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const globalMessage = useContext(MessagesContext);
  const { isMobile, isHidden } = useContext(AppContext);
  const oldpass = useRef(null);
  const pas1 = useRef(null);
  const pas2 = useRef(null);

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setReNewPassword('');
  }, []);

  const validatePassword = () => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*&.])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!oldPassword.trim() || !newPassword.trim() || !reNewPassword.trim()) {
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'Không được để trống thông tin',
          closable: true,
        },
      ]);
      return false;
    }
    if (newPassword !== reNewPassword) {
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'Password không khớp',
          closable: true,
        },
      ]);
      return false;
    }

    if (!re.test(newPassword)) {
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'Password phải có ít nhất 8 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt @$!%*&.',
          closable: true,
        },
      ]);
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) {
      return;
    }
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await instanceWToken.post('changepw', data);
      if (response.status === 200) {
        globalMessage.current.show([
          {
            severity: 'success',
            detail: 'Đổi mật khẩu thành công',
            closable: true,
          },
        ]);
        props.setIsChangePasswordOpen(false);
      }

      if (response.status === 222) {
        globalMessage.current.show([
          {
            severity: 'error',
            detail: 'Mật khẩu cũ không đúng',
            closable: true,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'Có lỗi xảy ra',
          closable: true,
        },
      ]);
    }
  };

  return (
    <div
      className={` flex flex-col w-full flex-grow z-[1] h-full overflow-hidden ${isMobile ? '' : 'bg-black text-white'}`}>
      <div
        className='
            flex
            flex-col
            w-full
            h-full
            items-center
        
            relative
        '>
        <div className='m-2 text-nm'>Đổi mật khẩu</div>
        <BackButton />
        <div className='flex w-full flex-col px-3 my-5 mt-10 items-center'>
          <form className={`flex ${isMobile ? 'w-full' : 'w-1/2 min-w-[400px]'} flex-col gap-2 mb-5`}>
            <div className='flex w-full flex-col '>
              <label htmlFor='firstname' className='px-2 font-semibold content-center'>
                Mật khẩu cũ
              </label>
              <input
                type='password'
                name='firstname'
                id='firstname'
                ref={oldpass}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete='off'
                required={true}
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
            <div className='flex w-full flex-col'>
              <label htmlFor='lastname' className='px-2 font-semibold content-center'>
                Mật khẩu mới
              </label>
              <input
                type='password'
                name='lastname'
                id='lastname'
                ref={pas1}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete='off'
                required={true}
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
            <div className='flex w-full flex-col'>
              <label htmlFor='username' className='px-2 font-semibold content-center'>
                Nhập lại mật khẩu mới
              </label>
              <input
                type='password'
                name='username'
                id='username'
                ref={pas2}
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
                autoComplete='off'
                required={true}
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
            <div className='flex place-content-end'>
              <input
                type='checkbox'
                id='show-password'
                onChange={(e) => {
                  oldpass.current.type = e.target.checked ? 'text' : 'password';
                  pas1.current.type = e.target.checked ? 'text' : 'password';
                  pas2.current.type = e.target.checked ? 'text' : 'password';
                }}
              />
              <label htmlFor='show-password' className='px-2 text-sm content-center'>
                Hiện mật khẩu
              </label>
            </div>
          </form>
          <ProfileButton className={`${isMobile ? '' : 'bg-[#333333]'}`} onClick={handleChangePassword}>
            Lưu
          </ProfileButton>
        </div>
      </div>
    </div>
  );
}

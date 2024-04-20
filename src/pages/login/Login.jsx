import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { useRef, useState } from 'react';
import instance from '../../instance.js';
import { Messages } from 'primereact/messages';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const msgs = useRef(null);
  const validateUsername = (username) => {
    const re = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
    if (!re.test(username)) {
      msgs.current.show([
        {
          severity: 'error',
          detail: 'Username dài 6-15 ký tự và chỉ gồm chữ và số',
          closable: true,
        },
      ]);
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*&.])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!re.test(password)) {
      msgs.current.show([
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

  const handleLoginClick = async () => {
    const validUsername = validateUsername(username);
    const validPassword = validatePassword(password);
    if (!validUsername || !validPassword) {
      return;
    }
    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await instance.post('login', user);
      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        console.log('Login success');

        navigate('/home');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        msgs.current.show([
          {
            severity: 'error',
            detail: 'Tài khoản hoặc mật khẩu không chính xác',
            closable: true,
          },
        ]);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='h-dvh w-screen flex flex-col items-center justify-center bg-white relative'>
      <Link to='/home' className='absolute top-5 left-5 '>
        <IoIosArrowBack className='size-6' />
      </Link>
      <Messages ref={msgs} className='message' />

      <h1 className='text-3xl font-extrabold m-2'>Login</h1>
      <form className='flex w-full flex-col h-fit max-w-96 p-5' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='username' className='px-2 font-bold'>
          Username
        </label>
        <div className='flex w-full relative items-center'>
          <FaRegUser className='absolute top-3 left-2 text-gray-400' />
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Type your Username'
            className='outline-none border-b-2 h-10 pr-2 pl-8 mb-5 w-full'
            required
          />
        </div>

        <label htmlFor='password' className='px-2 font-bold'>
          Password
        </label>
        <div className='flex w-full relative items-center'>
          <FiLock className='absolute top-3 left-2 text-gray-400' />
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Type your Password'
            className='outline-none border-b-2 h-10 pr-2 pl-8 mb-5 w-full'
            required
          />
        </div>

        <button
          onClick={handleLoginClick}
          className='bg-gray-500 h-10 rounded-full my-7 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold'>
          Login
        </button>
      </form>
      <div>
        Or{' '}
        <Link to='/register' className='font-bold'>
          Create a account
        </Link>
      </div>
    </div>
  );
}

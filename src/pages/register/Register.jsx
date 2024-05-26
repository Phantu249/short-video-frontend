import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import instance from '../../instance.js';
import { useEffect, useRef, useState } from 'react';
import { Messages } from 'primereact/messages';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();
  const msgs = useRef(null);
  const pas1 = useRef(null);
  const pas2 = useRef(null);

  useEffect(() => {
    if (!!localStorage.getItem('access_token')) {
      navigate('/home');
    }
  }, []);

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
    if (password !== rePassword) {
      msgs.current.show([
        {
          severity: 'error',
          detail: 'Password không khớp',
          closable: true,
        },
      ]);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    const validUsername = validateUsername(username);
    const validPassword = validatePassword(password);
    if (!validUsername || !validPassword) {
      return;
    }
    const userRegister = {
      username: username,
      password: password,
    };
    try {
      const response = await instance.post('register', userRegister);
      if (response.status === 201) {
        console.log('Register success');
        navigate('/login');
      } else {
        console.log('Register failed');
      }
    } catch (error) {
      msgs.current.show([
        {
          severity: 'error',
          detail: 'Tài khoản đã tồn tại',
          userRegister,
        },
      ]);
    }
  };

  return (
    <div className='h-dvh w-screen flex flex-col items-center justify-center bg-white relative'>
      <Link to='/home' className='absolute top-5 left-5 '>
        <IoIosArrowBack className='size-6' />
      </Link>
      <Messages ref={msgs} className='message' />
      <h1 className='text-3xl font-extrabold m-2'>Register</h1>
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
            autoComplete='off'
            placeholder='Type your Username'
            onChange={(e) => setUsername(e.target.value)}
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
            ref={pas1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Type your Password'
            className='outline-none border-b-2 h-10 pr-2 pl-8 mb-5 w-full'
            required
          />
        </div>
        <label htmlFor='repassword' className='px-2 font-bold'>
          Re-Password
        </label>
        <div className='flex w-full relative items-center'>
          <FiLock className='absolute top-3 left-2 text-gray-400' />
          <input
            type='password'
            name='repassword'
            id='repassword'
            ref={pas2}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            placeholder='Retype your Password'
            className='outline-none border-b-2 h-10 pr-2 pl-8 mb-2 w-full'
            required
          />
        </div>
        <div className='flex place-content-end'>
          <input
            type='checkbox'
            id='show-password'
            onChange={(e) => {
              pas1.current.type = e.target.checked ? 'text' : 'password';
              pas2.current.type = e.target.checked ? 'text' : 'password';
            }}
          />
          <label htmlFor='show-password' className='px-2 text-sm content-center'>
            Show password
          </label>
        </div>
        <button
          className='bg-gray-500 h-10 rounded-full my-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold'
          onClick={handleRegister}>
          Register
        </button>
      </form>
      <div>
        Or{' '}
        <Link to='/login' className='font-bold'>
          Sign in
        </Link>
      </div>
    </div>
  );
}

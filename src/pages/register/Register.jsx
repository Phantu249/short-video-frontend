import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

export default function Register() {
  return (
    <div className='h-dvh w-screen flex flex-col items-center justify-center bg-white relative'>
      <Link to='/home' className='absolute top-5 left-5 '>
        <IoIosArrowBack className='size-6' />
      </Link>

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
            placeholder='Retype your Password'
            className='outline-none border-b-2 h-10 pr-2 pl-8 w-full'
            required
          />
        </div>
        <button className='bg-gray-500 h-10 rounded-full my-7 bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold'>
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

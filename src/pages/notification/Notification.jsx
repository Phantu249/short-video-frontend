import Message from '../../components/notification/Message.jsx';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Notification() {
  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            justify-center
            z-[1]
            bg-white
            h-full
    '>
      <div
        className='
            w-full
            h-10
            flex
            justify-center
            items-center
            z-[10]
            flex-none
            '>
        Thông báo
        <HiOutlineSearch className='absolute right-2 top-2 size-6' />
      </div>
      <div
        className='
            flex
            flex-col
            flex-grow
            w-full
            overflow-y-auto
            gap-1
      '>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
}

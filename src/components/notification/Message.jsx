import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App.jsx';
import { useContext } from 'react';

export default function Message(props) {
  const navigate = useNavigate();
  const { userId } = useContext(AppContext);

  function formatTimeAgo(timestamp) {
    const time = new Date(timestamp);
    const now = new Date();
    const seconds = (now - time) / 1000;
    const intervals = [
      Math.floor(seconds / 31536000), // years
      Math.floor(seconds / 2592000), // months
      Math.floor(seconds / 86400), // days
      Math.floor(seconds / 3600), // hours
      Math.floor(seconds / 60), // minutes
    ];

    const labels = ['năm', 'tháng', 'ngày', 'giờ', 'phút'];

    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i] > 0) {
        return intervals[i] + ' ' + labels[i] + ' trước';
      }
    }

    return 'vừa xong';
  }

  const handleMsgClick = () => {
    navigate(`/chat/${props.data.user.id}`);
  };
  return (
    <div
      onClick={handleMsgClick}
      className='
            flex
            flex-none
            w-full
            h-20
            items-center
            bg-gray-100
            rounded-xl
    '>
      <img
        src={`${props.data.profile_pic}`}
        alt='avt-pic'
        className='
            flex
            flex-none
            w-14
            h-14
            object-cover
            rounded-full
            bg-gray-200
            border-2
            border-gray-300
            ml-2'
      />
      <div className='flex flex-col justify-center w-full gap-1 p-2'>
        <div
          className='
                flex
                h-7
                items-start
                overflow-hidden
                pt-1
                place-content-between'>
          <span className='font-bold text-start'>
            {props.data.user.first_name} {props.data.user.last_name}
          </span>
          <span className='text-sm text-right min-w-24'>{formatTimeAgo(props.data.timestamp)}</span>
        </div>
        {props.data.sender_id === userId ? (
          <div className='text-sm w-full h-10 overflow-hidden text-gray-500'>{props.data.msg}</div>
        ) : props.data.is_read ? (
          <div className='text-sm w-full h-10 overflow-hidden text-gray-500'>{props.data.msg}</div>
        ) : (
          <div className='text-sm w-full h-10 overflow-hidden text-black font-semibold '>{props.data.msg}</div>
        )}
      </div>
    </div>
  );
}

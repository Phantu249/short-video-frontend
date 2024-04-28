import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { instanceWToken } from '../../instance.js';
import { MessagesContext } from '../../App.jsx';
import { useContext } from 'react';

export default function Video(props) {
  const navigate = useNavigate();
  const globalMessage = useContext(MessagesContext);
  const handleVideoClick = (e) => {
    e.stopPropagation();
    navigate(`/video/${props.video.id}`);
  };

  const handleDelVideoClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await instanceWToken.delete(`video/${encodeURIComponent(props.video.id)}`);
      if (response.status === 200) {
        props.handleDel(props.video.id);
        globalMessage.current.show([
          {
            severity: 'success',
            detail: 'Delete success',
            closable: true,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className='
            relative
            w-1/3
            h-1/2
            min-h-52
            max-h-96
            p-[1px]
    '>
      {props.board === 'userVideo' && (
        <MdDeleteForever
          onClick={handleDelVideoClick}
          className='absolute bottom-1 right-1 z-[10] size-7 text-gray-500 '
        />
      )}
      <img
        className='
            w-full
            h-full
            object-cover
            bg-gray-500
      '
        src={props.video.thumbnail}
        alt='videoAlt'
        onClick={handleVideoClick}
      />
    </div>
  );
}

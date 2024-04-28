import { useNavigate } from 'react-router-dom';

export default function VideoResult(props) {
  const navigate = useNavigate();
  const handleVideoClick = (e) => {
    e.stopPropagation();
    navigate(`/video/${props.video.id}`);
  };
  return (
    <button
      className='
            flex
            flex-col
            flex-none
            w-1/2
            h-96
            p-2
            rounded'
      onClick={handleVideoClick}>
      <img
        src={props.video.thumbnail}
        alt='search_pic'
        className='
             w-full
             h-[88%]
             object-cover
             rounded
             bg-gray-300'
      />
      <div
        className='
            flex
            flex-grow
            flex-none
            w-full
            h-[6%]
            overflow-hidden
            text-sm
            text-start
            pl-1'>
        {props.video.description}
      </div>
      <div
        className='
            flex
            flex-grow
            flex-none
            w-full
            h-[6%]
            overflow-hidden
            font-bold
            pl-1'>
        {props.video.full_name}
      </div>
    </button>
  );
}

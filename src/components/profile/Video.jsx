import { useNavigate } from 'react-router-dom';

export default function Video(props) {
  const navigate = useNavigate();
  const handleVideoClick = (e) => {
    e.stopPropagation();
    navigate(`/video/${props.video.id}`);
  };
  return (
    <div
      className='
            w-1/3
            h-1/2
            min-h-52
            max-h-96
            p-[1px]
    '>
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

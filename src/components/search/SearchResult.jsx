import VideoResult from './VideoResult.jsx';
import UserResult from './UserResult.jsx';
import { AppContext } from '../../App.jsx';
import { useContext } from 'react';

export default function SearchResult(props) {
  const { isMobile, isHidden } = useContext(AppContext);
  return (
    <div
      className={`
        flex
        h-fit
        ${isMobile ? 'bg-white text-back flex-wrap' : props.field === 'user' ? 'bg-black text-white flex-col justify-center items-center gap-1' : 'bg-black text-white flex-wrap'}
        w-full
        overflow-y-auto
        rounded-xl`}>
      {props.results.map((result, index) =>
        props.field === 'video' ? <VideoResult key={index} video={result} /> : <UserResult key={index} user={result} />,
      )}
    </div>
  );
}

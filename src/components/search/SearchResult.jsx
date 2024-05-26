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
        flex-wrap
        w-full
        h-fit
        overflow-y-auto
        rounded-xl`}>
      {props.results.map((result, index) =>
        props.field === 'video' ? <VideoResult key={index} video={result} /> : <UserResult key={index} user={result} />,
      )}
    </div>
  );
}

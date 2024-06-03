import VideoResult from './VideoResult.jsx';
import UserResult from './UserResult.jsx';
import { AppContext } from '../../App.jsx';
import { useContext, useRef } from 'react';

export default function SearchResult(props) {
  const { isMobile, isHidden } = useContext(AppContext);
  const searchResultRef = useRef();

  const handleScroll = (e) => {
    if (Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight) {
      console.log('loadmore');
      if (props.loadMore) props.loadMore();
    }
  };

  return (
    <div
      ref={searchResultRef}
      onScroll={handleScroll}
      className={`
        flex
        
        ${isMobile ? 'bg-white text-back flex-wrap' : props.field === 'user' ? 'bg-black text-white flex-col items-center gap-1' : 'bg-black text-white flex-wrap'}
        w-full
        overflow-y-auto
        rounded-xl`}>
      {props.results.map((result, index) =>
        props.field === 'video' ? <VideoResult key={index} video={result} /> : <UserResult key={index} user={result} />,
      )}
    </div>
  );
}

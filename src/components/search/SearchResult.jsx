import VideoResult from './VideoResult.jsx';
import UserResult from './UserResult.jsx';

export default function SearchResult(props) {
  return (
    <div
      className='
        flex
        flex-wrap
        w-full
        h-fit
        overflow-y-auto
        bg-gray-100
        rounded-xl'>
      {props.results.map((result, index) =>
        props.field === 'video' ? <VideoResult key={index} video={result} /> : <UserResult key={index} user={result} />,
      )}
    </div>
  );
}

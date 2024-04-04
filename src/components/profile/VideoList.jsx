import Video from './Video.jsx';

export default function VideoList(props) {
  return (
    <div
      className='
            flex
            w-full
            flex-wrap
            flex-grow
            h-full
            overflow-y-auto
            border-t-2
        '>
      {props.videos.map((video, idx) => {
        return <Video key={idx} video={video} />;
      })}
    </div>
  );
}

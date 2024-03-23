import Video from './Video.jsx';

export default function VideoList() {
  return (
    <div
      className='
            flex
            w-full
            flex-wrap
            flex-grow
            h-full
            overflow-y-auto
        '>
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  );
}

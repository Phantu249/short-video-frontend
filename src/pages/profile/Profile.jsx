import VideoBoard from '../../components/profile/VideoBoard.jsx';
import UserBoard from '../../components/profile/UserBoard.jsx';

export default function Profile() {
  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            z-[1]
            h-full'>
      <UserBoard />
      <VideoBoard />
    </div>
  );
}

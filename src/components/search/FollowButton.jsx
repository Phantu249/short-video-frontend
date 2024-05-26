import { useContext, useState } from 'react';
import { useAsync } from 'react-use';
import { AppContext, MessagesContext } from '../../App.jsx';
import { instanceWToken } from '../../instance.js';

export default function FollowButton(props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { isAuth, isMobile } = useContext(AppContext);
  const globalMessage = useContext(MessagesContext);

  useAsync(async () => {
    if (!isAuth) return;
    if (!props.userid) return;
    const data = {
      followed_user_id: props.userid,
    };
    try {
      const res = await instanceWToken.get(`follow?followed_user_id=${encodeURIComponent(props.userid)}`);
      if (res.status === 200) {
        setIsFollowing(res.data.followed);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
  }, []);
  const handleFollowClick = async (e) => {
    e.stopPropagation();
    if (!isAuth) {
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'You need to Login',
          closable: true,
        },
      ]);
      return;
    }
    const data = {
      followed_user_id: props.userid,
    };
    try {
      const res = await instanceWToken.post('follow', data);
      if (res.status === 200) {
        setIsFollowing((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button
      className={`flex
            justify-center
            items-center
            w-24
            h-9
            ${isMobile ? (isFollowing ? 'bg-gray-200 text-black text-sm' : 'bg-red-500 text-white') : isFollowing ? 'text-sm header-search bg-[#333333]' : 'bg-red-500 text-white'}
            rounded-md
            p-1
            z-[10]
            font-semibold`}
      onClick={handleFollowClick}>
      {isFollowing ? 'Đang follow' : 'Follow'}
    </button>
  );
}

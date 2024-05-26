import { FaComment, FaHeart, FaShare } from 'react-icons/fa6';
import ActionButton from './ActionButton.jsx';
import instance, { instanceWToken } from '../../instance.js';
import { useContext, useState } from 'react';
import { AppContext, MessagesContext } from '../../App.jsx';
import { useAsync } from 'react-use';
import { useNavigate } from 'react-router-dom';

export default function ActionButtonContainer(props) {
  const { isAuth } = useContext(AppContext);
  const globalMessage = useContext(MessagesContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();
  useAsync(async () => {
    if (!props.video) return;
    setCommentCount(props.video.comment_count);
    try {
      const response = isAuth
        ? await instanceWToken.get(`like/${props.video.id}`)
        : await instance.get(`like/${props.video.id}`);
      if (response.status === 200) {
        setIsLiked(response.data.liked);
        setLikeCount(response.data.like_count);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
  }, [props.video]);

  const handleClickAvt = (e) => {
    e.stopPropagation();
    navigate(`/user/${props.video.user}`);
  };

  const handleClickHeart = async (e) => {
    e.stopPropagation();
    if (!isAuth) {
      globalMessage.current.show([
        {
          severity: 'error',
          detail: 'You need to login',
          closable: true,
        },
      ]);
      return;
    }

    const data = {
      video_id: props.video.id,
    };
    try {
      const response = await instanceWToken.post(`like`, data);
      if (response.status === 200) {
        isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
  };

  const handleClickCmt = (e) => {
    e.stopPropagation();
    props.setIsCommentOpen(true);
  };

  const handleClickShare = (e) => {
    e.stopPropagation();
    // only use navigator.clipboard.writeText in https or localhost
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(window.location.origin + '/video/' + props.video.id)
      .then(() => {
        console.log('Link copied to clipboard');
        globalMessage.current.show([
          {
            severity: 'success',
            detail: 'Link copied to clipboard',
            closable: true,
          },
        ]);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };
  return (
    <div
      className='
            absolute
            text-white
            bottom-0
            right-0
            h-3/5
            min-h-72
            w-1/4
            z-[3]
            p-3
            flex
            flex-col
            justify-between
            items-center
        '>
      <ActionButton handleClick={handleClickAvt}>
        <div className='w-10 h-10 rounded-full border-2 overflow-hidden'>
          {props.video && (
            <img src={props.video.profile_pic} alt='avt' className='object-cover rounded-full w-10 h-10 pb-1' />
          )}
        </div>
      </ActionButton>
      <ActionButton handleClick={handleClickHeart}>
        {isLiked ? <FaHeart className={`size-7 text-red-500`} /> : <FaHeart className={`size-7`} />}
        {likeCount}
      </ActionButton>
      <ActionButton id='commentBtn' handleClick={handleClickCmt}>
        <FaComment className='size-7' />
        {commentCount}
      </ActionButton>
      <ActionButton handleClick={handleClickShare}>
        <FaShare
          className='
                    size-7
                '
        />
      </ActionButton>
    </div>
  );
}

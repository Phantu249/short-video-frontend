import { FaComment, FaHeart, FaShare } from 'react-icons/fa6';
import { RxAvatar } from 'react-icons/rx';
import ActionButton from './ActionButton.jsx';
import instance, { instanceWToken } from '../../instance.js';
import { useContext, useState } from 'react';
import { AuthContext, MessagesContext } from '../../App.jsx';
import { useAsync } from 'react-use';

export default function ActionButtonContainer(props) {
  const { isAuth } = useContext(AuthContext);
  const globalMessage = useContext(MessagesContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

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
    }
  }, [props.video]);

  const handleClickAvt = (e) => {
    e.stopPropagation();
    console.log('Avt');
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
    }
  };

  const handleClickCmt = (e) => {
    e.stopPropagation();
    props.setIsCommentOpen(true);
    console.log('Cmt');
  };

  const handleClickShare = (e) => {
    e.stopPropagation();
    console.log('Share');
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
        <RxAvatar
          className='
                    size-10
                '
        />
        +
      </ActionButton>
      <ActionButton handleClick={handleClickHeart}>
        {isLiked ? <FaHeart className={`size-7 text-red-500`} /> : <FaHeart className={`size-7`} />}
        {likeCount}
      </ActionButton>
      <ActionButton id='commentBtn' handleClick={handleClickCmt}>
        <FaComment
          className='
                    size-7
                '
        />
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

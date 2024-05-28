import { Transition } from '@headlessui/react';
import CmtInput from './CmtInput.jsx';
import { FaXmark } from 'react-icons/fa6';
import Comment from './Comment.jsx';
import { useContext, useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import instance, { WS_URL } from '../../instance.js';
import { AppContext } from '../../App.jsx';
import useWebSocket from 'react-use-websocket';

export default function CommentContainer(props) {
  const { isMobile, isHidden, isAuth } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [cmtWsURL, setCmtWsURL] = useState(null);

  useAsync(async () => {
    setComments([]);
    if (!props.isCommentOpen) {
      setCmtWsURL(null);
      return;
    }
    try {
      if (isAuth) setCmtWsURL(`${WS_URL}comment/${props.video.id}?token=${localStorage.getItem('access_token')}`);
      const response = await instance.get(`/comment/${props.video.id}`);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.isCommentOpen, props.video]);

  const loadMore = async () => {
    if (comments.length < 10) return;
    try {
      const response = await instance.get(`/comment/${props.video.id}?total=${comments.length}`);
      if (response.status === 200) {
        console.log(response.data);
        setComments((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(cmtWsURL, {
    shouldReconnect: (closeEvent) => {
      return isAuth;
    },
    retryOnError: true,
  });

  useEffect(() => {
    console.log('cmt Ws is ready:', readyState);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setComments((prev) => [lastJsonMessage, ...prev]);
    }
  }, [lastJsonMessage]);

  const handleCommentContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleScroll = async (e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      console.log('loadmore');
      await loadMore();
    }
  };

  return (
    <Transition
      show={props.isCommentOpen}
      enter='transition-transform ease-out duration-300'
      enterFrom={`transform ${isHidden ? 'translate-y-full' : 'translate-x-full'}`}
      enterTo={`transform ${isHidden ? 'translate-y-0' : 'translate-x-0'}`}
      leave='transition-transform ease-in duration-200'
      leaveFrom={`transform ${isHidden ? 'translate-y-0' : 'translate-x-0'}`}
      leaveTo={`transform ${isHidden ? 'translate-y-full' : 'translate-x-full'}`}
      className={`${isMobile ? '' : 'custom-scrollbar'} flex flex-col z-[11] flex-none bg-white bottom-0 rounded-t-xl ${isHidden ? 'absolute w-full h-2/3' : 'relative w-[350px] h-full'}`}
      onClick={handleCommentContainerClick}>
      <div className='flex justify-center m-1 p-1 z-[4]'>Comment</div>
      <div
        className={`
            absolute
            right-3
            top-3
            z-[4]
            ${isHidden ? '' : 'hidden'}
            cursor-pointer
            scale-125`}
        onClick={() => props.setIsCommentOpen(false)}>
        <FaXmark />
      </div>
      <div
        onScroll={handleScroll}
        className='
                    flex
                    relative
                    flex-col
                    flex-grow
                    w-full
                    overflow-y-auto
                    z-[11]
                    h-full'>
        {comments?.map((cmt, index) => (
          <Comment key={index} cmt={cmt.comment_text} user={cmt.fullname} />
        ))}
      </div>
      <CmtInput sendCmt={sendJsonMessage} video={props.video} setComments={setComments} />
    </Transition>
  );
}

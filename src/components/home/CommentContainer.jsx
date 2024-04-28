import { Transition } from '@headlessui/react';
import CmtInput from './CmtInput.jsx';
import { FaXmark } from 'react-icons/fa6';
import Comment from './Comment.jsx';
import { useState } from 'react';
import { useAsync } from 'react-use';
import instance from '../../instance.js';

export default function CommentContainer(props) {
  const [comments, setComments] = useState([]);

  useAsync(async () => {
    if (!props.isCommentOpen) return;
    try {
      const response = await instance.get(`/comment/${props.video.id}`);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.isCommentOpen, props.video]);

  const handleCommentContainerClick = (e) => {
    e.stopPropagation();
  };
  return (
    <Transition
      show={props.isCommentOpen}
      enter='transition-transform ease-out duration-300'
      enterFrom='transform translate-y-full'
      enterTo='transform translate-y-0'
      leave='transition-transform ease-in duration-200'
      leaveFrom='transform translate-y-0'
      leaveTo='transform translate-y-full'
      className='
                flex
                flex-col
                absolute
                w-full
                h-2/3
                z-[4]
                bg-white
                bottom-0
                rounded-t-xl
            '
      onClick={handleCommentContainerClick}>
      <div className='flex justify-center m-1 p-1'>Comment</div>
      <div
        className='
                    absolute
                    right-3
                    top-3
                    scale-125'
        onClick={() => props.setIsCommentOpen(false)}>
        <FaXmark />
      </div>
      <div
        className='
                    flex
                    relative
                    flex-col
                    flex-grow
                    w-full
                    overflow-y-auto
                    z-[4]
                    h-full
            '>
        {comments?.map((cmt, index) => (
          <Comment key={index} cmt={cmt.comment_text} user={cmt.fullname} />
        ))}
      </div>
      <CmtInput video={props.video} setComments={setComments} />
    </Transition>
  );
}

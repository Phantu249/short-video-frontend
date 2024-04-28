import { CiPaperplane } from 'react-icons/ci';
import { useState } from 'react';
import { instanceWToken } from '../../instance.js';

export default function CmtInput(props) {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (commentContent === '' || !commentContent.trim()) return;
    const data = {
      comment_text: commentContent,
      video_id: props.video.id,
    };
    try {
      const response = await instanceWToken.post('/comment', data);
      if (response.status === 201) {
        props.setComments((prev) => [
          {
            comment_text: commentContent,
            fullname: 'Tôi',
          },
          ...prev,
        ]);
        setCommentContent('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className='
                flex
                w-full
                h-20
                justify-center
                items-center
        '>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='
                            h-full
                            w-full
                            flex
                            justify-center
                            items-center
                            px-3
                        '>
        <input
          className='
                            w-[85%]
                            h-[60%]
                            rounded-3xl
                            bg-gray-200
                            p-3
                            outline-0
                        '
          autoComplete='off'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          type='text'
          id='cmt-input'
          placeholder='Comment...'
        />
        <button onClick={handleCommentSubmit} className='flex flex-grow h-full justify-center items-center z-10'>
          <CiPaperplane className='size-8 ml-2 active:scale-125 duration-150 ease-in-out' />
        </button>
      </form>
    </div>
  );
}
// shadow-[0_2px_5px_1px_rgba(0,0,0,0.3)]
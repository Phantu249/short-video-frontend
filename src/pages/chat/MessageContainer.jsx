import Message from './Message.jsx';
import { useEffect, useRef, useState } from 'react';

export default function MessageContainer(props) {
  const chatBoxRef = useRef();
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    if (scrollHeight !== 0) {
      chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight - scrollHeight;
      setScrollHeight(0);
    } else chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
  }, [props.messages]);

  return (
    <div
      onScroll={(e) => {
        if (e.target.scrollTop === 0) {
          setScrollHeight(chatBoxRef.current?.scrollHeight);
          props.fetchMore();
        }
      }}
      ref={chatBoxRef}
      className='
            flex
            flex-col
            flex-grow
            w-full
            gap-3
            p-2
            overflow-y-auto'>
      <div className='w-full min-h-3 flex justify-center items-center text-gray-600 text-sm'>
        {props.isFetching ? 'Loading...' : ''}
      </div>
      {props.messages.map((msg, index) => (
        <Message
          key={msg.message + index}
          isUser={msg.sender === props.user}
          msg={msg.message}
          profile={props.profile}
          name={props.name}
        />
      ))}
    </div>
  );
}

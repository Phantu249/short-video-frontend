import Message from './Message.jsx';
import { useEffect, useRef } from 'react';

export default function MessageContainer(props) {
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [props.messages]);

  return (
    <div
      ref={chatBoxRef}
      className='
            flex
            flex-col
            flex-grow
            w-full
            gap-3
            p-2
            overflow-y-auto'>
      {props.messages.map((msg, index) => (
        <Message
          key={index}
          isUser={msg.sender === props.user}
          msg={msg.message}
          profile={props.profile}
          name={props.name}
        />
      ))}
    </div>
  );
}

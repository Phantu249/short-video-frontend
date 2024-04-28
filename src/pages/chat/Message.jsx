import { useState } from 'react';
import ReceiverMsg from './ReceiverMsg.jsx';
import UserMsg from './UserMsg.jsx';

export default function Message(props) {
  const [isUser, setIsUser] = useState(props.isUser);
  return (
    <div
      className='
          w-full
          h-fit
          '>
      {isUser ? <UserMsg msg={props.msg} /> : <ReceiverMsg msg={props.msg} profile={props.profile} name={props.name} />}
    </div>
  );
}

import BackButton from '../../components/BackButton.jsx';
import { CiPaperplane } from 'react-icons/ci';
import { useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import instance, { instanceWToken, WS_URL } from '../../instance.js';
import MessageContainer from './MessageContainer.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { AppContext } from '../../App.jsx';

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [ReceiverLastName, setReceiverLastName] = useState('');
  const [ReceiverProfile, setReceiverProfile] = useState();
  const [ReceiverFirstname, setReceiverFirstname] = useState('');
  const { userId } = useContext(AppContext);
  const receiverId = useParams().pk;

  useAsync(async () => {
    try {
      const res = await instance.get(`user/${receiverId}`);
      if (res.status === 200) {
        const { profile, first_name, last_name } = res.data;
        setReceiverFirstname(first_name);
        setReceiverProfile(profile);
        setReceiverLastName(last_name);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }

    try {
      const res = await instanceWToken.get(`message?receiver_id=${encodeURIComponent(receiverId)}`);
      if (res.status === 200) {
        setMessages(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }
  }, []);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${WS_URL}chat/${userId}/${receiverId}`, {
    retryOnError: true,
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    console.log('ready', readyState);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages((prev) => [...prev, lastJsonMessage]);
    }
  }, [lastJsonMessage]);
  const handleSendMessage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (messageContent === '' || !messageContent.trim()) return;
    const data = {
      message: messageContent,
    };
    sendJsonMessage(data);
    setMessageContent('');
  };
  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            bg-white
            z-[1]
            h-full'>
      <div
        className='
            w-full
            h-12
            flex
            items-center
            z-[10]
            flex-none
            border-b-2
            font-semibold

            pl-12
            '>
        {ReceiverFirstname} {ReceiverLastName}
        <BackButton />
      </div>
      <MessageContainer messages={messages} user={userId} profile={ReceiverProfile} name={ReceiverFirstname} />
      <div
        className='
            flex
            flex-none
            w-full
            h-14
            border-t-2'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='
            h-full
            w-full
            flex
            justify-center
            items-center
            px-3'>
          <input
            className='
                w-[85%]
                h-[60%]
                rounded-3xl
                bg-gray-200
                p-3
                outline-0'
            autoComplete='off'
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            type='text'
            id='message-input'
            placeholder='Message...'
          />
          <button onClick={handleSendMessage} className='flex flex-grow h-full justify-center items-center z-10'>
            <CiPaperplane className='size-8 ml-2 active:scale-125 duration-150 ease-in-out' />
          </button>
        </form>
      </div>
    </div>
  );
}
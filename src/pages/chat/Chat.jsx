import BackButton from '../../components/BackButton.jsx';
import { CiPaperplane } from 'react-icons/ci';
import { useContext, useEffect, useState } from 'react';
import instance, { instanceWToken, WS_URL } from '../../instance.js';
import MessageContainer from './MessageContainer.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { AppContext } from '../../App.jsx';
import useWebSocket from 'react-use-websocket';

export default function Chat(props) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [ReceiverLastName, setReceiverLastName] = useState('');
  const [ReceiverProfile, setReceiverProfile] = useState();
  const [ReceiverFirstname, setReceiverFirstname] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const [socketURL, setSocketURL] = useState(null);
  const { userId, isHidden, isMobile } = useContext(AppContext);
  const [receiverId, setReceiverId] = useState(useParams().pk);

  useEffect(() => {
    if (props.chooseId) setReceiverId(props.chooseId);
  }, [isHidden, props.chooseId]);

  useAsync(async () => {
    if (!receiverId) return;
    setIsFetching(true);

    if (userId) setSocketURL(`${WS_URL}chat/${userId}/${receiverId}?token=${localStorage.getItem('access_token')}`);

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
      const res = await instanceWToken.get(`messages?receiver_id=${encodeURIComponent(receiverId)}`);
      if (res.status === 200) {
        setMessages(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }
    setIsFetching(false);
  }, [userId, receiverId]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketURL, {
    retryOnError: true,
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    console.log('chat ws status:', readyState);
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.sender === receiverId) {
        sendJsonMessage({
          action: 'get_messages',
          sender_id: receiverId,
          receiver_id: userId,
        });
      }
      setMessages((prev) => [...prev, lastJsonMessage]);
    }
  }, [lastJsonMessage]);
  const handleSendMessage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!receiverId) return;
    if (messageContent === '' || messageContent.trim() === '') return;
    const data = {
      action: 'send_message',
      message: messageContent,
    };
    sendJsonMessage(data);
    setMessageContent('');
    if (!isHidden) props.setReloadMs(true);
  };

  const handleUserClick = () => {
    if (!receiverId) return;
    navigate(`/user/${receiverId}`);
  };

  const fetchMore = async () => {
    setIsFetching(true);
    try {
      const res = await instanceWToken.get(
        `messages?receiver_id=${encodeURIComponent(receiverId)}&length=${messages.length}`,
      );
      if (res.status === 200) {
        if (res.data.length > 0) {
          setMessages([...res.data, ...messages]);
        }
        setIsFetching(false);
      }
    } catch (err) {
      setIsFetching(false);
      console.log(err);
      if (err.response.status === 401) {
        return navigate('/login');
      }
    }
  };

  return (
    <div
      className={` flex relative w-full flex-grow flex-col overflow-y-hidden  ${isMobile ? 'bg-white' : 'bg-black text-white'}  z-[1] h-full`}>
      <div
        onClick={handleUserClick}
        className={`
          w-full
          h-12
          flex
          items-center
          z-[10]
          flex-none
          border-b-[1px]
          ${isMobile ? '' : 'border-[#333333]'}
          font-semibold
          pl-12
          cursor-pointer
          `}>
        {ReceiverFirstname} {ReceiverLastName}
        {isHidden && <BackButton />}
      </div>
      <MessageContainer
        isFetching={isFetching}
        fetchMore={fetchMore}
        setMsg={setMessages}
        messages={messages}
        user={userId}
        profile={ReceiverProfile}
        name={ReceiverFirstname}
      />
      <div
        className={`
          flex
          flex-none
          w-full
          h-14
          border-t-[1px]
          ${isMobile ? '' : 'border-[#333333]'}
          `}>
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
            className={`
              w-[85%]
              h-[60%]
              rounded-3xl
              
              p-3
              ${isMobile ? 'bg-gray-200' : 'bg-[#333333]'}
              outline-0`}
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

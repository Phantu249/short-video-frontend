import Message from '../../components/notification/Message.jsx';
import { HiOutlineSearch } from 'react-icons/hi';
import { useAsync } from 'react-use';
import { instanceWToken } from '../../instance.js';
import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import ChatSearch from '../../components/notification/ChatSearch.jsx';

export default function Notification() {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const { hasNotif, setHasNotif, isHidden, isMobile } = useContext(AppContext);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);

  useAsync(async () => {
    if (hasNotif) {
      if (!isAuth) {
        return navigate('/login');
      }
      try {
        const res = await instanceWToken.get(`notification`);
        if (res.status === 200) {
          console.log(res.data);
          setDatas(res.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        }
      }
      setHasNotif(false);
    }
  }, [hasNotif]);

  useAsync(async () => {
    if (!isAuth) {
      return navigate('/login');
    }
    try {
      const res = await instanceWToken.get(`notification`);
      if (res.status === 200) {
        console.log(res.data);
        setDatas(res.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
      console.log(error);
    }
  }, []);

  return (
    <div
      className={` flex relative w-full flex-grow flex-col overflow-y-hidden justify-center z-[1] h-full 
                  ${isMobile ? 'bg-white' : 'bg-black text-white'} `}>
      <div
        className='
            w-full
            h-10
            flex
            justify-center
            items-center
            z-[10]
            flex-none
            '>
        Tin nhắn
        {isHidden && (
          <HiOutlineSearch
            className='absolute right-2 top-2 size-6 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setIsChatSearchOpen(true);
            }}
          />
        )}
      </div>
      <ChatSearch isChatSearchOpen={isChatSearchOpen} setIsChatSearchOpen={setIsChatSearchOpen} />
      <div
        className='
            flex
            flex-col
            flex-grow
            w-full
            overflow-y-auto
            gap-1
      '>
        {datas ? datas.map((data, idx) => <Message data={data} key={idx} />) : ''}
      </div>
    </div>
  );
}

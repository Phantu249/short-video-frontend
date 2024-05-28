import Message from '../../components/notification/Message.jsx';
import { HiOutlineSearch } from 'react-icons/hi';
import { useAsync } from 'react-use';
import { instanceWToken } from '../../instance.js';
import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import ChatSearch from '../../components/notification/ChatSearch.jsx';
import Chat from '../chat/Chat.jsx';

export default function Notification() {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const { hasNotif, setHasNotif, isHidden, isMobile, setLoading, loading } = useContext(AppContext);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const [chooseId, setChooseId] = useState(null);
  const [reloadMs, setReloadMs] = useState(false);

  useAsync(async () => {
    if (hasNotif || reloadMs) {
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
      setReloadMs(false);
    }
  }, [hasNotif, reloadMs]);

  useAsync(async () => {
    if (!isAuth) {
      return navigate('/login');
    }
    setLoading(true);
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
    setLoading(false);
  }, []);

  return (
    <div
      className={` flex relative w-full flex-grow flex-col overflow-y-hidden justify-center z-[1] h-full 
                  ${isMobile ? 'bg-white' : 'custom-scrollbar bg-black text-white'} `}>
      {isHidden && (
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
          <HiOutlineSearch
            className='absolute right-2 top-2 size-6 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setIsChatSearchOpen(true);
            }}
          />
        </div>
      )}
      <ChatSearch isChatSearchOpen={isChatSearchOpen} setIsChatSearchOpen={setIsChatSearchOpen} />
      <div className='flex flex-grow w-full h-full overflow-hidden '>
        <div
          className={` flex flex-col flex-grow overflow-y-auto gap-1 ${isHidden ? ' w-full' : 'flex-none w-[350px] border-[#333333] border-r-[1px]'}`}>
          {datas.length === 0 && (
            <div
              className={` flex flex-grow justify-center items-center text-center text-gray-400 text-sm p-5 pb-[10rem]`}>
              {loading ? 'Loading...' : 'Bạn chưa nhắn tin với ai cả, hãy kết bạn và cùng trò chuyện nào!'}
            </div>
          )}
          {datas ? datas.map((data, idx) => <Message setChooseId={setChooseId} data={data} key={idx} />) : ''}
        </div>
        {!isHidden && <Chat setReloadMs={setReloadMs} chooseId={chooseId} />}
      </div>
    </div>
  );
}

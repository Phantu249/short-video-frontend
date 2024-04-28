import Message from '../../components/notification/Message.jsx';
import { HiOutlineSearch } from 'react-icons/hi';
import { useAsync } from 'react-use';
import { instanceWToken } from '../../instance.js';
import { useContext, useState } from 'react';
import { AppContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const { isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
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
      console.log(error);
    }
  }, []);

  return (
    <div
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            justify-center
            z-[1]
            bg-white
            h-full
    '>
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
        Thông báo
        <HiOutlineSearch className='absolute right-2 top-2 size-6' />
      </div>
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

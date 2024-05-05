import { IoIosArrowBack } from 'react-icons/io';
import { Transition } from '@headlessui/react';
import SearchBox from '../../components/search/SearchBox.jsx';
import { useContext, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { AppContext, MessagesContext } from '../../App.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useAsync } from 'react-use';

export default function Follow(props) {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const globalMessage = useContext(MessagesContext);
  const { setLoading } = useContext(AppContext);

  useAsync(async () => {
    if (!props.isFollowOpen || searchContent !== '' || searchContent.trim() !== '') {
      return;
    }
    console.log('reload');
    try {
      const res = await instanceWToken(`getfollows?type=${props.followType}`);
      if (res.status === 200) {
        setSearchResult(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [props.isFollowOpen, searchContent]);

  const search = async () => {
    if (searchContent === '' || searchContent.trim() === '') return;
    setLoading(true);
    try {
      const res = await instanceWToken(`getfollows?q=${encodeURIComponent(searchContent)}&type=${props.followType}`);
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.length > 0) {
          setSearchResult(res.data);
        } else {
          globalMessage.current.show([
            {
              severity: 'error',
              detail: 'Không tìm thây kết quả phù hợp',
              closable: true,
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Transition
      show={props.isFollowOpen}
      enter='transition-transform ease-out duration-300'
      enterFrom='transform translate-x-full'
      enterTo='transform translate-x-0'
      leave='transition-transform ease-in duration-200'
      leaveFrom='transform translate-x-0'
      leaveTo='transform translate-x-full'
      className='
            flex
            absolute
            top-0
            left-0
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            z-[10]
            h-full
            bg-white
            '>
      <div
        className='
            flex
            flex-col
            w-full
            h-fit
            items-center
            relative
        '>
        <IoIosArrowBack
          className='size-6 absolute top-5 left-1'
          onClick={(e) => {
            e.stopPropagation();
            props.setIsFollowOpen(false);
          }}
        />
      </div>
      <div className='pl-10 border-b-2'>
        <SearchBox searchContent={searchContent} setSearchContent={setSearchContent} search={search} />
      </div>
      {searchResult.length > 0 && <SearchResult results={searchResult} field='user' />}
    </Transition>
  );
}

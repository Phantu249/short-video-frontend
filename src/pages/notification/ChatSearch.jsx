import { IoIosArrowBack } from 'react-icons/io';
import { Transition } from '@headlessui/react';
import SearchBox from '../../components/search/SearchBox.jsx';
import { useContext, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { AppContext, MessagesContext } from '../../App.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useAsync } from 'react-use';
import { useDebounce } from '../../hook/Debounce.jsx';

export default function ChatSearch(props) {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const globalMessage = useContext(MessagesContext);
  const { setLoading, setIsSearching } = useContext(AppContext);

  const debounce = useDebounce(searchContent, 500);

  useAsync(async () => {
    if (debounce) {
      setIsSearching(true);
      try {
        const res = await instanceWToken(`search?q=${encodeURIComponent(debounce)}&type=user`);
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
          setIsSearching(false);
        }
      } catch (e) {
        console.log(e);
        setIsSearching(false);
      }
    }
  }, [debounce]);

  const search = async () => {
    if (searchContent === '' || searchContent.trim() === '') return;
    setLoading(true);
    try {
      const res = await instanceWToken(`search?q=${encodeURIComponent(searchContent)}&type=user`);
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
      show={props.isChatSearchOpen}
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
            props.setIsChatSearchOpen(false);
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

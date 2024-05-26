import { IoIosArrowBack } from 'react-icons/io';
import { Transition } from '@headlessui/react';
import SearchBox from '../../components/search/SearchBox.jsx';
import { useContext, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { AppContext, MessagesContext } from '../../App.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useAsync } from 'react-use';
import { useDebounce } from '../../hook/Debounce.jsx';

export default function Follow(props) {
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const globalMessage = useContext(MessagesContext);
  const { setLoading, setIsSearching } = useContext(AppContext);
  const { isMobile, isHidden } = useContext(AppContext);

  const debounce = useDebounce(searchContent, 500);

  // useAsync(async () => {
  //   if (debounce) {
  //     console.log(debounce);
  //   }
  // }, [debounce]);

  useAsync(async () => {
    if (!props.isFollowOpen) {
      return;
    }
    console.log('reload');
    setIsSearching(true);
    try {
      const res = await instanceWToken(`getfollows?q=${encodeURIComponent(debounce)}&type=${props.followType}`);
      if (res.status === 200) {
        setSearchResult(res.data);
        setIsSearching(false);
      }
    } catch (e) {
      console.log(e);
      setIsSearching(false);
    }
  }, [props.isFollowOpen, debounce]);

  const search = async () => {
    if (!searchContent.trim()) return;
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
      className={` flex absolute top-0 left-0 w-full h-full flex-col z-[10] 
                  ${isMobile ? 'bg-white' : ' bg-black text-white'}`}>
      <div
        className={`
          flex
          flex-col
          w-full
          h-fit
          items-center
          relative
          ${isHidden ? '' : 'pb-14'}
          `}>
        <IoIosArrowBack
          className='size-6 absolute top-5 left-1 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            setSearchResult([]);
            setSearchContent('');
            props.setIsFollowOpen(false);
          }}
        />
      </div>
      {isHidden && (
        <div className={`pl-10 border-b-[1px] ${isMobile ? '' : 'border-[#444444]'}`}>
          <SearchBox searchContent={searchContent} setSearchContent={setSearchContent} search={search} />
        </div>
      )}

      {searchResult.length > 0 && <SearchResult results={searchResult} field='user' />}
    </Transition>
  );
}

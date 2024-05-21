import SearchBox from '../../components/search/SearchBox.jsx';
import { useContext, useState } from 'react';
import instance from '../../instance.js';
import { useAsync } from 'react-use';
import { AppContext, MessagesContext } from '../../App.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useDebounce } from '../../hook/Debounce.jsx';

export default function Search() {
  const [searchField, setSearchField] = useState('video');
  const [searchContent, setSearchContent] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const globalMessage = useContext(MessagesContext);
  const { setLoading, setIsSearching } = useContext(AppContext);

  const debounce = useDebounce(searchContent, 500);

  useAsync(async () => {
    if (debounce) {
      setIsSearching(true);
      try {
        const res = await instance(`search?q=${encodeURIComponent(debounce)}&type=${encodeURIComponent(searchField)}`);
        if (res.status === 200) {
          console.log(res.data);
          if (res.data.length > 0) {
            setSearchResult(res.data);
          }
          setIsSearching(false);
        }
      } catch (e) {
        console.log(e);
        setIsSearching(false);
      }
    }
  }, [debounce]);

  useAsync(async () => {
    setSearchResult([]);
    if (searchContent === '' || searchContent.trim() === '') return;
    setLoading(true);
    try {
      const res = await instance(
        `search?q=${encodeURIComponent(searchContent)}&type=${encodeURIComponent(searchField)}`,
      );
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
  }, [searchField]);

  const search = async () => {
    if (searchContent === '' || searchContent.trim() === '') return;
    setLoading(true);
    try {
      const res = await instance(
        `search?field=${encodeURIComponent(searchField)}&q=${encodeURIComponent(searchContent)}&type=${encodeURIComponent(searchField)}`,
      );
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
    <div
      className='
            flex
            flex-col
            w-full
            flex-grow
            z-[1]
            h-full
            overflow-hidden
        '>
      <SearchBox searchContent={searchContent} setSearchContent={setSearchContent} search={search} />
      <div className='flex flex-none justify-center gap-3 w-full h-7 my-1 border-b-2'>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSearchField('video');
          }}
          className={`cursor-pointer ${searchField === 'video' ? 'text-black border-b-2 border-black' : 'text-gray-400'} `}>
          Video
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSearchField('user');
          }}
          className={`cursor-pointer ${searchField === 'user' ? 'text-black border-b-2 border-black' : 'text-gray-400'} `}>
          Người dùng
        </div>
      </div>
      {searchResult.length > 0 && <SearchResult results={searchResult} field={searchField} />}
    </div>
  );
}

import SearchBox from '../../components/search/SearchBox.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useState } from 'react';
import instance from '../../instance.js';

export default function Search() {
  const [searchField, setSearchField] = useState('video');
  const [searchContent, setSearchContent] = useState('');

  // const debounce = useDebounce(searchContent, 500);
  //
  // useAsync(async () => {
  //   if (debounce) {
  //     console.log(debounce);
  //   }
  // }, [debounce]);

  const search = async () => {
    if (searchContent === '') return;
    try {
      const res = await instance(
        `search?field=${encodeURIComponent(searchField)}&content=${encodeURIComponent(searchContent)}`,
      );
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    searchField === 'video' ? setSearchField('user') : setSearchField('video');
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
      <div className='flex justify-center gap-3 w-full h-7 my-1'>
        <div
          onClick={handleClick}
          className={`${searchField === 'video' ? 'text-black border-b-2 border-black' : 'text-gray-400'} `}>
          Video
        </div>
        <div
          onClick={handleClick}
          className={`${searchField === 'user' ? 'text-black border-b-2 border-black' : 'text-gray-400'} `}>
          Người dùng
        </div>
      </div>
      <div
        className='
                flex
                flex-grow
                flex-wrap
                w-full
                h-full
                overflow-y-auto
                bg-gray-100
                rounded-xl
            '>
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
      </div>
    </div>
  );
}

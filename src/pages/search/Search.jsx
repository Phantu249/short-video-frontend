import SearchBox from '../../components/search/SearchBox.jsx';
import SearchResult from '../../components/search/SearchResult.jsx';
import { useState } from 'react';

export default function Search() {
  const [searchField, setSearchField] = useState('video');

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
      <SearchBox />
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

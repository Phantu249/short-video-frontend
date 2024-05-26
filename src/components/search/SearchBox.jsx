import { HiOutlineSearch } from 'react-icons/hi';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiLoader2Fill } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../../App.jsx';

export default function SearchBox(props) {
  const { isSearching, isMobile } = useContext(AppContext);
  return (
    <div
      className={`flex w-full flex-none h-16 justify-center items-center
                    ${isMobile ? '' : 'header-search'}`}>
      <form className={`h-full w-full flex flex-none justify-center items-center ${isMobile ? '' : 'header-search'}`}>
        <div className={`relative w-[75%] h-full flex justify-center items-center ${isMobile ? '' : 'header-search'}`}>
          <input
            className={` w-[100%] h-[60%] p-3 px-8 outline-0
                        ${!isMobile ? 'header-search-input rounded-full bg-[#444444]' : 'rounded-xl bg-gray-200'}`}
            autoComplete='off'
            type='text'
            id='cmt-input'
            placeholder='Search...'
            value={props.searchContent}
            onChange={(e) => props.setSearchContent(e.target.value)}
          />

          <HiOutlineSearch className={`absolute left-1 size-6 ${isMobile ? '' : 'header-search'}`} />
          <IoIosCloseCircle
            onClick={(e) => {
              e.stopPropagation();
              props.setSearchContent('');
            }}
            className={` right-3 size-4 text-gray-600 ${isMobile ? '' : 'header-search text-white'}
                        ${props.searchContent !== '' && props.searchContent.trim() !== '' && !isSearching ? 'absolute' : 'hidden'}`}
          />
          <RiLoader2Fill
            className={`animate-spin right-3 size-4 text-gray-600 ${isMobile ? '' : 'header-search text-white'} ${isSearching ? 'absolute' : 'hidden'}`}
          />
        </div>
        <button
          className='ml-2 text-red-500 drop-shadow w-fit'
          style={{ textShadow: '0 0 2px rgba(0,0,0,0.1)' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.search();
          }}>
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}

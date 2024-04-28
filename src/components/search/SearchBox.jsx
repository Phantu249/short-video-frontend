import { HiOutlineSearch } from 'react-icons/hi';

export default function SearchBox(props) {
  return (
    <div
      className='
            flex
            w-full
            flex-none
            h-16
            justify-centerS
            items-center'>
      <form
        className='
            h-full
            w-full
            flex
            flex-none
            justify-center
            items-center'>
        <div
          className='
            relative
            w-[75%]
            h-full
            flex
            justify-center
            items-center'>
          <input
            className='
                w-[100%]
                h-[60%]
                rounded-xl
                bg-gray-200
                p-3
                pl-8
                outline-0'
            autoComplete='off'
            type='text'
            id='cmt-input'
            placeholder='Search...'
            value={props.searchContent}
            onChange={(e) => props.setSearchContent(e.target.value)}
          />
          <HiOutlineSearch className='absolute left-1 size-6' />
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

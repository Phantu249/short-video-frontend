import { IoIosArrowBack } from 'react-icons/io';

export default function BackButton() {
  return (
    <IoIosArrowBack
      className='size-6 absolute top-3 left-3 z-[10] cursor-pointer'
      onClick={(e) => {
        e.stopPropagation();
        window.history.back();
      }}
    />
  );
}

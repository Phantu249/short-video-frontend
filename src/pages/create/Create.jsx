import { LuPlusCircle } from 'react-icons/lu';
import UploadForm from './UploadForm.jsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

export default function Create() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }
  }, []);

  const handleUploadButton = (e) => {
    e.stopPropagation();
    setIsFormOpen(true);
  };
  return (
    <div
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1712707200&semt=ais)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='
            flex
            relative
            w-full
            flex-grow
            flex-col
            overflow-y-hidden
            z-[1]
            h-full
            justify-center
            items-center
            gap-4
        '>
      <div className='relative flex flex-none w-[4.8rem] h-[4.8rem] z-[5] rounded-xl justify-center items-center overflow-hidden scale-125'>
        <div className='absolute -top-[1rem] -left-[1rem] spin-button w-[7rem] h-[7rem] z-[6] twod'></div>
        <div className='absolute rounded w-16 h-16 bg-blue-100 z-[7]'></div>
        <LuPlusCircle className='text-gray-700 rounded-xl size-10 z-[8]' />
      </div>
      <div className='font-bold mt-10 text-4xl'>Upload Video</div>

      <div className='flex w-4/5 text-center justify-center items-center'>
        Chia sẻ những khoảnh khắc đặc biệt của bạn!
      </div>
      <button onClick={handleUploadButton} className='rounded-xl w-36 h-9 bg-blue-400 text-white z-[7]'>
        {' '}
        Upload
      </button>
      <UploadForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </div>
  );
}

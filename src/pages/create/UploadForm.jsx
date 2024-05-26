import { Transition } from '@headlessui/react';
import { useContext, useRef, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { AppContext, MessagesContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';

export default function UploadForm(props) {
  const [description, setDescription] = useState('');
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const globalMessage = useContext(MessagesContext);
  const navigate = useNavigate();
  const { setLoading, setReloadHome, isMobile } = useContext(AppContext);
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append('video', file, file.name);
    }
    formData.append('description', description);
    try {
      const res = await instanceWToken.post('videoupload', formData);
      if (res.status === 201) {
        setLoading(false);
        globalMessage.current.show([
          {
            severity: 'success',
            detail: 'Upload success',
            closable: true,
          },
        ]);
        setReloadHome(true);
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      }
    }
    setLoading(false);
  };

  const handleFileClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <Transition
      show={props.isFormOpen}
      enter='transition-transform ease-out duration-300'
      enterFrom='transform translate-y-full'
      enterTo='transform translate-y-0'
      leave='transition-transform ease-in duration-200'
      leaveFrom='transform translate-y-0'
      leaveTo='transform translate-y-full'
      className={`
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
        ${isMobile ? 'bg-white text-black' : 'bg-[#222222] text-white'}
        justify-center
        items-center
        `}>
      <div className='font-bold mt-10 text-4xl'>Upload Video</div>

      <form onSubmit={(e) => e.preventDefault()} className='flex w-full flex-col h-fit max-w-96 p-5 gap-2'>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept='video/*'
        />

        <label htmlFor='description' className='px-2 font-bold'>
          Description
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name='description'
          className={`resize-none outline-none rounded-xl border-2 h-[10rem] w-full p-2 ${isMobile ? 'bg-white text-black' : 'bg-[#222222] text-white'}`}
        />
        <div className='w-full flex items-center my-5 z-[7] gap-2'>
          <button
            className='flex flex-none rounded-xl justify-center items-center w-36 h-10 bg-blue-400 text-white '
            onClick={handleFileClick}>
            Choose a Video
          </button>
          <p className='flex flex-grow max-h-10 item-center overflow-hidden'> {file ? file.name : ''} </p>
        </div>
        <button
          className='bg-gray-500 h-10 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold'
          onClick={handleUpload}>
          Upload
        </button>
      </form>
    </Transition>
  );
}

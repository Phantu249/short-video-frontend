import ProfileButton from './ProfileButton.jsx';
import { IoCameraOutline } from 'react-icons/io5';
import { Transition } from '@headlessui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { useContext, useEffect, useRef, useState } from 'react';
import { instanceWToken } from '../../instance.js';
import { AppContext } from '../../App.jsx';

export default function EditProfile(props) {
  const [editFName, setEditFName] = useState('');
  const [editLName, setEditLName] = useState('');
  const { setLoading, isMobile } = useContext(AppContext);

  const [editBio, setEditBio] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (props.isEditOpen) {
      setEditFName('');
      setEditLName('');
      setEditBio('');
      setFile(null);
      setFileUrl(null);
    }
  }, [props.isEditOpen]);

  const handleSaveProfileClick = async (e) => {
    setLoading(true);
    e.stopPropagation();
    const editData = new FormData();
    if (file) {
      editData.append('profile_pic', file, file.name);
    }
    if (editFName !== '') {
      editData.append('first_name', editFName);
    }
    if (editLName !== '') {
      editData.append('last_name', editLName);
    }
    if (editBio !== '') {
      editData.append('bio', editBio);
    }

    try {
      const res = await instanceWToken.put('profile', editData);
      if (res.status === 200) {
        setLoading(false);
        props.setIsEditOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileUrl(URL.createObjectURL(file));
  };
  return (
    <Transition
      show={props.isEditOpen}
      enter='transition-transform ease-out duration-300'
      enterFrom='transform translate-x-full'
      enterTo='transform translate-x-0'
      leave='transition-transform ease-in duration-200'
      leaveFrom='transform translate-x-0'
      leaveTo='transform translate-x-full'
      className={` flex absolute top-0 left-0 w-full h-full flex-col z-[10] 
                  ${isMobile ? 'bg-white' : ' bg-black text-white'}`}>
      <div
        className='
            flex
            flex-col
            w-full
            h-full
            items-center
            relative
        '>
        <div className='m-2 font-bold'>Sửa Hồ sơ</div>
        <IoIosArrowBack
          className='size-6 absolute top-2 left-2 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            props.setIsEditOpen(false);
          }}
        />
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept='image/*'
        />
        <button className='w-fit h-fit rounded-full my-2 relative' onClick={handleAvatarClick}>
          <img
            src={file ? fileUrl : props.profile.profile_pic}
            alt='profile-avt'
            className='
            w-28
            h-28
            object-cover
            rounded-full
            border-4
            border-[#444444]
            '
          />
          <div
            className='
            absolute
            top-0
            left-0
            w-28
            h-28
            object-cover
            rounded-full
            bg-black
            bg-opacity-40
            '>
            <IoCameraOutline className='absolute top-10 left-10 size-8 text-white ' />
          </div>
        </button>

        <div className='text-sm'>Thay đổi ảnh</div>
        <div className='flex w-full flex-col px-3 my-5 mt-10 items-center'>
          <form className={`flex ${isMobile ? 'w-full' : 'w-1/2 min-w-[400px]'} flex-col gap-2 mb-5`}>
            <div className='flex w-full '>
              <label htmlFor='firstname' className='px-2 font-bold content-center'>
                Tên
              </label>
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder={props.first_name}
                value={editFName}
                onChange={(e) => setEditFName(e.target.value)}
                autoComplete='off'
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
            <div className='flex w-full '>
              <label htmlFor='lastname' className='px-2 font-bold content-center'>
                Họ
              </label>
              <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder={props.last_name}
                value={editLName}
                onChange={(e) => setEditLName(e.target.value)}
                autoComplete='off'
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
            <div className='flex w-full '>
              <label htmlFor='username' className='px-2 font-bold content-center'>
                Bio
              </label>
              <input
                type='text'
                name='username'
                id='username'
                placeholder={props.profile.bio}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                autoComplete='off'
                className={`outline-none border-b-2 border-[rgba(209,213,219,0.2)] focus:border-[rgba(149,153,156,0.8)] h-8 w-full text-right mx-2
                  ${isMobile ? 'text-black' : 'bg-black text-white'}`}
              />
            </div>
          </form>
          <ProfileButton className={`${isMobile ? '' : 'bg-[#333333]'}`} onClick={handleSaveProfileClick}>
            Lưu
          </ProfileButton>
        </div>
      </div>
    </Transition>
  );
}

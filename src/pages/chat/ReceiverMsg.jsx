export default function ReceiverMsg(props) {
  return (
    <div
      className='
          flex
          flex-none
          w-full
          h-fit
          gap-1'>
      <div className='flex flex-none w-10 h-10 rounded-full border-2 border-gray-700 mt-2 overflow-hidden'>
        <img src={props.profile.profile_pic} alt='avt' className='object-cover w-10 h-10 pb-1' />
      </div>
      <div
        className='
          flex
          flex-col
          flex-grow
          w-full
          h-full
    '>
        <div className='text-sm text-gray-500 pl-3'>{props.name}</div>
        <div
          className='
          flex
          items-center
          w-fit
          max-w-[80%]
          h-full
          p-3
          rounded-[2rem]
          bg-gray-500
          text-white
          '>
          {props.msg}
        </div>
      </div>
    </div>
  );
}

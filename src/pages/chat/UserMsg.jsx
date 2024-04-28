export default function UserMsg(props) {
  return (
    <div
      className='
          flex
          flex-none
          w-full
          h-fit
          gap-1'>
      <div
        className='
          flex
          flex-col
          flex-grow
          w-full
          h-full
          items-end
    '>
        <div className='text-sm text-gray-500 pr-5'>Tôi</div>
        <div
          className='
          flex
          items-center
          w-fit
          max-w-[75%]
          h-full
          p-3
          rounded-[2rem]
          bg-blue-500
          text-white
          '>
          {props.msg}
        </div>
      </div>
    </div>
  );
}

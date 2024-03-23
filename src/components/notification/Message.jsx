export default function Message() {
  return (
    <div
      className='
            flex
            flex-none
            w-full
            h-20
            items-center
            bg-gray-100
            rounded-xl

    '>
      <img
        src='/pic.png'
        alt='avt-pic'
        className='
                w-14
                h-14
                rounded-full
                bg-gray-500
                ml-2
           '
      />
      <div className='flex flex-col w-full gap-2 p-2'>
        <div
          className='
                flex
                place-content-between'>
          <span className='font-bold'>Tu Phan</span>
          <span className='text-sm'>2 giờ trước</span>
        </div>
        <div>Đã thích video của bạn</div>
      </div>
    </div>
  );
}

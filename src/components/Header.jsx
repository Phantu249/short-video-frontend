const Header = (props) => {
  return (
    <div
      className='
            absolute
            top-0
            w-full
            h-8
            flex
            justify-center
            items-center
            text-white
            z-[10]
            gap-2
            p-5
            drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
            '>
      <span
        onClick={(e) => {
          e.stopPropagation();
          props.setHomeState('follow');
        }}
        className={`
                    font-semibold
                    ${props.homeState === 'follow' ? 'opacity-[1] ' : 'opacity-[0.6]'}
                `}>
        Đang theo dõi
      </span>
      <span
        className='
                w-0.5
                h-4
                bg-white
                rounded
                '></span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          props.setHomeState('forYou');
        }}
        className={` font-semibold
                    ${props.homeState === 'forYou' ? 'opacity-[1] ' : 'opacity-[0.6]'}
                `}>
        Dành cho bạn
      </span>
    </div>
  );
};

export default Header;

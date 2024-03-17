import {useState} from "react";

const Header = () => {

    const [homeState, setHomeState] = useState('forYou')

    const handleClickHomeHeader = () => {
        homeState === 'forYou' ? setHomeState('follow') : setHomeState('forYou')
    }

    return (
        <div className="
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
            "
        >
            <span
                onClick={handleClickHomeHeader}
                className={`
                    ${homeState === 'follow' ? 'opacity-[1]' : 'opacity-[0.5]'}
                `}
            >Đang theo dõi</span>
            <span className="
                w-0.5
                h-4
                bg-white
                rounded
                "
            ></span>
            <span
                onClick={handleClickHomeHeader}
                className={`
                    ${homeState === 'forYou' ? 'opacity-[1]' : 'opacity-[0.5]'}
                `}
            >Dành cho bạn</span>
        </div>
    )
}

export default Header;
const Header = () => {
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
            <span>Đang theo dõi</span>
            <span className="
                w-0.5
                h-4
                bg-white
                rounded
                "
            ></span>
            <span>Dành cho bạn</span>
        </div>
    )
}

export default Header;
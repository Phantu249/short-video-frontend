import Button from "./Button.jsx";
import {FaRegMessage, FaRegSquarePlus, FaRegUser} from "react-icons/fa6";
import {HiOutlineHome, HiOutlineSearch} from "react-icons/hi";

const NavBar = () => {
    return (
        <div className="
            bg-black
            text-white
            w-full
            h-16
            z-20
            flex
            justify-between
            outline-none
            border-t
            border-gray-500
            "
        >
            <Button>
                <HiOutlineHome className="
                                    size-6
                                    "/>
                Trang chủ
            </Button>
            <Button>
                <HiOutlineSearch className="
                                    size-6
                                    "/>
                Tìm kiếm
            </Button>
            <Button>
                <FaRegSquarePlus className="
                                    size-7
                                    "/>
            </Button>
            <Button>
                <FaRegMessage className="
                                    size-5
                                    "/>
                Thông báo
            </Button>
            <Button>
                <FaRegUser className="
                                    size-5
                                    "/>
                Hồ sơ
            </Button>
        </div>
    )
}
export default NavBar;
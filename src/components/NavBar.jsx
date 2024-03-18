import Button from "./Button.jsx";
import {FaRegMessage, FaRegSquarePlus, FaRegUser} from "react-icons/fa6";
import {HiOutlineHome, HiOutlineSearch} from "react-icons/hi";
import {Link} from "react-router-dom";

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
                <Link className={'customLink'} to="/home">
                    <HiOutlineHome className="
                                    size-6
                                    "/>
                    Trang chủ
                </Link>
            </Button>
            <Button>
                <Link className={'customLink'} to="/search">
                    <HiOutlineSearch className="
                                    size-6
                                    "/>
                    Tìm kiếm
                </Link>
            </Button>
            <Button>
                <Link className={'customLink'} to="/create">
                    <FaRegSquarePlus className="
                                    size-7
                                    "/>
                </Link>
            </Button>
            <Button>
                <Link className={'customLink'} to="/notification">
                    <FaRegMessage className="
                                    size-5
                                    "/>
                    Thông báo
                </Link>
            </Button>
            <Button>
                <Link className={'customLink'} to="/profile">
                    <FaRegUser className="
                                    size-5
                                    "/>
                    Hồ sơ
                </Link>
            </Button>
        </div>
    )
}
export default NavBar;
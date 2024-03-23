import {FaComment, FaHeart, FaShare} from "react-icons/fa6";
import {RxAvatar} from "react-icons/rx";
import ActionButton from "./ActionButton.jsx";
import {useContext} from "react";
import {HomeContext} from "../../pages/home/Home.jsx"

export default function ActionButtonContainer() {

    const {isCommentOpen, setIsCommentOpen} = useContext(HomeContext)
    const handleClickAvt = (e) => {
        e.stopPropagation()
        console.log('Avt')
    }

    const handleClickHeart = (e) => {
        e.stopPropagation()
        console.log('Heart')
    }

    const handleClickCmt = (e) => {
        e.stopPropagation()
        setIsCommentOpen(true)
        console.log('Cmt')
    }

    const handleClickShare = (e) => {
        e.stopPropagation()
        console.log('Share')
    }

    return (
        <div className="
            absolute
            text-white
            bottom-0
            right-0
            h-3/5
            min-h-72
            w-1/4
            z-[3]
            p-3

            flex
            flex-col
            justify-between
            items-center
        ">
            <ActionButton
                handleClick={handleClickAvt}
            >
                <RxAvatar className="
                    size-10

                "/>
                +
            </ActionButton>
            <ActionButton
                handleClick={handleClickHeart}
            >
                <FaHeart className="
                    size-7
                "/>
                0
            </ActionButton>
            <ActionButton id="commentBtn"
                          handleClick={handleClickCmt}
            >
                <FaComment className="
                    size-7
                "/>
                0
            </ActionButton>
            <ActionButton
                handleClick={handleClickShare}
            >
                <FaShare className="
                    size-7
                "/>
                0
            </ActionButton>
        </div>
    )
}
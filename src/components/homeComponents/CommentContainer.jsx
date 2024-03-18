import {Transition} from '@headlessui/react'
import {useContext} from "react";
import {HomeContext} from "../../pages/home/Home.jsx";
import Comment from "./Comment.jsx";
import CmtInput from "./CmtInput.jsx";
import {FaXmark} from "react-icons/fa6";

export default function CommentContainer(props) {

    const {isCommentOpen, setIsCommentOpen} = useContext(HomeContext)
    const handleCommentContainerClick = (e) => {
        e.stopPropagation()
    }

    return (
        <Transition
            show={isCommentOpen}
            enter="transition-transform ease-out duration-300"
            enterFrom="transform translate-y-full"
            enterTo="transform translate-y-0"
            leave="transition-transform ease-in duration-200"
            leaveFrom="transform translate-y-0"
            leaveTo="transform translate-y-full"

            className="
                flex
                flex-col
                absolute
                w-full
                h-2/3
                z-[4]
                bg-white
                bottom-0
                rounded-t-xl
            "
            onClick={handleCommentContainerClick}
        >
            <div className="flex justify-center m-1 p-1">Comment</div>
            <div className="
                    absolute
                    right-3
                    top-3
                    scale-125"
                 onClick={() => setIsCommentOpen(false)}
            >
                <FaXmark/>
            </div>
            <div className="
                    flex
                    relative
                    flex-col
                    flex-grow
                    w-full
                    overflow-y-auto
                    z-[4]
                    h-full
            ">
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
            <CmtInput/>
        </Transition>

    )
}


import {FaComment, FaHeart, FaShare} from "react-icons/fa6";
import {RxAvatar} from "react-icons/rx";
import ActionButton from "./ActionButton.jsx";

export default function ActionButtonContainer() {
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
            <ActionButton>
                <RxAvatar className="
                    size-10

                "/>
                +
            </ActionButton>
            <ActionButton>
                <FaHeart className="
                    size-7
                "/>
                0
            </ActionButton>
            <ActionButton>
                <FaComment className="
                    size-7
                "/>
                0
            </ActionButton>
            <ActionButton>
                <FaShare className="
                    size-7
                "/>
                0
            </ActionButton>
        </div>
    )
}
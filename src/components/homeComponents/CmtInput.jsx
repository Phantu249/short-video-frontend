import {CiPaperplane} from "react-icons/ci";

export default function CmtInput() {
    return (
        <div className="
                flex
                w-full
                h-20

                justify-center
                items-center
        ">
            <form className="
                            h-full
                            w-full
                            flex
                            justify-center
                            items-center
                        ">

                <input className="
                            w-[80%]
                            h-[60%]
                            rounded-3xl
                            bg-gray-200
                            p-3
                            outline-0
                        "
                       type="text" id="cmt-input" placeholder="Comment..."/>
                <button onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}><CiPaperplane className="size-8 ml-2"/></button>
            </form>
        </div>
    )
}
// shadow-[0_2px_5px_1px_rgba(0,0,0,0.3)]
import DetailVideo from "../../components/homeComponents/DetailVideo.jsx";
import ActionButtonContainer from "../../components/homeComponents/ActionButtonContainer.jsx";
import {createContext, useRef, useState} from "react";
import {FaPlay} from "react-icons/fa6";
import CommentContainer from "../../components/homeComponents/CommentContainer.jsx";

export const HomeContext = createContext()
const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const videoRef = useRef(null)

    const handleClick = (e) => {
        // if Cmt is opening => just close it else do the play/pause video
        if (isCommentOpen) {
            setIsCommentOpen(false)
        } else {
            isPlaying ? videoRef.current.pause() : videoRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <HomeContext.Provider value={{isCommentOpen, setIsCommentOpen}}>
            <div className="
            flex
            relative
            w-full
            flex-grow
            overflow-y-hidden
            justify-center
            items-center
            z-[1]
            bg-black
            h-full
            "
                 onClick={handleClick}
            >
                <video loop
                       src="/Chungtacuatuonglai.mp4"
                       className="
                            w-full
                            z-[1]
                       "
                       id="video-player"
                       ref={videoRef}
                >
                    {/*if u want add autoPlay u need set isPlaying init to true*/}
                    {/*but remember autoPlay is blocked by browser*/}
                </video>
                <FaPlay className={`
                            absolute
                            z-[3]
                            text-white
                            size-10
                            opacity-[0.5]
                            drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
                            ${isPlaying ? "hidden" : 'block'}`}
                />
                <DetailVideo/>
                <ActionButtonContainer/>
                <CommentContainer display={`
                                        ${isCommentOpen ? "block" : "hidden"}
                `}/>
            </div>
        </HomeContext.Provider>
    )
}
export default Home;
import DetailVideo from "../../components/homeComponents/DetailVideo.jsx";
import ActionButtonContainer from "../../components/homeComponents/ActionButtonContainer.jsx";

const Home = () => {
    return (
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
        >
            <video autoPlay loop controls
                   src="/Chungtacuatuonglai.mp4"
                   className="
                        w-full
                        z-[1]
                   "
            >
            </video>
            <DetailVideo/>
            <ActionButtonContainer/>
        </div>
    )
}
export default Home;
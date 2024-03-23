export default function DetailVideo(props) {
    return (
        <div className="
            absolute
            text-white
            bottom-0
            left-0
            h-fit
            max-h-36
            w-3/4
            z-[3]
            p-3
            flex
            flex-col
            justify-end
            ">
            <p className="
                w-full
                font-bold
                text-lg
                drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
            >{props.content[0]}</p>
            <p className="
                w-full
                max-h-26
                text-base
                overflow-y-auto
                drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
            >{props.content[1]}
            </p>
        </div>
    )
}
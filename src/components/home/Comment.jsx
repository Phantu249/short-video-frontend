export default function Comment(props) {
    return (
        <div className="
                flex
                flex-col
                w-100
                h-fit
                p-2
                m-2
        ">
            <div className="
                w-100
                h-fit
                ">{props.user}
            </div>
            <div
                className="
                w-100
                h-fit
                "
            >{props.cmt}
            </div>
        </div>
    )
}
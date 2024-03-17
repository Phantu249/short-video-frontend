export default function ActionButton(props) {

    return (
        <button className="
                    flex
                    flex-col
                    h-1/5
                    text-xs
                    justify-center
                    items-center
                    drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
                    "
                onClick={props.handleClick}
        >{props.children}</button>
    )
}
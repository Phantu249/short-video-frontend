export default function Button(props) {
    return (
        <button className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-1/5
                    text-xs
                    active:bg-zinc-700
                    "
                onClick={() => {
                    props.setPage(props.page)
                }}
        >
            {props.children}
        </button>
    )
}

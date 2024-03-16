export default function Button({children}) {
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
        >
            {children}
        </button>
    )
}

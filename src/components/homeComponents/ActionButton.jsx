export default function ActionButton({children}) {
    return (
        <button className="
                    flex
                    flex-col
                    h-1/5
                    text-xs
                    justify-center
                    items-center
                    drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]
                    active:bg-amber-200
                    "
        >{children}</button>
    )
}
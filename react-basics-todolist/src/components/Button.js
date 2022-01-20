export default function Button({label, eventHandler, eventParam, btnClass}) {
    return (
        <>
            <button className={btnClass} onClick={() => eventHandler(eventParam || null)}>{label}</button>
        </>
    )
}
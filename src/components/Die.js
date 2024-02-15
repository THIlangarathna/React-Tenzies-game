export default function Die(props) {
    return (
        <div className={props.isHeld ? "die-face light" : "die-face"} onClick={props.toggleClick}>
            <h2 className="die-num">
                {props.value}
            </h2>
        </div>
    )
}
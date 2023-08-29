export default function Die(props) {

    return(
        <div className={`die ${props.isHeld&& "green"}`} id={props.id} onClick={props.handleClick}>
            {props.value}
        </div>
    )
}
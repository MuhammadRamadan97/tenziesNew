export default function Die(props) {

    return(
        <h1 className={`die ${props.isHeld&& "green"}`} id={props.id} onClick={props.handleClick}>
            {props.value}
        </h1>
    )
}
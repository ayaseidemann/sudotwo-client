import './SelectorButton.scss';

function SelectorButton(props) {

    return(
        <button className={`selector-button selector-button--${props.playerNum}`} onClick={props.clickButton}>{props.text}</button>
    )
}

export default SelectorButton;
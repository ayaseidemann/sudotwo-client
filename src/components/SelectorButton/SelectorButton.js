import './SelectorButton.scss';

function SelectorButton(props) {

    const mult = props.text === '×' ? "selector-button--mult" : "";


    return(
        <button className={`selector-button selector-button--${props.playerNum} ${mult}`} onClick={props.clickButton}>{props.text}</button>
    )
}

export default SelectorButton;
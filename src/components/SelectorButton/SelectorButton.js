import './SelectorButton.scss';

function SelectorButton({ text, clickButton }) {

    return(
        <button className='selector-button' onClick={clickButton}>{text}</button>
    )
}

export default SelectorButton;
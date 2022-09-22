import './SubmitButton.scss';

function SubmitButton({ clickButton, text }) {

    return(
        <button onClick={clickButton}>{text}</button>
    )
}

export default SubmitButton;
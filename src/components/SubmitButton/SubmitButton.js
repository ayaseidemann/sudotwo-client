import './SubmitButton.scss';

function SubmitButton({ clickHandler, text }) {

    return(
        <button onClick={clickHandler}>{text}</button>
    )
}

export default SubmitButton;
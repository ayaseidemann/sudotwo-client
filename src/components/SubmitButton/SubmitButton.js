import './SubmitButton.scss';

function SubmitButton({ clickButton, text }) {

    return(
        <button onClick={clickButton} className='submit-button'>{text}</button>
    )
}

export default SubmitButton;
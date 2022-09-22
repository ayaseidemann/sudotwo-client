import './SubmitButton.scss';

function SubmitButton({ clickButton, text, active }) {

    return(
        <>
            {active && 
                <button onClick={clickButton} className='submit-button submit-button--active'>{text}</button>
            }
            {!active && 
                <button onClick={clickButton} className='submit-button submit-button--inactive' disabled>{text}</button>
            }
        </>
    )
}

export default SubmitButton;
import './SubmitButton.scss';

function SubmitButton({ clickButton, text, active, playerNum }) {

    const player = playerNum ? `submit-button--player${playerNum}` : '';

    return(
        <>
            {active && 
                <button onClick={clickButton} className={`submit-button submit-button--active ${player}`} >{text}</button>
            }
            {!active && 
                <button onClick={clickButton} className='submit-button submit-button--inactive' disabled>{text}</button>
            }
        </>
    )
}

export default SubmitButton;
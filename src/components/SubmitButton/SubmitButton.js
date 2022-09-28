import './SubmitButton.scss';

function SubmitButton({ clickButton, text, active, playerNum, dropShadow }) {

    const player = playerNum ? `submit-button--player${playerNum}` : '';
    const shadow = dropShadow ? `submit-button--shadow` : '';

    return(
        <>
            {active && 
                <button onClick={clickButton} className={`submit-button submit-button--active ${player} ${shadow}`} >{text}</button>
            }
            {!active && 
                <button onClick={clickButton} className='submit-button submit-button--inactive' disabled>{text}</button>
            }
        </>
    )
}

export default SubmitButton;
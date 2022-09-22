
import './JoinGame.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BasicHeader from '../../components/BasicHeader/BasicHeader';



function JoinGame({ socket, setUsername }) {

    const navigate = useNavigate();

    // // set state for toggling button active or not
    // const [isButtonActive, setIsButtonActive] = useState(false);

    // // toggle if button is active based on if input field is blank or not
    // function inputChange(event) {
    //     if (event.target.value) {
    //         setIsButtonActive(true);
    //     } else {
    //         setIsButtonActive(false);
    //     }
    // }

    const joinExistingRoom = async (event) => {
        event.preventDefault();
        const roomId = event.target.roomId.value;
        setUsername(event.target.name.value);
        console.log('joining room:', roomId);
        await socket.emit('join-room', roomId);
        navigate(`/game/${roomId}`);
    }

    return(
        <form className='join-game' onSubmit={joinExistingRoom}>
            <BasicHeader text='Join game'/>
            <label className='join-game__label'>
                <p className='join-game__label-text'>Your name</p>
                <input 
                    className='join-game__input' 
                    type='text' 
                    name='name'
                    maxLength='12'
                    // onChange={inputChange}
                />
            </label>
            <label className='join-game__label'>
                <p className='join-game__label-text'>Room code</p>
                <input 
                    className='join-game__input join-game__input--code' 
                    type='text' 
                    name='roomId' 
                    maxLength='5'
                    // onChange={inputChange}
                />
            </label>
            <SubmitButton text='Join Game'/>
        </form>
        
    )
}

export default JoinGame;
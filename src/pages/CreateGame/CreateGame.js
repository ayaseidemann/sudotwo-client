import './CreateGame.scss';
import ShortUniqueId from 'short-unique-id';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BasicHeader from '../../components/BasicHeader/BasicHeader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';


function CreateGame({ setUsername }) {

    const navigate = useNavigate();

    // set state for toggling button active or not
    const [isButtonActive, setIsButtonActive] = useState(false);

    // toggle if button is active based on if input field is blank or not
    function inputChange(event) {
        if (event.target.value) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }

    // function to create new game and navigate to it
    async function joinNewRoom(event) {
        event.preventDefault();
        // generate random 5 digit id
        const uid = new ShortUniqueId({ length: 5 });
        const roomId = uid();
        setUsername(event.target.name.value);
        // setup game in server with given room id
        await axios.get(`http://localhost:8080/setup-game/${roomId}`);
        console.log('joining room:', roomId);
        // navigate to Game Page for that room
        navigate(`/game/${roomId}`);
    }

    return (
        <>
            <BasicHeader text='Create game' />
            <form className='create-game' onSubmit={joinNewRoom}>
                <label className='create-game__label'>
                    <p className='create-game__label-text'>Your name</p>
                    <input
                        className='create-game__input'
                        type='text'
                        name='name'
                        maxLength='12'
                        onChange={inputChange}
                    />
                </label>
                <SubmitButton 
                    text='Create Game' 
                    active={isButtonActive} 
                    playerNum={1}
                />
            </form>
        </>
    )
}

export default CreateGame;
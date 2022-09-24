import './CreateGame.scss';
import ShortUniqueId from 'short-unique-id';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BasicHeader from '../../components/BasicHeader/BasicHeader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';


function CreateGame(props) {

    const navigate = useNavigate();

    // set state for toggling button active or not
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [waitingRoom, setWaitingRoom] = useState(false);
    const [roomId, setRoomId] = useState('');

    // toggle if button is active based on if input field is blank or not
    function inputChange(event) {
        if (event.target.value) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }

    // function to create new game and navigate to it
    async function createRoom(event) {
        event.preventDefault();
        // generate random 5 digit id
        const uid = new ShortUniqueId({ length: 5 });
        const roomId = uid();
        setRoomId(roomId);
        props.setUsername(event.target.name.value);
        // setup game in server with given room id
        await axios.get(`http://chookie.local:8080/setup-game/${roomId}`);
        props.socket.emit('join-room', roomId);
        console.log('joining room:', roomId);
        setWaitingRoom(true);
    }

    // on receiving socket go-to-to, nav to game page
    function startGame() {
        props.socket.on('go-to-game', roomId => {
            navigate(`/game/${roomId}`);
        })
    }

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        props.socket.on('join-room', roomId);
    }, []);

    return (
        <>
            <BasicHeader text='Create game' />
            {!waitingRoom &&
                <form className='create-game' onSubmit={createRoom}>
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
            }
            {waitingRoom &&
                <>
                    <form className='create-game'>
                        <label className='create-game__label'>
                            <p className='create-game__label-text'>Your name</p>
                            <input
                                className='create-game__input create-game__input--locked'
                                type='text'
                                name='name'
                                placeholder={props.username}
                            />
                        </label>
                    </form>
                    <div className='waiting-room'>
                        <p className='waiting-room__header'>Your room code is</p>
                        <h2 className='waiting-room__code'>{roomId}</h2>
                        <p className='waiting-room__p'>Have a friend (or foe) type in this code at sudotwo.com/join</p>
                        <p className='waiting-room__waiting'>Waiting...</p>

                    </div>
                </>
            }
        </>
    )
}

export default CreateGame;

import './JoinGame.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BasicHeader from '../../components/BasicHeader/BasicHeader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';


function JoinGame(props) {

    const navigate = useNavigate();

    // set state for input validation
    const [nameFilled, setNameFilled] = useState(false);
    const [codeFilled, setcodeFilled] = useState(false);

    // if name input is not blank set filled to true
    function nameInputChange(event) {
        if (event.target.value) {
            setNameFilled(true);
        } else {
            setNameFilled(false);
        }
    }

    // if code input is > 5 characters set filled to true
    function codeInputChange(event) {
        if (event.target.value.length === 5) {
            setcodeFilled(true);
        } else {
            setcodeFilled(false);
        }
    }

    // check if room Id exists in all room Ids from JSON
    const doesRoomExist =  async (roomId) => {
        const { data: rooms } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/all-games`);
        const roomToJoin = rooms.find(room => room.roomId === roomId);
        return (roomToJoin ? true : false);
    }

    // on form submit navigate to game room based on input room code
    const joinExistingRoom = async (event) => {
        event.preventDefault();
        const roomId = event.target.roomId.value;
        const roomExists = await doesRoomExist(roomId);
        if (roomExists) {
            props.setMyName(event.target.name.value);
            props.socket.emit('join-room', roomId);        
        } else {
            alert("this isn't a room dummy");
            event.target.roomId.value = '';
        }
    }

    // on receiving socket go-to-to, nav to game page
    function startGame() {
        props.socket.on('go-to-game', roomId => {
            console.log('data:', roomId);
            props.setPlayerNum(2);
            navigate(`/game/${roomId}`);
        })
        props.socket.on('no-entry', roomId => {
            alert('sorry room is full!');
        })
    }

    useEffect(() => {
        startGame();
    }, []);

    return (
        <>
            <BasicHeader text='Join game' />
            <form className='join-game' onSubmit={joinExistingRoom}>
                <label className='join-game__label'>
                    <p className='join-game__label-text'>Your name</p>
                    <input
                        className='join-game__input'
                        type='text'
                        name='name'
                        maxLength='12'
                        onChange={nameInputChange}
                    />
                </label>
                <label className='join-game__label'>
                    <p className='join-game__label-text'>Room code</p>
                    <input
                        className='join-game__input join-game__input--code'
                        type='text'
                        name='roomId'
                        maxLength='5'
                        onChange={codeInputChange}
                    />
                </label>
                <SubmitButton 
                    text='Join Game' 
                    active={nameFilled && codeFilled}
                    playerNum={2}
                />
            </form>
        </>

    )
}

export default JoinGame;
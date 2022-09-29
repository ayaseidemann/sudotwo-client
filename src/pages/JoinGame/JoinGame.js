
import './JoinGame.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BasicHeader from '../../components/BasicHeader/BasicHeader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import error from '../../assets/sudotwo_images/16/error@3x.png';

function JoinGame(props) {

    const navigate = useNavigate();

    // set state for input validation
    const [nameFilled, setNameFilled] = useState(false);
    const [codeFilled, setcodeFilled] = useState(false);
    const [roomNotFound, setroomNotFound] = useState(false);
    const [roomFull, setRoomFull] = useState(false);

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
        // make errors go away if present
        setRoomFull(false);
        setroomNotFound(false);
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
            setroomNotFound(true);
            // event.target.roomId.value = '';
        }
    }

    // on receiving socket go-to-game nav to game page
    function startGame() {
        props.socket.on('go-to-game', data => {
            console.log('roomId:', data.roomId);
            props.setPlayerNum(2);
            navigate(`/game/${data.roomId}`);
        })
        props.socket.on('no-entry', roomId => {
            setRoomFull(true);
        })
    }

    useEffect(() => {
        startGame();
    }, []);

    return (
        <div className='join-game__wrapper'>
            <BasicHeader text='Join game' />
            <form className='join-game' onSubmit={joinExistingRoom} autoComplete="off">
                <label className='join-game__label'>
                    <p className='join-game__label-text'>Your name</p>
                    <input
                        className='join-game__input'
                        type='text'
                        name='name'
                        maxLength='12'
                        onChange={nameInputChange}
                        autoFocus
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
                    <div className={`room-not-found--${roomNotFound}`}>
                        <p className='room-not-found__p'>Room not found</p>
                        <img className='room-not-found__icon' src={error} alt=''/>
                    </div>
                    <div className={`room-full--${roomFull}`}>
                        <p className='room-full__p'>Room already full</p>
                        <img className='room-full__icon' src={error} alt=''/>
                    </div>
                </label>
                <SubmitButton 
                    text='Join Game' 
                    active={nameFilled && codeFilled}
                    playerNum={2}
                />
            </form>
        </div>

    )
}

export default JoinGame;
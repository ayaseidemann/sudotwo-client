
import './JoinGame.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BasicHeader from '../../components/BasicHeader/BasicHeader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';


function JoinGame({ socket, setUsername }) {

    const navigate = useNavigate();

    const [nameFilled, setNameFilled] = useState(false);
    const [codeFilled, setcodeFilled] = useState(false);

    function nameInputChange(event) {
        if (event.target.value) {
            setNameFilled(true);
        } else {
            setNameFilled(false);
        }
    }

    function codeInputChange(event) {
        if (event.target.value.length === 5) {
            setcodeFilled(true);
        } else {
            setcodeFilled(false);
        }
    }

    const doesRoomExist =  async (roomId) => {
        const { data: rooms } = await axios.get(`http://localhost:8080/all-games`);
        const roomToJoin = rooms.find(room => room.roomId === roomId);
        return (roomToJoin ? true : false);
    }

    const joinExistingRoom = async (event) => {
        event.preventDefault();
        const roomId = event.target.roomId.value;
        const roomExists = await doesRoomExist(roomId);
        if (roomExists) {
            setUsername(event.target.name.value);
            console.log('joining room:', roomId);
            await socket.emit('join-room', roomId);
            navigate(`/game/${roomId}`);
        } else {
            alert("this isn't a room dummy");
            event.target.roomId.value = '';
        }
    }

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

import './JoinGame.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';



function JoinGame({ socket }) {

    let navigate = useNavigate();

    const joinExistingRoom = (event) => {
        // event.preventDefault();
        const roomId = event.target.roomId.value;
        console.log('joining room: ', roomId);
        socket.emit('join-room', roomId);
        navigate(`/game/${roomId}`);
    }

    return(
        <form onSubmit={joinExistingRoom}>
            <label>Room code
                <input type='text' name='roomId'></input>
            </label>
            <SubmitButton text='Join Game'/>
        </form>
        
    )
}

export default JoinGame;
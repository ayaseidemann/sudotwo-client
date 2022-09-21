
import './JoinGame.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';



function JoinGame({ socket, setUsername }) {

    let navigate = useNavigate();

    const joinExistingRoom = (event) => {
        event.preventDefault();
        const roomId = event.target.roomId.value;
        setUsername(event.target.name.value);
        console.log('joining room: ', roomId);
        socket.emit('join-room', roomId);
        navigate(`/game/${roomId}`);
    }

    return(
        <form onSubmit={joinExistingRoom}>
            <label>Your name
                <input type='text' name='name' />
            </label>
            <label>Room code
                <input type='text' name='roomId' />
            </label>
            <SubmitButton text='Join Game'/>
        </form>
        
    )
}

export default JoinGame;
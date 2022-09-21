import './CreateGame.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ShortUniqueId from 'short-unique-id';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function CreateGame({ socket }) {

    let navigate = useNavigate();

    async function joinNewRoom(event) {
        event.preventDefault();
        const uid = new ShortUniqueId({ length: 5 });
        const roomId = uid();
        const { data: axiosGame } = await axios.get(`http://localhost:8080/setup-game/${roomId}`);
        console.log('joining room: ', roomId);
        socket.emit('join-room', roomId);
        navigate(`/game/${roomId}`);
    }

    return (
        <form onSubmit={joinNewRoom}>
            {/* <label>Your name
                <input type='text' name='name' />
            </label> */}
            <SubmitButton text='Create Game' />
        </form>
    )
}

export default CreateGame;
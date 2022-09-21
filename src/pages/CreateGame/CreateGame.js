import './CreateGame.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import ShortUniqueId from 'short-unique-id';
import { useNavigate } from 'react-router-dom';


function CreateGame({ socket }) {

    let navigate = useNavigate();

    function joinNewRoom(event) {
        const uid = new ShortUniqueId({ length: 5 });
        const roomId = uid();
        console.log('joining room: ', roomId);
        socket.emit('join-room', roomId);
        navigate(`/game/${roomId}`);
    }
    
    return(
        
        <SubmitButton clickHandler={joinNewRoom} text='Create Game'/>
    )
}

export default CreateGame;
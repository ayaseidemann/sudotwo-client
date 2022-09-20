import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import './GamePage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';


function GamePage() {

    const [roomId, setRoomId] = useState('');
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [selectedTile, setSelectedTile] = useState([0, 0])
    
    // function geting board from server
    async function getBoard() {
        try {
            // const difficulty = useParams();
            const { data: axiosGame } = await axios.get(`http://localhost:8080/game/easy`);
            // console.log(axiosGame);
            setRoomId(axiosGame.roomId);
            setBoard(axiosGame.board);
            setSolution(axiosGame.solution);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBoard();
    }, []);


    const buttonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', '🤔', '👍'];

    function clickButton(event) {
        console.log('in click button event');
        console.log("selectedTile[0]: ", selectedTile[0]);
        console.log("selectedTile[1]: ", selectedTile[1]);
        // console.log("board[selectedTile[0]][selectedTile[1]]: ", board[selectedTile[0]][selectedTile[1]]);
        // setInputVal(event.target.innerText);

        const tmpBoard = [...board];

        tmpBoard[selectedTile[0]][selectedTile[1]]=event.target.innerText
        setBoard(tmpBoard);
        // console.log("selected tile: ", selectedTile);
        console.log("input value: ", Number(event.target.innerText));
        console.log("board after click event: ", board);
    }

    return (
        <div className='game-page'>
            <GameBoard 
                roomId={roomId}
                board={board}
                solution={solution}
                setSelectedTile={setSelectedTile}
            />
            <div className='button-wrapper'>
                {buttonList.map(btn => {
                    return(
                        <SelectorButton text={btn}  clickButton={clickButton}/>
                    )
                })}
            </div>

        </div>
    )

}

export default GamePage;
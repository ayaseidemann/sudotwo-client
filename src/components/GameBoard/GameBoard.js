import './GameBoard.scss';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardRow from '../BoardRow/BoardRow';

function GameBoard({ roomId, board, solution, setSelectedTile, selectedTile,emojiBoard }) {

    console.log('this is the board in the game board function: ', board);

    return (
        <div className='game-board'>
            {board.map((rowData, i) => {
                return(
                        <BoardRow 
                            rowNum={i+1} 
                            rowData={rowData} 
                            solution={solution[i]}
                            setSelectedTile={setSelectedTile}
                            selectedTile={selectedTile}
                            emojiBoard={emojiBoard}
                        />
                )
            })}
        </div>
    )
}

export default GameBoard;



    // // function geting board from sudoku
    // function getBoard() {
    //     axios.get(boardApiURL)
    //         .then(response => {
    //             setBoard(response.data.board);
    //         })
    //         .then(response => {
    //             axios.post(solutionApiURL, {"board": board})
    //                 .then(response => {
    //                     console.log(response.data.solution);
    //                     setSolution(response.data.solution);
    //                 })
    //         })
    //         .catch(err => console.log(err));
    // }

        // const [roomId, setRoomId] = useState('');
    // const [board, setBoard] = useState([]);
    // const [solution, setSolution] = useState([]);
    
    // // function geting board from server
    // async function getBoard() {
    //     try {
    //         // const difficulty = useParams();
    //         const { data: axiosGame } = await axios.get(`http://localhost:8080/game/easy`);
    //         // console.log(axiosGame);
    //         setRoomId(axiosGame.roomId);
    //         setBoard(axiosGame.board);
    //         setSolution(axiosGame.solution);
    //     }
    //     catch(err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getBoard();
    // }, []);
    // console.log("the board is now: ", board);
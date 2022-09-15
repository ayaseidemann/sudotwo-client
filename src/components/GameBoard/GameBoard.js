import './GameBoard.scss';
import { useEffect,useState } from 'react';
import axios from 'axios';
import BoardRow from '../BoardRow/BoardRow';

function GameBoard() {

    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const boardApiURL = ` https://sugoku.herokuapp.com/board?difficulty=easy`;
    const solutionApiURL = `https://sugoku.herokuapp.com/solve`
    
    // function geting board from sudoku
    function getBoard() {
        axios.get(boardApiURL)
            .then(response => {
                setBoard(response.data.board);
            })
            .then(response => {
                axios.post(solutionApiURL, {"board": board})
                    .then(response => {
                        console.log(response.data.solution);
                        setSolution(response.data.solution);
                    })
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getBoard();
    }, [])

    return (
        <div className='game-board'>
            {board.map((rowData, i) => {
                return(
                        <BoardRow rowNum={i+1} rowData={rowData} />
                )
            })}
        </div>
    )
}

export default GameBoard;
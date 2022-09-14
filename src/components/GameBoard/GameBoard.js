import './GameBoard.scss';
import { useEffect,useState } from 'react';
import axios from 'axios';
import BoardRow from '../BoardRow/BoardRow';

function GameBoard() {

    const [board, setBoard] = useState([]);
    const apiURL = ` https://sugoku.herokuapp.com/board?difficulty=easy`;
    
    // function geting board from sudoku api
    function getBoard() {
        axios.get(apiURL)
            .then(response => {
                setBoard(response.data.board);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getBoard();
    }, [])

    return (
        board.map((row, i) => {
            return(
                <BoardRow index={i+1} row={row} />
            )
        })
    )
}

export default GameBoard;
import './GameBoard.scss';
import BoardRow from '../BoardRow/BoardRow';

function GameBoard(props) {

    return (
        <div className='game-board'>
            {props.board.map((rowData, i) => {
                return(
                        <BoardRow 
                            key={i}
                            rowNum={i+1} 
                            rowData={rowData} 
                            rowSolution={props.solution[i]}
                            {...props}
                        />
                )
            })}
        </div>
    )
}

export default GameBoard;

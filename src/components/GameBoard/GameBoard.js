import './GameBoard.scss';
import BoardRow from '../BoardRow/BoardRow';

function GameBoard({ roomId, board, solution, setSelectedTile, selectedTile, otherUserSelectedTile, emojiBoard, socket }) {

    return (
        <div className='game-board'>
            {board.map((rowData, i) => {
                return(
                        <BoardRow 
                            roomId={roomId}
                            rowNum={i+1} 
                            rowData={rowData} 
                            solution={solution[i]}
                            setSelectedTile={setSelectedTile}
                            selectedTile={selectedTile}
                            otherUserSelectedTile={otherUserSelectedTile}
                            emojiBoard={emojiBoard}
                            socket={socket}
                        />
                )
            })}
        </div>
    )
}

export default GameBoard;

import './BoardTile.scss';
import { useEffect, useState } from 'react';


function BoardTile({ roomId, rowNum, colNum, val, solution, setSelectedTile, selectedTile, otherUserSelectedTile, emojiBoard, socket }) {

    const xSectionNum = Math.ceil(colNum / 3);

    // if selected row and column match this tile's row and column, give class selected
    const selectedClass = selectedTile[0] === rowNum - 1 && selectedTile[1] === colNum - 1
        ? "selected"
        : "";

    // if other user selected row and column match this tile's row and column, give class name other selected
    const otherSelectedClass = otherUserSelectedTile[0] === rowNum - 1 && otherUserSelectedTile[1] === colNum - 1
        ? "other-selected"
        : "";

    // if the value is 0 set the tile to be blank
    const text = val === 0 ? "" : val;

    const emoji = emojiBoard[rowNum - 1][colNum -1]
        ? emojiBoard[rowNum - 1][colNum -1]
        : '';
    
    // click event updating selected tile to the clicked tile
    function clickTile(event) {
        event.preventDefault();
        if (otherSelectedClass !== '') {return};
        setSelectedTile([rowNum - 1, colNum - 1]);
        socket.emit('tile-selected', 
            {
                roomId: roomId,
                tileCoords: [rowNum - 1, colNum - 1]
            })
    }

    return (
        <>
            {/* if the value is a number not equal to zero the number was received
                from the server and should not have a click handler and display the value
                otherwise, the div should have a click handler and display text (set above)
                and the emoji if there is one */}
            {typeof val === 'number' && val !== 0 ?
                <div
                    key={`${rowNum}${colNum}`}
                    row={rowNum}
                    column={colNum}
                    className={`tile col-${colNum} x-section-${xSectionNum} locked`}
                >{val}
                </div> :
                <div
                    key={`${rowNum}${colNum}`}
                    row={rowNum}
                    column={colNum}
                    className={`tile col-${colNum} x-section-${xSectionNum} ${selectedClass}  ${otherSelectedClass} `}
                    solution={solution}
                    onClick={clickTile}
                >{text}
                    <div className='reaction'>{emoji}</div>
                </div>
            }
        </>
    )
}

export default BoardTile;
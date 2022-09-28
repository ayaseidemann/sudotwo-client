import './BoardTile.scss';
import { useEffect, useState } from 'react';


function BoardTile(props) {

    const xSectionNum = Math.ceil(props.colNum / 3);

    const otherPlayerNum = props.playerNum === 1 ? 2 : 1;

    // check which user entered tile
    // if (props.inputBoard[props.rowNum - 1][props.colNum - 1] ===1 || props.inputBoard[props.rowNum - 1][props.colNum - 1] === 2) {
    //     console.log('user', props.inputBoard[props.rowNum - 1][props.colNum - 1], 'input tile', props.rowNum - 1, props.colNum - 1);

    // }

    // if the value is 0 set the tile to be blank
    let text = props.val === 0 ? "" : props.val;

    // if selected row and column match this tile's row and column, give class selected
    const selectedClass = props.selectedTile[0] === props.rowNum - 1 && props.selectedTile[1] === props.colNum - 1
        ? `selected selected--${props.playerNum}`
        : "";

    // if other user selected row and column match this tile's row and column, give class name other selected
    let otherSelectedClass = ""
    if (props.otherUserSelectedTile[0] === props.rowNum - 1 && props.otherUserSelectedTile[1] === props.colNum - 1) {
        otherSelectedClass = `other-selected other-selected--${otherPlayerNum}`
        if (props.otherUserTileValue !== "") {
            text = props.otherUserTileValue;
            const tmpBoard = [...props.board];
            tmpBoard[props.rowNum - 1][props.colNum -1] =  text;
            props.setBoard(tmpBoard);
            return;
        }
    }

    // const otherSelectedClass = props.otherUserSelectedTile[0] === props.rowNum - 1 && props.otherUserSelectedTile[1] === props.colNum - 1
    //     ? "other-selected"
    //     : "";

    const emoji = props.emojiBoard && props.emojiBoard[props.rowNum - 1][props.colNum -1]
        ? props.emojiBoard[props.rowNum - 1][props.colNum -1]
        : '';
    
    // click event updating selected tile to the clicked tile
    function clickTile(event) {
        event.preventDefault();
        if (otherSelectedClass === '') {
        props.setSelectedTile([props.rowNum - 1, props.colNum - 1]);
        props.socket.emit('tile-selected', 
            {
                roomId: props.roomId,
                tileCoords: [props.rowNum - 1, props.colNum - 1]
            })
        }
    }

    return (
        <>
            {/* if the value is a number not equal to zero the number was received
                from the server and should not have a click handler and display the value
                otherwise, the div should have a click handler and display text (set above)
                and the emoji if there is one */}
            {typeof props.val === 'number' && props.val !== 0 ?
                <div
                    key={`${props.rowNum}${props.colNum}`}
                    row={props.rowNum}
                    column={props.colNum}
                    className={`tile col-${props.colNum} x-section-${xSectionNum} locked`}
                >{props.val}
                </div> :
                <div
                    key={`${props.rowNum}${props.colNum}`}
                    row={props.rowNum}
                    column={props.colNum}
                    className={`tile tile--${props.playerNum} col-${props.colNum} x-section-${xSectionNum} ${selectedClass} ${otherSelectedClass} user--${props.inputBoard[props.rowNum - 1][props.colNum - 1]}`}
                    solution={props.solutionTile}
                    onClick={clickTile}
                >{text}
                    <div className={`reaction reaction--${emoji}`}></div>
                </div>
            }
        </>
    )
}

export default BoardTile;
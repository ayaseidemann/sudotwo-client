import './BoardTile.scss';

function BoardTile({ rowNum, colNum, val, solution, setSelectedTile, selectedTile, emojiBoard }) {

    const xSectionNum = Math.ceil(colNum / 3);

    // if selected row and column match this tile's row and column, give class name selected
    const selectedClass = selectedTile[0] === rowNum - 1 && selectedTile[1] === colNum - 1
        ? "selected"
        : "";

    // if the value is 0 set the tile to be blank
    const text = val === 0 ? "" : val;

    const emoji = emojiBoard[rowNum - 1][colNum -1]
        ? emojiBoard[rowNum - 1][colNum -1]
        : '';
    
    // click event updating selected tile to the clicked tile
    function clickTile(event) {
        setSelectedTile([rowNum - 1, colNum - 1]);
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
                    className={`tile col-${colNum} x-section-${xSectionNum} ${selectedClass}`}
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

{/* <>
{!blank &&
    <input 
    key={`${rowNum}${colNum}`}
    row={rowNum}
    column={colNum}
    className={`tile col-${colNum} x-section-${xSectionNum}`} 
    solution={solution}
    placeholder={val}
    disabled
    />
}

{blank &&
    <input
    key={`${rowNum}${colNum}`} 
    row={rowNum}
    column={colNum}
    className={`tile col-${colNum} x-section-${xSectionNum}`} 
    placeholder={!blank ? {val} : " "}
    maxLength={1}
    solution={solution}
    onClick={clickTile}
    onBlur={focusAway}
    />
}
</> */}

{/* if the value is a string that means it has been inputed by a user
                and should remain editable */}
{/* {typeof val === 'string' &&
                    <div
                        key={`${rowNum}${colNum}`} 
                        row={rowNum}
                        column={colNum}
                        className={`tile col-${colNum} x-section-${xSectionNum} ${selectedClass}`} 
                        solution={solution}
                        onClick={clickTile}
                    >{val}
                    </div>
                } */}
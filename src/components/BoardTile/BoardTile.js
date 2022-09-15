import './BoardTile.scss';

function BoardTile({ rowNum, colNum, val }) {

        // should have a row and col idx -> compare input with answersheet[row][col]

        const xSectionNum = Math.ceil(colNum / 3);

        const blank = (val === 0);
    
        return (
            <>
                {!blank &&
                    <input 
                    key={`${rowNum}${colNum}`}
                    row={rowNum}
                    column={colNum}
                    className={`tile col-${colNum} x-section-${xSectionNum}`} 
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
                    placeholder=" " 
                    maxLength={1}
                    // onChange 
                    />
                }
            </>
        )
}

export default BoardTile;
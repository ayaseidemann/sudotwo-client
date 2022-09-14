import './BoardTile.scss';

function BoardTile({ index, val }) {

        // should have a row and col idx -> compare input with answersheet[row][col]

        const xSectionNum = Math.ceil(index / 3);

        const blank = (val === 0);
    
        return (
            <>
                {!blank &&
                    <div className={`tile col-${index} x-section-${xSectionNum}`}>{val}</div>
                }
                {blank &&
                    <div className={`tile col-${index} x-section-${xSectionNum}`}>*</div>
                }
            </>
        )
}

export default BoardTile;
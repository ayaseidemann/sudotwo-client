import './BoardTile.scss';
import { useEffect,useState } from 'react';

function BoardTile({ rowNum, colNum, val, solution }) {

        const xSectionNum = Math.ceil(colNum / 3);

        const blank = (val === 0);

        function clickTile(event) {
            event.target.classList.add('selected');

        }

        function focusAway(event) {
            event.target.classList.remove('selected');
        }
    
        return (
            <>
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
                    placeholder=" " 
                    maxLength={1}
                    solution={solution}
                    onClick={clickTile}
                    onBlur={focusAway}
                    />
                }
            </>
        )
}

export default BoardTile;
import './BoardTile.scss';
import { useEffect,useState } from 'react';

function BoardTile({ rowNum, colNum, val, solution, inputVal }) {

        const xSectionNum = Math.ceil(colNum / 3);

        function clickTile(event) {
            event.target.classList.add('selected');
        }

        function focusAway(event) {
            event.target.classList.remove('selected');
        }
    
        return (
            <>
                {val !== 0 &&
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

                {/* {blank && selected && inputVal &&
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
                } */}

                {val === 0 &&
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
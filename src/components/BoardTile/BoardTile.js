import './BoardTile.scss';
import { useEffect,useState } from 'react';

function BoardTile({ rowNum, colNum, val, solution, setSelectedTile }) {

        const xSectionNum = Math.ceil(colNum / 3);

        function clickTile(event) {
            event.target.classList.add('selected');
            console.log('clicked tile row: ', rowNum-1);
            console.log('clicked tile column: ', colNum-1);
            setSelectedTile([rowNum-1, colNum-1]);
        }

        function focusAway(event) {
            event.target.classList.remove('selected');
        }
    
        return (
            <>

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

                {typeof val === 'string' &&
                    <input
                    key={`${rowNum}${colNum}`} 
                    row={rowNum}
                    column={colNum}
                    className={`tile col-${colNum} x-section-${xSectionNum}`} 
                    placeholder={val}
                    maxLength={1}
                    solution={solution}
                    onClick={clickTile}
                    onBlur={focusAway}
                    />
                }

                {typeof val === 'number' && val !== 0 &&
                    <input 
                    key={`${rowNum}${colNum}`}
                    row={rowNum}
                    column={colNum}
                    className={`tile col-${colNum} x-section-${xSectionNum} locked`} 
                    solution={solution}
                    placeholder={val}
                    disabled
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
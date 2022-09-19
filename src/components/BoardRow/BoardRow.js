import './BoardRow.scss';
import BoardTile from '../BoardTile/BoardTile';

function BoardRow({ rowNum, rowData, solution, inputVal }) {

    const ySectionNum = Math.ceil(rowNum / 3);

    return (
        <div key={rowNum} className={`row row-${rowNum} y-section-${ySectionNum}`}>
            {rowData.map((val, i) => {
                return(
                    <BoardTile 
                        rowNum={rowNum} 
                        colNum={i+1} 
                        val={val} 
                        solution={solution[i]}
                        inputVal={inputVal}
                    />
                )
            })}
        </div>
    )
}

export default BoardRow;



// return(
//     <>
//         {inputVal &&
//             <BoardTile 
//                 rowNum={rowNum} 
//                 colNum={i+1} 
//                 val={inputVal} 
//                 solution={solution[i]}
//             />
//         }
//         {!inputVal &&
//             <BoardTile 
//                 rowNum={rowNum} 
//                 colNum={i+1} 
//                 val={val} 
//                 solution={solution[i]}
//             />
//         }
//     </>
// )
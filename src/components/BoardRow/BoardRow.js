import './BoardRow.scss';
import BoardTile from '../BoardTile/BoardTile';

function BoardRow(props) {

    const ySectionNum = Math.ceil(props.rowNum / 3);

    return (
        <div key={props.rowNum} className={`row row-${props.rowNum} y-section-${ySectionNum}`}>
            {props.rowData.map((val, i) => {
                return(
                    <BoardTile 
                        key={`${props.rowNum}-${i}`}
                        colNum={i+1} 
                        rowNum={props.rowNum}
                        val={val} 
                        tileSolution={props.rowSolution[i]}
                        {...props}
                    />
                )
            })}
        </div>
    )
}

export default BoardRow;
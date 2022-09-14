import './BoardRow.scss';
import BoardTile from '../BoardTile/BoardTile';

function BoardRow({ index, row }) {

    const ySectionNum = Math.ceil(index / 3);

    return (
        <div className={`row row-${index} y-section-${ySectionNum}`}>
            {row.map((val, i) => {
                return(
                    <BoardTile index={i+1} val={val} />
                )
            })}
        </div>
    )
};

export default BoardRow;
import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import './GamePage.scss';
import { useState } from 'react';


function GamePage() {

    const [inputVal, setInputVal] = useState('');

    const buttonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', '🤔', '👍'];
    // const [board, setBoard] = useState([]);

    function clickButton(event) {
        console.log(event.target.innerText);
        setInputVal(event.target.innerText);
        // update board and set board
    }

    return (
        <div className='game-page'>
            <GameBoard/>
            <div className='button-wrapper'>
                {buttonList.map(btn => {
                    return(
                        <SelectorButton text={btn}  clickButton={clickButton}/>
                    )
                })}
            </div>

        </div>
    )

}

export default GamePage;
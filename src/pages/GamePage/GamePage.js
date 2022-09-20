import './GamePage.scss';
import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import { useState, useEffect } from 'react';
import axios from 'axios';


function GamePage() {

    // set state for variables that change
    const [roomId, setRoomId] = useState('');
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [selectedTile, setSelectedTile] = useState([]);
    const [emojiBoard, setEmojiBoard] = useState([[],[],[],[],[],[],[],[],[]]);

    // lists of input buttons
    const buttonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X'];
    const emojiList = ['🤔', '👍'];
    
    // get board, roomId, and solution from server
    async function getBoard() {
        try {
            // const difficulty = useParams();
            const { data: axiosGame } = await axios.get(`http://localhost:8080/game/easy`);
            setRoomId(axiosGame.roomId);
            setBoard(axiosGame.board);
            setSolution(axiosGame.solution);
        }
        catch(err) {
            console.log(err);
        }
    }

    // create board on page load
    useEffect(() => {
        getBoard();
    }, []);

    // updates the emoji board when we input an emoji
    function updateSelectedEmoji(emojiString) {
        const tmpEmojiBoard = [...emojiBoard];
        let newEmoji = emojiString;
        // if the currently selected tile already has that emoji, remove it
        if (tmpEmojiBoard[selectedTile[0]][selectedTile[1]] === newEmoji) {
            newEmoji = '';
        }
        // updates the emoji on the current selected tile to inputed emoji
        tmpEmojiBoard[selectedTile[0]][selectedTile[1]] = newEmoji;
        setEmojiBoard(tmpEmojiBoard);
    }

    // click handler for number or delete buttons 
    function clickButton(event) {
        // setInputVal(event.target.innerText);
        // if the button is 'X' set value of selected tile to blank
        // otherwise keep it the button's value
        const tmpBoard = [...board];
        const newValue = event.target.innerText === 'X' ? '' : event.target.innerText;
        // if the value, is now blank, make sure the corresponding emoji is deleted
        if (newValue === '') {
            updateSelectedEmoji('');
        }
        // set selected tile in board to button's value
        tmpBoard[selectedTile[0]][selectedTile[1]] = newValue;
        setBoard(tmpBoard);
    }

    // click handler for emoji buttons
    function emojiClickButton(event) {
        updateSelectedEmoji(event.target.innerText);
    }

    return (
        <div className='game-page'>
            <GameBoard 
                roomId={roomId}
                board={board}
                solution={solution}
                setSelectedTile={setSelectedTile}
                selectedTile={selectedTile}
                emojiBoard={emojiBoard}
            />
            <div className='buttons-wrapper'>
                <div className='buttons__values'>
                    {buttonList.map(btn => {
                        return(
                            <SelectorButton text={btn} clickButton={clickButton} />
                        )
                    })}
                </div>
                <div className='buttons__emojis'>
                    {emojiList.map(btn => {
                        return(
                            <SelectorButton text={btn} clickButton={emojiClickButton} />
                        )
                    })}
                </div>
            </div>

        </div>
    )

}

export default GamePage;
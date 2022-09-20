import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import './GamePage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';


function GamePage() {

    const [roomId, setRoomId] = useState('');
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [selectedTile, setSelectedTile] = useState([]);
    const [emojiBoard, setEmojiBoard] = useState([[],[],[],[],[],[],[],[],[]]);
    
    // function geting board from server
    async function getBoard() {
        try {
            // const difficulty = useParams();
            const { data: axiosGame } = await axios.get(`http://localhost:8080/game/easy`);
            // console.log(axiosGame);
            setRoomId(axiosGame.roomId);
            setBoard(axiosGame.board);
            setSolution(axiosGame.solution);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBoard();
    }, []);


    const buttonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X'];
    const emojiList = ['🤔', '👍'];

    function clickButton(event) {
        // setInputVal(event.target.innerText);
        const tmpBoard = [...board];
        const newValue = event.target.innerText === 'X' ? '' : event.target.innerText;
        if (newValue === '') {
            updateSelectedEmoji('');

        }
        tmpBoard[selectedTile[0]][selectedTile[1]] = newValue;
        setBoard(tmpBoard);
    }

    function emojiClickButton(event) {
        updateSelectedEmoji(event.target.innerText);
    }

    function updateSelectedEmoji(emojiString) {
        const tmpEmojiBoard = [...emojiBoard];
        let newEmoji = emojiString;
        if (tmpEmojiBoard[selectedTile[0]][selectedTile[1]] === newEmoji) {
            newEmoji = '';
        }
        tmpEmojiBoard[selectedTile[0]][selectedTile[1]] = newEmoji;
        setEmojiBoard(tmpEmojiBoard);
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
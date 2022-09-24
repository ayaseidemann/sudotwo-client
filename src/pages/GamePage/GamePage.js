import './GamePage.scss';
import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';
import axios from 'axios';

// const socket = io.connect(`http://chookie.local:8080`);

function GamePage(props) {

    const { roomId } = useParams();

    // set state for variables that change
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    // const [inputVal, setInputVal] = useState('');
    const [selectedTile, setSelectedTile] = useState([]);
    const [otherUserSelectedTile, setOtherUserSelectedTile] = useState([]);
    const [otherUserTileValue, setOtherUserTileValue] = useState("");
    const [emojiBoard, setEmojiBoard] = useState([[],[],[],[],[],[],[],[],[]]);

    // lists of input buttons
    const buttonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X'];
    const emojiList = ['🤔', '👍'];
    
    // get board, roomId, and solution from server json
    async function getBoard() {
        try {
            const { data: axiosGame } = await axios.get(`http://chookie.local:8080/read-game/${roomId}`);
            setBoard(axiosGame.board);
            setSolution(axiosGame.solution);

            // emit board to socket for second user
            // socket.emit('create-game', axiosGame);
        }
        catch(err) {
            console.log(err);
        }
    }

    // create board on page load
    useEffect(() => {
        // props.socket.emit('join-room', roomId);
        props.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        getBoard();
    }, []);

    // function to run on socket receiving tile
    function receiveTile() {
        props.socket.on('receive-tile', tileCoords => {
            setOtherUserSelectedTile(tileCoords);
        });
    };

    useEffect(() => {
        receiveTile();
    }, []);

    // function to run on socket receive tile change, set board to board updated by other user
    function receiveTileChange() {
        props.socket.on('receive-tile-change', otherBoard => {
            setBoard(otherBoard);
        })
    }

    useEffect(() => {
        receiveTileChange();
    }, [])

    // useEffect(() => {
    //     socket.on('create-board', game => {
    //         console.log('game received from the server: ', game);
    //     })
    // }, [socket])

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
        // if the button is 'X' set value of selected tile to blank, otherwise keep it the button's value
        const tmpBoard = [...board];
        const newValue = event.target.innerText === 'X' ? 0 : event.target.innerText;
        // if the value, is now blank, make sure the corresponding emoji is deleted
        if (newValue === '') {
            updateSelectedEmoji('');
        }
        // set selected tile in board to button's value
        tmpBoard[selectedTile[0]][selectedTile[1]] = newValue;
        setBoard(tmpBoard);

        // emit to socket when a change is made
        props.socket.emit('tile-change', 
            {
                roomId: roomId,
                board: board
            });
    }

    // click handler for emoji buttons
    function emojiClickButton(event) {
        updateSelectedEmoji(event.target.innerText);
    }

    return (

        <div className='game-page'>
            <h1 className='game-page__header'>Hi {props.username}</h1>
            <GameBoard 
                roomId={roomId}
                board={board}
                setBoard={setBoard}
                solution={solution}
                setSelectedTile={setSelectedTile}
                selectedTile={selectedTile}
                emojiBoard={emojiBoard}
                otherUserSelectedTile={otherUserSelectedTile}
                otherUserTileValue={otherUserTileValue}
                socket={props.socket}
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
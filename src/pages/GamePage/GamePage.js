import './GamePage.scss';
import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Timer from '../../components/Timer/Timer';
import Modal from '../../components/Modal/Modal';


function GamePage(props) {

    const { roomId } = useParams();

    // set state for variables that change
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [inputBoard, setInputBoard] = useState([]);
    // const [inputVal, setInputVal] = useState('');
    const [timerRunning, setTimerRunning] = useState(true);
    const [receivedTime, setReceivedTime] = useState('');
    const [time, setTime] = useState('');
    const [emojiBoard, setEmojiBoard] = useState([[], [], [], [], [], [], [], [], []]);
    const [selectedTile, setSelectedTile] = useState([]);
    const [otherUserSelectedTile, setOtherUserSelectedTile] = useState([]);
    const [otherUserTileValue, setOtherUserTileValue] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    // lists of input buttons
    const buttonsRow1 = [1, 2, 3, 4, 5];
    const buttonsRow2 = [6, 7, 8, 9, 'X'];

    const otherPlayerNum = props.playerNum === 1 ? 2 : 1;

    // get board, roomId, and solution from server json
    async function getBoard() {
        try {
            const { data: axiosGame } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/read-game/${roomId}`);
            setBoard(axiosGame.board);
            setSolution(axiosGame.solution);
            // send username to socket
            props.socket.emit('send-name', { roomId: roomId, sendName: props.myName });
            // set up input board, 0 - from API, 1 - player 1 input, 2 - player 2 input
            let tmpInputBoard = [[], [], [], [], [], [], [], [], []];
            axiosGame.board.map((row, i) => {
                row.map((tile, j) => {
                    if (axiosGame.board[i][j] !== 0) {
                        tmpInputBoard[i][j] = 0;
                    }
                    else {
                        tmpInputBoard[i][j] = '-';
                    }
                })
            });
            setInputBoard(tmpInputBoard);
            // emit board to socket for second user
            // socket.emit('create-game', axiosGame);
        }
        catch (err) {
            console.log(err);
        }
    }

    // create board on page load
    useEffect(() => {
        props.socket.on('receive-time', timer => {
            setReceivedTime(timer);
        })
        props.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        props.socket.on("disconnect", (reason) => {
            console.log('disconnecting for this reason:', reason)
        })
        getBoard();
    }, []);

    // function to run on socket receiving tile
    function receiveTile() {
        props.socket.on('receive-tile', tileCoords => {
            setOtherUserSelectedTile(tileCoords);
        });
        props.socket.on('receive-emoji', receivedEmojiBoard => {
            setEmojiBoard(receivedEmojiBoard);
        });
        props.socket.on('receive-won-game', () => {
            setShowModal(true);
            setModalType("won");
            console.log('other user submitted and you won!');
        });
        props.socket.on('receive-stop-timer', () => {
            setTimerRunning(false);
        })
    };

    useEffect(() => {
        // receive other user's name
        props.socket.on('receive-name', receivedName => {
            props.setTheirName(receivedName);
        });
    }, []);

    useEffect(() => {
        receiveTile();
    }, []);

    // function to run on socket receive tile change, set board to board updated by other user
    function receiveTileChange() {
        props.socket.on('receive-tile-change', data => {
            setBoard(data.board);
            setInputBoard(data.inputBoard);
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
        // emit emoji board change to socket
        props.socket.emit('emoji-change', {
            roomId: roomId,
            emojiBoard: emojiBoard
        });
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
        // update input board to player's number in the position of the updated tile
        const tmpInputBoard = [...inputBoard];
        tmpInputBoard[selectedTile[0]][selectedTile[1]] = props.playerNum;
        setInputBoard(tmpInputBoard);
        // emit to socket when a change is made
        props.socket.emit('tile-change',
            {
                roomId: roomId,
                board: board,
                inputBoard: inputBoard
            });
    }

    // click handler for emoji buttons
    function emojiClickButton(event) {
        updateSelectedEmoji(event.target.innerText);
    }

    function leaveClick(event) {

    }

    function revealClick(event) {
        console.log('revealing click event');
        let tmpBoard = [...board];
        tmpBoard[selectedTile[0]][selectedTile[1]] = String(solution[selectedTile[0]][selectedTile[1]]);
        setBoard(tmpBoard);
        const tmpInputBoard = [...inputBoard];
        tmpInputBoard[selectedTile[0]][selectedTile[1]] = props.playerNum + 2;
        setInputBoard(tmpInputBoard);
        console.log('board', board);
        console.log('inputBoard', inputBoard);
        // emit to socket when a change is made
        props.socket.emit('tile-change',
        {
            roomId: roomId,
            board: board,
            inputBoard: inputBoard
        });
    }

    function submitClick() {
        // check for no zeros/unfilled tiles
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    setShowModal(true);
                    setModalType('incomplete')
                    return;
                }
            }
        }
        // turn board to all numbers
        let tmpBoard = JSON.parse(JSON.stringify(board));
        for (let i = 0; i < tmpBoard.length; i++) {
            for (let j = 0; j < tmpBoard[i].length; j++) {
                if (typeof tmpBoard[i][j] === 'string') {
                    tmpBoard[i][j] = Number(tmpBoard[i][j]);
                }
            }
        }
        if (JSON.stringify(tmpBoard) === JSON.stringify(solution)) {
            console.log('YOU DID IT!!!!');
            if (props.playerNum === 2) {
                props.socket.emit('stop-timer', roomId);
            }
            setTimerRunning(false);
            props.socket.emit('won-game', roomId);
            setShowModal(true);
            setModalType('won');
        } else {
            setShowModal(true);
            setModalType('incorrect')
            console.log('setting show modal to true on submitting incorrect game');
        }
    }

    function fillBoard(event) {
        if (event.key === 'p') {
            let tmpBoard = [...board];
            tmpBoard.map((row, i) => {
                return row.map((tile, j) => {
                    if (tmpBoard[i][j] === 0) {
                        return tmpBoard[i][j] = '1'
                    }
                })
            })
            // emit to socket when a change is made
            props.socket.emit('tile-change',
                {
                    roomId: roomId,
                    board: board,
                    inputBoard: inputBoard
                });
            setBoard(tmpBoard);
        }
        if (event.key === 'l') {
            let tmpBoard = [...board];
            tmpBoard.map((row, i) => {
                return row.map((tile, j) => {
                    if (typeof tmpBoard[i][j] === 'string' || tmpBoard[i][j] === 0) {
                        return tmpBoard[i][j] = String(solution[i][j]);
                    }
                })
            })
            // emit to socket when a change is made
            props.socket.emit('tile-change',
                {
                    roomId: roomId,
                    board: board,
                    inputBoard: inputBoard
                });
            setBoard(tmpBoard);
        }
    }

    return (
        <div className='game-page__wrapper'>
            <div className={`game-page`} onKeyDown={fillBoard} tabIndex="0">
                <header className='game-page__header'>
                    <button className='game-page__leave' onClick={leaveClick}>
                        <img className='game-page__leave-icon' src='' alt='' />
                        Leave
                    </button>
                    <div className='game-page__text'>
                        <h1 className='game-page__logo'>Sudo<span className={`game-page__logo-span game-page__logo-span--${props.playerNum}`}>two</span>!</h1>
                        <div className='game-page__subheader'>
                            <div className='game-page__other-name'>with <span className={`game-page__subheader-span game-page__subheader-span--${otherPlayerNum}`}>{props.theirName}</span>  | </div>
                            {props.playerNum === 1 &&
                                <Timer socket={props.socket} roomId={roomId} timerRunning={timerRunning} setTime={setTime}/>
                            }
                            {props.playerNum === 2 &&
                                <div className='timer'>{receivedTime}</div>
                            }
                        </div>
                    </div>
                    <button className='game-page__reveal' onClick={revealClick}>
                        <img className='game-page__reveal-icon' src='' alt='' />
                        Reveal
                    </button>
                </header>
                <GameBoard
                    roomId={roomId}
                    playerNum={props.playerNum}
                    board={board}
                    setBoard={setBoard}
                    solution={solution}
                    setSelectedTile={setSelectedTile}
                    selectedTile={selectedTile}
                    emojiBoard={emojiBoard}
                    inputBoard={inputBoard}
                    otherUserSelectedTile={otherUserSelectedTile}
                    otherUserTileValue={otherUserTileValue}
                    socket={props.socket}
                />
                <div className='buttons__wrapper'>
                    <div className='buttons__row buttons__row--1'>
                        {buttonsRow1.map(btn => {
                            return (
                                <SelectorButton key={btn} text={btn} clickButton={clickButton} playerNum={props.playerNum} />
                            )
                        })}
                    </div>
                    <div className='buttons__row buttons__row--2'>
                        {buttonsRow2.map(btn => {
                            return (
                                <SelectorButton key={btn} text={btn} clickButton={clickButton} playerNum={props.playerNum} />
                            )
                        })}
                    </div>
                    <div className='buttons__row buttons__row--reactions'>
                        <button className={`buttons__reaction buttons__reaction--emoji buttons__reaction--${props.playerNum}`} onClick={emojiClickButton}>🤔</button>
                        <button className={`buttons__reaction buttons__reaction--emoji buttons__reaction--${props.playerNum}`} onClick={emojiClickButton}>👍</button>
                        <button className={`buttons__reaction buttons__reaction--submit buttons__reaction--${props.playerNum}`} onClick={submitClick}>Submit game</button>
                    </div>
                </div>
            </div>

            <div className={`modal__wrapper modal__wrapper--${showModal}`}>
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    type={modalType}
                    myName={props.myName}
                    playerNum={props.playerNum}
                    otherPlayerNum={otherPlayerNum}
                    theirName={props.theirName}
                    time={time ? time : receivedTime}
                />
            </div>
        </div>

    )

}

export default GamePage;
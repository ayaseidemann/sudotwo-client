import './GamePage.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameBoard from '../../components/GameBoard/GameBoard';
import SelectorButton from '../../components/SelectorButton/SelectorButton';
import logo from '../../assets/sudotwo_images/logo_small@4x.png';
import leaveIcon from '../../assets/sudotwo_images/16/leave@3x.png';
import revealIcon from '../../assets/sudotwo_images/16/reveal@3x.png';
import hmmNeutralEmoji from '../../assets/sudotwo_images/20/hmm-neutral@3x.png';
import yesNeutralEmoji from '../../assets/sudotwo_images/20/yes-neutral@3x.png';
import axios from 'axios';
import Timer from '../../components/Timer/Timer';
import Modal from '../../components/Modal/Modal';
import confetti from 'canvas-confetti';

function GamePage(props) {

    const { roomId } = useParams();
    const navigate = useNavigate();

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
    const buttonsRow2 = [6, 7, 8, 9, '×'];

    const otherPlayerNum = props.playerNum === 1 ? 2 : 1;

    // get board, roomId, and solution from server json
    async function getBoard() {
        try {
            console.log('props.socket.id', props.socket.id);
            const { data: axiosGame } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/read-game/${roomId}`);
            if (props.playerNum === 1) {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/add-socket-id/${roomId}`,
                    {
                        "player1Id": props.socket.id,
                        "player2Id": props.player2Id
                    });
            }
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

            // TODO optimize this
            props.socket.emit('send-name', { roomId: roomId, sendName: props.myName });

        })
        props.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        props.socket.on("disconnect", (reason) => {
            console.log('disconnecting for this reason:', reason)
        });
        props.socket.on('disconnect', (reason) => {
            if (props.socket.id) {
                props.socket.emit('join-room', roomId);
            }
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
        // receive other user's name
        props.socket.on('receive-name', receivedName => {
            props.setTheirName(receivedName);
        });
        props.socket.on('receive-emoji', receivedEmojiBoard => {
            setEmojiBoard(receivedEmojiBoard);
        });
        props.socket.on('receive-won-game', () => {
            setShowModal(true);
            setModalType("won");
            confetti({
                particleCount: 100
            });
        });
        props.socket.on('receive-stop-timer', () => {
            setTimerRunning(false);
        });
        props.socket.on('other-disconnected', () => {
            setShowModal(true);
            setModalType("disconnect");            
            console.log('other user disconnected');
            // alert('sorry other player left, bye!');
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
    }, []);

    useEffect(() => {
        return () => {
            // props.socket.emit('user-disconnected', roomId);
            props.socket.disconnect();
            window.location.reload();
        }
    }, []);

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

    function updateTile(value) {
        const tmpBoard = [...board];
        // if the value, is now blank, make sure the corresponding emoji is deleted
        if (value === 0) {
            updateSelectedEmoji('');
        }
        // set selected tile in board to button's value
        tmpBoard[selectedTile[0]][selectedTile[1]] = value;
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

    // click handler for number or delete buttons 
    function clickButton(event) {
        if (selectedTile.length === 2) {
            const newValue = event.target.innerText === '×' ? 0 : event.target.innerText;
            updateTile(newValue);
        }
    }

    // click handler for emoji buttons
    function emojiClickButton(className) {
        updateSelectedEmoji(className);
    }

    function leaveClick(event) {
        navigate('/');
    }

    function revealClick(event) {
        if (selectedTile.length === 2 ) {
            let tmpBoard = [...board];
            tmpBoard[selectedTile[0]][selectedTile[1]] = String(solution[selectedTile[0]][selectedTile[1]]);
            setBoard(tmpBoard);
            const tmpInputBoard = [...inputBoard];
            tmpInputBoard[selectedTile[0]][selectedTile[1]] = props.playerNum + 2;
            setInputBoard(tmpInputBoard);
            // emit to socket when a change is made
            props.socket.emit('tile-change',
                {
                    roomId: roomId,
                    board: board,
                    inputBoard: inputBoard
                });
        }
    }

    function submitClick() {
        // check for no zeros/unfilled tiles
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    setShowModal(true);
                    setModalType('incomplete');
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
            if (props.playerNum === 2) {
                props.socket.emit('stop-timer', roomId);
            }
            setTimerRunning(false);
            props.socket.emit('won-game', roomId);
            setShowModal(true);
            setModalType('won');
            confetti({
                particleCount: 100
            });
        } else {
            setShowModal(true);
            setModalType('incorrect')
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
        if (event.key==='1' || event.key==='2' || event.key==='3' || event.key==='4' || event.key==='5' 
        || event.key==='6' || event.key==='7' || event.key==='8' || event.key==='9' || event.key==='Backspace') {
            if (selectedTile.length === 2) {
                const newValue = event.key === 'Backspace' ? 0 : event.key;
                updateTile(newValue);   
            } 
        }
    }

    const hideButtons = modalType === 'won' ? "buttons__wrapper--hide" : "";

    return (
        <div className='game-page__wrapper'>
            <div className='game-page' onKeyDown={fillBoard} tabIndex="0">
                <header className='game-page__header'>
                    <button className='game-page__leave' onClick={leaveClick}>
                        <img className='game-page__leave-icon' src={leaveIcon} alt='' />
                        <p className='game-page__leave-p'>Leave</p>
                    </button>
                    <div className='game-page__text'>
                        <img className='game-page__logo' src={logo} />
                        <div className='game-page__subheader'>
                            <div className='game-page__other-name'>with <span className={`game-page__subheader-span game-page__subheader-span--${otherPlayerNum}`}>{props.theirName}</span>  | </div>
                            {props.playerNum === 1 &&
                                <Timer socket={props.socket} roomId={roomId} timerRunning={timerRunning} setTime={setTime} />
                            }
                            {props.playerNum === 2 &&
                                <div className='timer'>{receivedTime}</div>
                            }
                        </div>
                    </div>
                    <button className='game-page__reveal' onClick={revealClick}>
                        <p className='game-page__reveal-p'>Reveal</p>
                        <img className='game-page__reveal-icon' src={revealIcon} alt='' />
                    </button>
                </header>
                <div className='game-page__game'>
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
                    <div className={`buttons__wrapper ${hideButtons}`}>
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
                            <button className={`buttons__reaction buttons__reaction--emoji buttons__reaction--${props.playerNum}`} onClick={() => emojiClickButton(`hmm-${props.playerNum}`)}>
                                <img className='buttons__reaction--img' src={hmmNeutralEmoji} />
                            </button>
                            <button className={`buttons__reaction buttons__reaction--emoji buttons__reaction--${props.playerNum}`} onClick={() => emojiClickButton(`yes-${props.playerNum}`)}>
                                <img className='buttons__reaction--img' src={yesNeutralEmoji} />
                            </button>
                            <button className={`buttons__reaction buttons__reaction--submit buttons__reaction--${props.playerNum}`} onClick={submitClick}>Submit game</button>
                        </div>
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
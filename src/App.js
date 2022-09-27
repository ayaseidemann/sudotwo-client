import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import JoinGame from './pages/JoinGame/JoinGame';
import CreateGame from './pages/CreateGame/CreateGame';
import WaitingRoom from './components/WaitingRoom/WaitingRoom'; 

// load socket.io client and connect to server
import { io } from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {

  // set username
  const [myName, setMyName] = useState('');
  const [theirName, setTheirName] = useState('');
  const [playerNum, setPlayerNum] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game/:roomId' element={<GamePage myName={myName} theirName={theirName} setTheirName={setTheirName} playerNum={playerNum} socket={socket}/>} />
          <Route path='/create-room' element={<CreateGame myName={myName} setMyName={setMyName} setPlayerNum={setPlayerNum} socket={socket} />} />
          <Route path='/join' element={<JoinGame myName={myName} setMyName={setMyName} setTheirName={setTheirName} setPlayerNum={setPlayerNum} socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

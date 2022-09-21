import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import JoinGame from './pages/JoinGame/JoinGame';
import CreateGame from './pages/CreateGame/CreateGame';

// load socket.io client

function App() {

  const socket = io.connect(`http://localhost:8080`);

  // set username
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game/:roomId' element={<GamePage socket={socket} username={username}/>} />
          <Route path='/create-room' element={<CreateGame socket={socket} setUsername={setUsername}/>} />
          <Route path='/join-room' element={<JoinGame socket={socket} setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

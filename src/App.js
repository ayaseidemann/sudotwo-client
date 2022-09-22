import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import JoinGame from './pages/JoinGame/JoinGame';
import CreateGame from './pages/CreateGame/CreateGame';

// load socket.io client

function App() {

  // const socket = io.connect(`http://localhost:8080`);

  // set username
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game/:roomId' element={<GamePage username={username}/>} />
          <Route path='/create-room' element={<CreateGame setUsername={setUsername}/>} />
          <Route path='/join-room' element={<JoinGame setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

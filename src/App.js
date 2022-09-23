import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import JoinGame from './pages/JoinGame/JoinGame';
import CreateGame from './pages/CreateGame/CreateGame';
import WaitingRoom from './components/WaitingRoom/WaitingRoom';

// load socket.io client

function App() {

  // set username
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game/:roomId' element={<GamePage username={username}/>} />
          <Route path='/create-room' element={
            <CreateGame 
              username={username} 
              setUsername={setUsername}
            />}
          />
          <Route path='/join-room' element={<JoinGame setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

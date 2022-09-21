import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';
import JoinGame from './pages/JoinGame/JoinGame';
import CreateGame from './pages/CreateGame/CreateGame';

// load socket.io client

function App() {
  const socket = io.connect(`http://localhost:8080`);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game/:roomId' element={<GamePage socket={socket} />} />
          <Route path='/create-room' element={<CreateGame socket={socket}/>} />
          <Route path='/join-room' element={<JoinGame socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

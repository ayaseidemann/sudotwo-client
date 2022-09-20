import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import LandingPage from './pages/LandingPage/LandingPage';
import GamePage from './pages/GamePage/GamePage';

// load socket.io client

function App() {
  const socket = io.connect(`http://localhost:8080`);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/game' element={<GamePage socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import logo from '../../assets/sudotwo_images/logo_large@3x.png'

function LandingPage() {


    let navigate = useNavigate();

    // click handler to navigate to Create Room page
    function createGameHandler(event) {
        navigate('/create-room');
    }

    // click handler to navigate to Join Room page
    function joinGameHandler(event) {
        navigate('/join');
    }

    return (
        <>
        <div className='landing__window'></div>
        <div className='landing__wrapper'>
            <div className='landing'>
                <img className='landing__logo' src={logo} />
                <h2 className='landing__subheader'>These puzzles don't stand a chance</h2>
                <SubmitButton clickButton={createGameHandler} text='Create Game' active={true} dropShadow={true}/>
                <SubmitButton clickButton={joinGameHandler} text='Join Game' active={true} dropShadow={true}/>
            </div>
        </div>
        <footer className='footer'>
            <div className='footer__credits'>
                <p className='footer__p'>Code + Art direction by @AyaSeidemann</p>
                <p className='footer__p'>Design by @ScottAlonzo</p>
                <p className='footer__p'>Sudoku API by @bertoort</p>
                <p className='footer__p footer__p--github'>View on Github</p>
            </div>
        </footer>
        </>
    )
}

export default LandingPage;
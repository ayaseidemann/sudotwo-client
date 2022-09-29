import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
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
        <div className='full-landing'>
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
                    <p className='footer__p'>Code + Art direction by <a className='footer__a' href='https://github.com/ayaseidemann' target="_blank">@AyaSeidemann</a></p>
                    <p className='footer__p'>Design by <a className='footer__a' href='https://github.com/scottalonzo' target="_blank">@ScottAlonzo</a></p>
                    <p className='footer__p'>Sudoku API by <a className='footer__a' href='https://github.com/bertoort/sugoku' target="_blank">@bertoort</a></p>
                    <p className='footer__p footer__p--github'><a className='footer__a' href='https://github.com/ayaseidemann/sudotwo-client' target="_blank">View on Github</a></p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
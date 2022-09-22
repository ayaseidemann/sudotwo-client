import './LandingPage.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';


function LandingPage() {

    let navigate = useNavigate();

    function createGameHandler(event) {
        navigate('/create-room');
    }

    function joinGameHandler(event) {
        navigate('/join-room');
    }

    return (
        <>
            <div className='landing__wrapper'>
                <div className='landing'>
                    <h1 className='landing__header'>Sudo<span className='landing__color'>two</span>!</h1>
                    <h2 className='landing__subheader'>These puzzles don't stand a chance</h2>
                    <SubmitButton clickButton={createGameHandler} text='Create Game' />
                    <SubmitButton clickButton={joinGameHandler} text='Join Game' />
                </div>
            </div>
            <footer className='landing__footer'>
                <p className='landing__credits'>Credits</p>
            </footer>
        </>
    )
}

export default LandingPage;
import './BasicHeader.scss';
import { useNavigate } from "react-router-dom";
import backIcon from '../../assets/sudotwo_images/16/back@3x.png';


function BasicHeader({ text }) {

    const navigate = useNavigate();

    function backClick() {
        navigate(-1);
    }

    return (
        <div className='basic-header__wrapper'>
            <div className='basic-header'>
                <button className='basic-header__back' onClick={backClick}>
                    <img className='basic-header__icon' src={backIcon} alt=''/>
                    <p className='basic-header__p'>Back</p>
                </button>
                <header className='basic-header__text'>{text}</header>
            </div>
        </div>
    )
}

export default BasicHeader;
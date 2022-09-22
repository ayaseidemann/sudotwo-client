import './BasicHeader.scss';
import { useNavigate } from "react-router-dom";


function BasicHeader({ text }) {

    const navigate = useNavigate();

    function backClick() {
        navigate(-1);
    }

    return (
        <div className='basic-header'>
            <button className='basic-header__back' onClick={backClick}>
                <img className='basic-header__icon' src='' alt=''/>
                Back
            </button>
            <header className='basic-header__text'>{text}</header>
        </div>
    )
}

export default BasicHeader;
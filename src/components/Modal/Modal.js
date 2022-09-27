import "./Modal.scss";
import { useState, useEffect } from 'react';
import SubmitButton from "../SubmitButton/SubmitButton";


function Modal(props) {

    const [title, setTitle] = useState('');
    const [text, setText] =  useState('');
    const [buttonText, setButtonText] = useState('');

    // set inner text based on type of modal
    useEffect(()=>{
        if (props.type === 'incomplete') {
            setTitle("Oops...");
            setText("The puzzle isn't finished yet, keep at it!");
            setButtonText("Continue toiling");
        } else if (props.type === 'incorrect') {
            setTitle("Oops...");
            setText("The puzzle is filled out but some tiles are not yet correct!");
            setButtonText("Keep trying");
        } else if (props.type === 'won') {
            setTitle(`Congrats ${props.myName}`);
            setText(`You and ${props.theirName} won the game in X time!`);
            setButtonText("Let me admire our work");
        }
    }, [props.showModal]);

    if(!props.showModal) {
        return;
    }

    // on click function to close modal
    function onClose() {
        props.setShowModal(false);
    }

    return(
        <div className="modal">
            <div className="modal__window" onClick={(e) => e.stopPropagation}>
                <h2 className="modal__title">{title}</h2>
                <p className="modal__p">{text}</p>
                <SubmitButton clickButton={onClose} text={buttonText} active='true' playerNum='0'/>
            </div>
        </div>
    )
}

export default Modal;
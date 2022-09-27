import './Timer.scss';
import { useState, useEffect } from 'react';


function Timer(props) {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        if (props.timerRunning) {
            let newSeconds;
            let newMinutes = minutes;
            if (seconds > 58) {
                newSeconds = 0;
                newMinutes = minutes + 1;
            } else {
                newSeconds = seconds + 1;
            }
            let secondsTimer = setInterval(() => {
                setSeconds(newSeconds);
                setMinutes(newMinutes);
            }, 1000);

            return () => clearInterval(secondsTimer);
        }
    }, [seconds, props.timerRunning]);

    let stringSeconds = seconds < 10 ? '0' + seconds : String(seconds);
    let stringMinutes = minutes < 10 ? '0' + minutes : String(minutes);
    let stringTime = stringMinutes + ':' + stringSeconds;

    props.socket.emit('time-change', { roomId: props.roomId, timer: stringTime })
    props.setTime(stringTime);

    return (
        <div className='timer'>{stringTime}</div>

    )

}

export default Timer;
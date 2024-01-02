import { useState, useEffect } from 'react';


function Timer(props){
    const [time, setTime] = useState(props.limitTime);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time === 0) {
            setIsTimeUp(true);
        }
    }, [time]);

    useEffect(() => {
        if (isTimeUp) {
            alert('제한 시간이 끝났습니다.');
        }
    }, [isTimeUp]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return(
        <p style={{color:'red'}}>{formatTime(time)}</p>
    )
}

export default Timer;

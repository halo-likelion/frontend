import {useState, useEffect} from 'react';

function Signed_in({setLogined, setName})
{
    useEffect(() => {
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        if (storedTokenData) {
            setLogined(true);
            const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
            setName(storedUserData.name);
            console.log("logined");
        }
        else {
            setLogined(false);
            console.log("not logined");
        }
    }, [])
}
export default Signed_in;
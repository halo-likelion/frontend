
import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";
import CustomDatepicker from "../components/CustomDatepicker";
import Results from "../components/Results";


import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


import calendar from "./Calendar.module.css";
import { set } from "date-fns";


function Calendar({ wid, hei, ITEM1, ITEM2, DAY, setDAY }) {
    const axios = require('axios').default;
    console.log(ITEM1, ITEM2);
    const [month, setMonth] = useState(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    );
    const [dayPossible, setDayPossible] = useState([]);
    const [dayClassArray, setDayClassArray] = useState([]);
    let cnt = 30;
    console.log('thatDayDay', DAY);

    const getDay = async () => {

        const regionId = ITEM1
        const machineId = ITEM2

        console.log('tell me why nothing happened', regionId, machineId);
        const response = await axios.post
            ("https://letsnongsa.store/api/reserve/possible/month",
                { regionId, machineId })

        setDayPossible(response.data);
        console.log('setdaypossible succeed!', response.data, dayPossible);
    }
    useEffect(() => { if (ITEM1 && ITEM2) return getDay }, [ITEM1, ITEM2]);

    // setDayClassArray(dayPossible.map((item)=>{
    //     if(item===0){
    //         return calendar.impossible;
    //     }else{
    //         return calendar.possible;
    //     }
    // }))

    console.log(dayClassArray);

    const onClick_impossible = () => {
        console.log("invalid click");
    }
    const onClick_possible = (event) => {
        const thatDay = event.target.value;
        setDAY(thatDay);
    }

    return (
        <div style={{ width: wid, height: hei }} className={calendar.grid}>
            <div className={calendar.day}>월</div>
            <div className={calendar.day}>화</div>
            <div className={calendar.day}>수</div>
            <div className={calendar.day}>목</div>
            <div className={calendar.day}>금</div>
            <div style={{ color: 'blue' }} className={calendar.day}>토</div>
            <div style={{ color: 'red' }} className={calendar.day}>일</div>

            <div className={calendar.impossible}>30</div>
            <div className={calendar.impossible}>31</div>
            {month.map((item, index) => {
                if (dayPossible[index] === 0) {
                    return <button
                        value={item}
                        className={calendar.impossible}
                        onClick={onClick_impossible}>{item}</button>
                } else {
                    if (DAY-1 == index) {
                        console.log(DAY,index)
                        return <button
                            value={item}
                            className={calendar.selected}
                            onClick={onClick_possible}>{item}</button>
                    }
                    else {
                        return <button
                            value={item}
                            className={calendar.possible}
                            onClick={onClick_possible}>{item}</button>
                    }
                }

            })}
            <div className={calendar.impossible}>1</div>
            <div className={calendar.impossible}>2</div>
        </div>
    )
}
export default Calendar;




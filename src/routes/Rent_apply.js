import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";
import CustomDatepicker from "../components/CustomDatepicker";
import Results from "../components/Results";
import Signed_in from "../components/Signed_in";


import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


import home from "./Home.module.css";
import button from "../components/Button.module.css";
import input from "../components/Input.module.css";
import rent from "./Rent.module.css";
import itempicker from '../../src/components/ItemPicker.module.css';

import readingGlass from "../img/readingGlass.svg";
import calendar from "../img/calendar.svg"
import num_one from "../img/num_one.svg";
import num_two from "../img/num_two.svg";
import num_three from "../img/num_three.svg";
import num_four from "../img/num_four.svg";
import num_five from "../img/num_five.svg";
import num_six from "../img/num_six.svg";
import num_seven from "../img/num_seven.svg";
import num_eight from "../img/num_eight.svg";

import check_o from '../img/check_o.svg';
import check_x from '../img/check_x.svg';
import close from '../img/closeBtn.svg';

import Calendar from "../components/Calendar";

function Rent_apply() {
    const axios = require('axios').default;
    
    // ★★★★★★로그인 로그아웃 관련★★★★★★★★
    const [logined, setLogined] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        let alerted = false;
        if (logined) {
            console.log("logined");
        }
        else {

            setTimeout(() => //알림창 띄우고 나서 navigate를 실행하는 법
            {
                alert("로그인 후 이용가능합니다!");
                navigate("/login");
            }, 100);
            // '/login'로 이동합니다.
        }
    }, [logined])


    const onClick_logout = (event) => {
        sessionStorage.clear();
        setLogined(false);
        navigate("/");
    }
    // ★★★★★★로그인 로그아웃 관련★★★★★★★★



    // ★★★★★★세션 machineData 관련★★★★★★★★
    const [storedMachineData, setStoredMachineData] = useState([]);
    // useEffect(() => {
    //     setStoredMachineData(JSON.parse(sessionStorage.getItem('machineData')));
    //     if (storedMachineData) {
    //         console.log('getting machine successed!', storedMachineData);
    //         console.log(storedMachineData)
    //     } else {
    //         console.log('getting machine failed ;(');
    //     }
    // }, [])

    // ★★★★★★세션 machineData 관련★★★★★★★★


    const [thatDay, setThatDay] = useState("");
    const [days, setDays] = useState(1);
    const [workTypeInput, setWorkTypeInput] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkedClass, setCheckedClass] = useState(check_x);
    const [modal, setModal] = useState(false);


    const [wantTime, setWantTime] = useState("");
    const [machineId, setMachineId] = useState("");
    const [workType, setWorkType] = useState("");
    const [workType0, setWorkType0] = useState("");
    const [workload, setWorkLoad] = useState("");
    const [reserveDayCnt, setReserveDayCnt] = useState("");

    const [apply, setApply] = useState(false);

    const onClick_days = (event) => {
        event.preventDefault();
        setDays(event.target.value);
    }

    const onChange_workType_input = (event) => {
        const value = event.target.value;
        if (value === "input") {
            setWorkTypeInput(false);
        } else {
            setWorkTypeInput(true);
            setWorkType(storedMachineData.type);
        }
    }

    const checkEvent = () => {
        if (checked) {
            setCheckedClass(check_x);
            setChecked(false);
        } else {
            setCheckedClass(check_o);
            setChecked(true);
        }
    }
    const onClick_back = () => {
        navigate("/");
    }


    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const onSubmit = (event) => {

    }








    const onClick_apply = () => {
        if (apply) {
            setApply(false);
        } else {
            setApply(true);
        }
    }
    const Submit = async () => {
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        try {
            console.log(wantTime, machineId, workType, workload, reserveDayCnt)
            const response = await axios.post('/reserve', {
                wantTime,
                machineId,
                workType,
                workload,
                reserveDayCnt,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${storedTokenData.accessToken}`
                    }
                })
            console.log(response.data);
            window.alert("임대 신청이 성공적으로 완료되었습니다");
            sessionStorage.removeItem('machineData');
            window.location.href = "/rent_list";
        } catch (error) {
            console.log('submit fail ;(', error)
        }

    }
    useEffect(() => { return Submit }, [apply])
    console.log('thatDay', thatDay)
    return (
        <div>
            <Signed_in
                setLogined={setLogined}
                setName={setName}
            />
            
            <header>
                <div className={home.font0}>전국 농기계 임대 예약사업</div>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className={home.lets}> 🚜렛츠농사 </div>
                </Link>
                <br></br>
            </header>

            {logined &&
                <div className={home.nav}>
                    <div className={home.nav1}>
                        <h4 style={{ color: "white", marginRight: '4px' }}>
                            <span style={{ color: "yellow" }}>{name}</span>
                            님 환영합니다.
                        </h4>
                        <Link to="/rent_list"
                            style={{
                                textDecoration: "none",
                                cursor: "pointer"
                            }}>
                            <Button className={home.nav_btn} text="임대내역"></Button>
                        </Link>

                        <Link to="/revise_info"
                            style={{
                                textDecoration: "none",
                                cursor: "pointer"
                            }}>
                            <Button className={home.nav_btn} text="정보수정"></Button>
                        </Link>
                        <Button
                            className={home.nav_btn}
                            text="로그아웃"
                            onClick={onClick_logout}>
                        </Button>
                    </div>
                </div>
            }

            <form onSubmit={onSubmit} className={rent.main1}>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_one} className={rent.number}></img>
                        <p>임대기종</p>
                    </div>
                    <div className={rent.item_box1}>
                        <p >기종명 : {storedMachineData.type} (농업용{storedMachineData.type})</p>
                    </div>

                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_two}></img>
                        <p>임대일</p>
                    </div>
                    <div className={rent.item_box2}>
                        <p>임대시작일 : </p>
                        {storedMachineData.wantTime}
                        <select name="reserveDayCnt" onClick={onClick_days} className={rent.select_2}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <p>일 (최대 임대 일수 : 3일) </p>
                    </div>
                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_three}></img>
                        <p>임대료</p>
                    </div>
                    <div className={rent.item_box3}>
                        <p >임대료 {storedMachineData.price} x {days}일 = {storedMachineData.price * days}원</p>
                    </div>

                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_four}></img>
                        <p>예약일 선택</p>
                    </div>



                    <Calendar wid='280px' hei='300px'
                        ITEM1={storedMachineData.regionId}
                        ITEM2={storedMachineData.machineId}
                        DAY={thatDay} setDAY={setThatDay}
                    ></Calendar>


                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_five}></img>
                        <p>작업종류</p>
                    </div>
                    <div className={rent.item_box5}>
                        <select name="workType" onChange={onChange_workType_input}
                            className={rent.select_5}>
                            <option
                                value="input">
                                직접 입력
                            </option>
                            <option value={storedMachineData.type}>
                                {storedMachineData.type}
                            </option>
                        </select>
                        <Input name="workType_input" disabled={workTypeInput}
                            className={rent.input_5}></Input>
                    </div>
                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_six}></img>
                        <p>작업량</p>
                    </div>
                    <div className={rent.item_box6}>
                        <Input name="workload" className={rent.input_6}></Input>
                        <div className={rent.distan}>제곱미터㎡</div>
                    </div>
                </div>
                <div className={rent.itemBox_use}>
                    <div className={rent.bluebar}>
                        <img src={num_seven}></img>
                        <p>사용조건 및 준수사항</p>
                    </div>
                    <p className={rent.item_box7}>
                        · 임차인은 농기계를 내 것처럼 아껴서 사용한다.
                        <br />· 사용 후 보관 시 깨끗이 세척한 후 안전한 창고 내에 보관한다. (1일 이상 사용할 때)
                        <br />· 임차 후 발생한 고장수리비는 임차인이 부담한다.
                        <br />· 운전미숙, 부주의 등 임차인 과실로 발생한 고장은 임차인이 책임 수리한다.
                        <br />· 임대기간 중 소모되는 연료비는 임차인이 부담한다.
                        <br />· 임차인이 농기계의 운반 및 사용 중 발생한 사고에 대해서는 민•형사상의 모든 책임을 진다.
                        <br />· 사용 중 농기계를 분실 또는 파손하였을 때에는 임차인이 보상한다.
                        <br />· 임대기간 만료시에는 깨끗이 세척한 후 지체없이 반납한다.
                        <br />· 임대기간 중 농기계의 유지, 보수 및 기본 운영에 필요한 소요경비(수리비, 연료비, 농작업상해공제 등)는 임차인이 부담한다.
                        <br />· 안전사고에 대비하여 임차인은 임대농기계를 대상으로 농기계종합공제에 의무적으로 가입하여야 한다.(별도 안전사고 부담 각서 제출)
                    </p>
                    <label className={rent.label} htmlFor="check">
                        <img src={checkedClass} className={rent.checked}></img>
                        <Input
                            id="check" type="checkbox"
                            checked={checked}
                            onChange={checkEvent}
                            style={{ display: "none" }}
                        />
                        <p className={rent.agreement}>동의합니다</p>
                    </label>
                </div>
                <div className={rent.itemBox}>
                    <div className={rent.bluebar}>
                        <img src={num_eight}></img>
                        <p>추가정보</p>
                    </div>
                    <div className={rent.item_box8}>
                        <label htmlFor="model">
                            1. 모델명 :
                            <Input id="model" name="model" style={{ border: 'none' }}></Input>
                        </label>
                        <label htmlFor="horsepower">
                            2. 마력 :
                            <Input id="horsepower" name="horsepower" style={{ border: 'none' }}></Input>
                        </label>
                        <label htmlFor="year">
                            3. 구입년식 :
                            <Input id="year" name="year" style={{ border: 'none' }}></Input>
                        </label>
                        <label htmlFor="joint">
                            4. 조인트 :
                            <Input id="joint" name="joint" style={{ border: 'none' }}></Input>
                        </label>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        text="임대신청" onClick={openModal}
                        className={rent.apply_btn}></Button>
                    <Button
                        type="button"
                        text="취소" onClick={onClick_back}
                        className={rent.back_btn}></Button>
                </div>

                {modal &&
                    <div className={itempicker.modal_reserve}>
                        <img src={close} onClick={closeModal}
                            className={rent.closebtn}></img>

                        <div className={itempicker.title_reserve}>
                            <div className={itempicker.title_show}>
                                <p className={rent.title}>{storedMachineData.type}</p>
                                <p className={rent.title}>임대 신청</p>
                                <div className={rent.line}></div>
                            </div>

                            <p className={rent.ask}>
                                <span style={{ color: '#062C7F' }}>
                                    {storedMachineData.type}</span>을(를)
                                <br></br>
                                임대 신청 하시겠습니까?</p>
                        </div>
                        <div className={rent.check_btn}>
                            <Button type="button" text="확인"
                                className={rent.yes} onClick={onClick_apply}></Button>
                            <Button text="취소" onClick={closeModal}
                                className={rent.no}></Button>
                        </div>
                    </div>}

            </form >
        </div >

    )
}
export default Rent_apply
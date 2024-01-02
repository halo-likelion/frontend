
import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import home from "./Home.module.css";
import button from "../components/Button.module.css";
import input from "../components/Input.module.css";
import auth from "./Auth.module.css";

import readingGlass from "../img/readingGlass.svg";
import calendar from "../img/calendar.svg"


function Auth_machine() {
    const axios = require('axios').default;
    
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const regionId = storedUserData.loginId;
    const dividedList = [];
    const btnIndex = [];

    const ADMINURL = `https://letsnongsa.store/api/admin/machine/list/${regionId}`;
    const DELMACHINE = `https://letsnongsa.store/api/agriculture/delete/{id}`


    const [page, setPage] = useState(1);
    const [entirePage, setEntirePage] = useState(0);
    const [minusBtn, setMinusBtn] = useState(true);
    const [plusBtn, setPlusBtn] = useState(false);
    const [btnClass, setBtnClass] = useState(button.list_num);
    const [machineList, setMachineList] = useState([]);

    const callList = async () => {
        const response = await axios.get(ADMINURL, { params: { regionId } });
        setMachineList(response.data);
    }
    
    useEffect(callList, []);

    useEffect(() => {
        if (page <= 1) {
            setMinusBtn(true);
        } else {
            setMinusBtn(false);
        }

        if (page >= entirePage) {
            setPlusBtn(true);
        } else {
            setPlusBtn(false);
        }
    }, [page]
    )


    for (let i = 0; i < machineList.length; i += 5) {
        dividedList.push(machineList.slice(i, i + 5));
        setEntirePage(entirePage + 1);
        btnIndex.push(entirePage);
        console.log(entirePage);
    }


    const onClick_plus = () => {
        setPage(page + 1);
    }
    const onClick_minus = () => {
        setPage(page - 1);
    }
    const onClick_num = (event) => {
        event.preventdefault();
        const num = event.target.value;
        setPage(num);
    }
    const onClick_del = async (event) => {
        const machine=event.target.value;
        const id = machine.machineId;

        const answer = window.confirm(
            `Do you really want to delete 
            the machine 
            type : ${machine.type}, 
            ID : ${machine.id} ?`
            )
        if (answer){
            await axios.delete(DELMACHINE, { params: { id } });

            window.alert(
                `The machine 
                type : ${machine.type}, 
                ID : ${machine.id} ?
                has been successfully deleted.`
                );
            console.log("The item has been deleted");
            callList();

        } else{
            console.log("The item has not been deleted");
        }        
    }
    const onClick_callAgain = () => {
        callList();
    }


    return (
        <div>
            <header>
                <div>
                    <div className={home.font0}>전국 농기계 임대 예약사업</div>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className={home.lets}> 🚜렛츠농사 </div>
                    </Link>
                    <br></br>
                </div>

                <div>
                    <p className={auth.company}>가평군 농기계임대사업소</p>
                    <p className={auth.author_text}>
                        관리자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;김관리
                    </p>
                </div>
            </header>
            <nav>
                <Link to="/auth_home" style={{ textDecoration: "none" }}>
                    <Button text="선택 페이지로"></Button>
                </Link>
                <Link to="/auth_machine_add" style={{ textDecoration: "none" }}>
                    <Button text="농기계 추가하기"></Button>
                </Link>
                <Link to="/auth_machine_revise/:type" style={{ textDecoration: "none" }}>
                    <Button text="기계 종류 편집"></Button>
                </Link>
                <Button text="농기계 식별 번호"></Button>
                <Input
                    id="reservation_number"
                    type="number"
                    name="reservation_number"
                    className={input.search_tool}
                />
                <img src={readingGlass} className={home.readingGlass}></img>
            </nav>
            <main>
                <ul>
                    <li>
                        <div>농기계 식별 번호</div>
                        <div>기계 종류</div>
                        <div>부속장비</div>
                        <div>태그</div>
                        <div>담당자명</div>
                        <div>상태</div>
                        <div>비고</div>
                    </li>
                    {dividedList[page].map((item) => {
                        <li key={item.id}>
                            <div>{item.id}</div>
                            <div>{item.type}</div>
                            <div>{item.price}</div>
                            <div>{item.tag}</div>
                            <div>{item.content}</div>
                            <div>{item.reservePossible}</div>
                            <div>{item.tag}</div>
                            <div>
                                <Button
                                    text="삭제"
                                    onClick={onClick_del}
                                    value={item}>
                                </Button>
                            </div>
                        </li>
                    })}
                </ul>
                <Button text="변경 확인" onClick={onClick_callAgain}></Button>
                <Button text="◀" onClick={onClick_minus} disabled={minusBtn}></Button>
                {btnIndex.map((index) => {
                    if (index === page) {
                        setBtnClass(button.line_num_selected);
                    } else {
                        setBtnClass(button.line_num);
                    }
                    return (
                        <Button
                            text={index}
                            className={btnClass}
                            onClick={onClick_num}
                            value={index}
                        ></Button>
                    )
                })}
                <Button text="▶" onClick={onClick_plus} disabled={plusBtn}></Button>
            </main>
        </div>
    )
}
export default Auth_machine;
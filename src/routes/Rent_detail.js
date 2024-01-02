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


function Rent_detail() {
    const axios = require('axios').default;

    
    // ★★★★★★로그인 로그아웃 관련★★★★★★★★
    const [logined, setLogined] = useState(false);
    const [name, setName] = useState("");
    const [reservationClass, setReservationClass] = useState();

    const navigate = useNavigate();

   

    useEffect(() => {
        let alerted = false;
        if (logined) {
            console.log("logined");
        }
        else {
            
            setTimeout(()=> //알림창 띄우고 나서 navigate를 실행하는 법
            {
                alert("로그인 후 이용가능합니다!");
                navigate("/login");
            },100);
                  // '/login'로 이동합니다.
        }
    }, [logined])
    const onClick_logout = (event) => {
        sessionStorage.clear();
        setLogined(false);
        window.location.href = "/";
    }
    // ★★★★★★로그인 로그아웃 관련★★★★★★★★

    // ★★★★★★이미지 호출 관련★★★★★★★★
    const storedDetailData = JSON.parse(sessionStorage.getItem('reserveDetailData'));
    console.log(storedDetailData);
    const [imageUrl, setImageUrl] = useState("");
    const getImage = async () => {
        const id = storedDetailData.machineId;
        const MACHINEID = `https://letsnongsa.store/api/agriculture/${id}`
        const response = await axios.get(MACHINEID, { params: { id } });
        console.log(response.data);
        setImageUrl(response.data.imageUrl);
    }
    useEffect(() => { return getImage }, [])
    // ★★★★★★이미지 호출 관련★★★★★★★★

    const onClick_delete = async () => {
        const answer = window.confirm(
            `   예약번호 : ${storedDetailData.reservationId} 기계명 : ${storedDetailData.machineType}
            을(를) 정말로 취소하시겠습니까?`);

        const reservationId = storedDetailData.reservationId;
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        console.log(storedTokenData.accessToken);
        const DELETEURL = `https://letsnongsa.store/api/reserve/cancel/${reservationId}`
        if (answer) {
            try {
                const response = await axios.put(DELETEURL, {}, {
                    headers: {
                        'Authorization': `Bearer ${storedTokenData.accessToken}`,
                    }
                })
                console.log('canceled success! : ', response.data);
                window.alert("해당 예약을 성공적으로 취소되었습니다.")
                window.location.href = "/rent_list";
            } catch (error) {
                console.log('canceled failed ;(', error);
            }
        } else {
            console.log('cancel cancel');
        }
    }

    const onClick_back = () => {
        sessionStorage.removeItem('reserveDetailData');
        window.location.href = "/rent_list";
    }
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
            <div className={rent.reservation_list}>장비임대내역</div>

            <div>
                <div>
                    <div>임대장비</div>
                    <img src={imageUrl} alt="기계사진"></img>
                    <div>· 장비명 : {storedDetailData.machineType}농업용({storedDetailData.machineType})</div>
                    <div>· 출고 및 입고 위치 : 가평농업기술센터</div>
                </div>
                <div>
                    <div>예약 번호</div>
                    <div>{storedDetailData.reservationId}</div>
                </div>
                <div>
                    <div>예약 신청일자</div>
                    <div>{storedDetailData.createdAt.slice(0, 10)}, {storedDetailData.createdAt.slice(11, 19)}</div>
                </div>
                <div>
                    <div>임대 날짜</div>
                    <div>{storedDetailData.wantTime.slice(0, 10)}</div>
                </div>
                <div>
                    <div>예약 기간</div>
                    <div>{storedDetailData.reserveDayCnt}</div>
                </div>
                <div>
                    <div>임대 진행 상황</div>
                    <div>storedDetailData.reservationStatus로 확인</div>
                </div>
            </div>

            <div>
                <Button text="예약취소" onClick={onClick_delete}></Button>
                <Button text="목록" onClick={onClick_back}></Button>
            </div>
        </div>
    )
}
export default Rent_detail
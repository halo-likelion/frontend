import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";
import CustomDatepicker from "../components/CustomDatepicker";
import Results from "../components/Results";
import Signed_in from "../components/Signed_in";


import { Link,useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


import home from "./Home.module.css";
import button from "../components/Button.module.css";
import input from "../components/Input.module.css";
import rent from "./Rent.module.css";


function Rent_list() {
    const axios = require('axios').default;

    
    // ★★★★★★로그인 관련★★★★★★★★
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
    // ★★★★★★로그인 관련★★★★★★★★

    const RENTURL = "https://letsnongsa.store/api/reserve/list"

    const [reserveList, setReserveList] = useState([])
    const [reserveDetailList, setReserveDetailList] = useState([])

    const getList= async () => {
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        try {
            const response = await axios.get(RENTURL, {
                headers: {
                    'Authorization': `Bearer ${storedTokenData.accessToken}`
                }
            })
            setReserveList(response.data)
            console.log(storedTokenData.accessToken);
            console.log('successful reserveList', response.data)
            console.log('ReserveList : ', reserveList)
        } catch (error) {
            console.log(storedTokenData.accessToken);
            console.log('fail reserveList:', error)
        }
    };

    useEffect(()=>{ return getList },[]);   //destroy나 create오류 뜰 때 해볼 것



    const onClick_detail = async (event) => {
        const reservationId = event.target.value;
        const RENTDETAILURL = `https://letsnongsa.store/api/reserve/list-specific/${reservationId}`
            const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
            try {
                const response = await axios.get(RENTDETAILURL, {
                    headers: {
                        'Authorization': `Bearer ${storedTokenData.accessToken}`
                    }
                })
                setReserveDetailList(response.data);
                console.log(response.data);
                const reserveDetailData = {
                    machineType : response.data.machineType,
                    wantTime: response.data.wantTime,
                    createdAt: response.data.createdAt,
                    machineId: response.data.machineId,
                    price: response.data.price,
                    reservationStatus: response.data.reservationStatus,
                    depoist: response.data.deposit,
                    region: response.data.region,
                    reservationId: response.data.reservationId,
                    name: response.data.name,
                    reserveDayCnt:response.data.reserveDayCnt

                }
                sessionStorage.setItem('reserveDetailData', JSON.stringify(reserveDetailData))
                console.log('getting detail succeed!');
                window.location.href=`/rent_detail/${reservationId}`
            } catch (error) {
                console.log('getting detail failed ;(', error);
            }

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

            
            <p>예약건수 | 총<span style={{ color: 'red' }}>{reserveList.length}</span>건</p>
            {reserveList.map((item, index) => {
                return(<div>
                    <div>{index + 1}</div>
                    <div>예약 신청일자 : {item.createdAt.slice(0,10)}</div>
                    <div>임대장비 : {item.type}(농업용{item.type})
                        <br></br>
                        <Button text="상세보기" 
                        value={item.reservationId}
                        onClick={onClick_detail}></Button>
                    </div>
                    <div>임대 시작일자 : {item.wantTime.slice(0, 10)}</div>
                    <div>임대 종료일자 : {item.endTime.slice(0, 10)}</div>
                    <p>임대료 : {Math.floor(item.price / 1000)},{item.price % 1000}원</p>
                    <p className={reservationClass}>{item.reservationStatus}예약중</p>
                    <div>두줄</div>
                </div>
                )
            })}

        </div>

    )
}
export default Rent_list

import Button from "./Button";

import { useState, useEffect, useRef } from "react";

import home from "../routes/Home.module.css";
import results from "./Results.module.css";

import Calendar from "./Calendar";

import sheet from "../img/sheet.svg"
import closeBtn from "../img/closeBtn.svg";


function Results_detail({ item, Item3, detailOpen, setDetailOpen }) {
    const axios = require('axios').default;
    
    // ★★★★★★이미지 호출 관련★★★★★★★★
    const [imageUrl, setImageUrl] = useState("");
    const getImage = async () => {
        const id = item.machineId;
        const MACHINEID = `https://letsnongsa.store/api/agriculture/${id}`
        const response = await axios.get(MACHINEID, { params: { id } });
        console.log(response.data);
        setImageUrl(response.data.imageUrl);
    }
    useEffect(() => { return getImage }, [])
    // ★★★★★★이미지 호출 관련★★★★★★★★

    const [thatDay,setThatDay] = useState("");
    const [moreDetail, setMoreDetail] = useState(false);
    const onClick_moreDetail = (event) => {
        event.preventDefault();
        setMoreDetail(true);
    }
    const close_moreDetail = () => {
        setMoreDetail(false);
    }

    const closeDetail = () => {
        setDetailOpen(false);
    }
    const onClick_apply = () => {
        const machineData = {
            type: item.type,
            wantTime: item.wantTime,
            price: item.price,
            regionId:item.regionId,
            machineId:item.machineId
        }
        sessionStorage.setItem('machineData', JSON.stringify(machineData));
        console.log('machiine data successfully saved!',machineData);
        window.location.href = "./rent_apply"
    }


    return (
        <div className={results.main2}>
            <div className={results.bluebar}></div>
            <div className={results.item3}>
                임대사업소 : 가평군농업기술센터</div>
            <div className={results.body}>
                <img src={imageUrl} className={results.img2}></img>
                <div className={results.detail_body}>
                    <p className={results.type}>농업용{item.type}</p>
                    <p className={results.content1}>{item.content}</p>
                    <div className={results.price}>
                        <p className={results.table}>임대료(일 기준)</p>
                        <p className={results.table}
                            style={{ color: 'red' }}>
                            {Math.floor(item.price / 1000)},{item.price % 1000}</p>
                    </div>
                    <Button text="자세히 보기"
                        onClick={onClick_moreDetail}
                        className={results.more_detail_btn}>
                    </Button>
                    {moreDetail &&
                        <div className={results.moreDetail}>
                            <img
                                src={closeBtn}
                                onClick={close_moreDetail}
                                className={results.closeBtn}
                            ></img>
                            <div className={results.moreDetail_box}>
                                <p className={results.type2}>{item.type}</p>
                                <div className={results.line}></div>
                                <img src={imageUrl}
                                    className={results.img3}
                                ></img>
                                <div className={results.line}></div>
                                <div className={results.content3}>
                                    <span style={{color:'#0A559F'}}>· 일일 임대 1회 가능</span>
                                    <span style={{color:'red'}}>· 임대 가능 일수 : 3일</span>
                                    <br></br>
                                    {item.content}
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
            <div className={home.calendar}>

            </div>

            <div>
                <Calendar wid='280px' hei='220px' 
                ITEM1={item.regionId}
                ITEM2={item.machineId}
                DAY={thatDay} setDAY={setThatDay}></Calendar>
            </div>

            <Button text="임대신청"
                className={results.apply_btn}
                onClick={onClick_apply}
            ></Button>
            <Button
                text="뒤로가기"
                className={results.back_btn}
                onClick={closeDetail}
            ></Button>
        </div>
    )
}



function Results({ machineList, Item3 }) {

    // const [detail, setDetail] = useState(Array(machineList.length).fill(false));
    //배열 채우기
    const [detailOpen, setDetailOpen] = useState(false);
    const [detail_index, setDetail_index] = useState(null);



    console.log(machineList);
    const onClick_detail = (value) => (event) => {
        //div에서 클릭으로 value값 받기
        event.preventDefault();
        setDetail_index(value);
        console.log('detail_index', detail_index);
        setDetailOpen(true);
    }

    useEffect(() => {
        setDetailOpen(false);
    }, [machineList])
    // 상위 컴포넌트에서 어떤값이 변하는지 잘 체크


    return (
        <div className={results.main1}>
            <div className={results.search_num}>
                <img src={sheet}></img>
                <p>검색건수 | 총<span style={{ color: 'red' }}>{machineList.length}</span>건</p>
            </div>
            <main>
                {!detailOpen
                    ? <div>
                        {machineList.map((item, index) => {
                            return (
                                <div key={item.reservationId}>
                                    <div onClick={onClick_detail(index)}
                                        className={results.item}>
                                        <img src={item.imageUrl}
                                            alt="machine_img"
                                            className={results.photo1}></img>
                                        <p className={results.type1}>{item.type}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : <Results_detail
                        item={machineList[detail_index]}
                        Item3={Item3}
                        detailOpen={detailOpen}
                        setDetailOpen={setDetailOpen}
                    >
                    </Results_detail>
                }
            </main>
        </div>
    )
}
export default Results;

import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";
import CustomDatepicker from "../components/CustomDatepicker";
import Results from "../components/Results";


import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import home from "./Home.module.css";
import button from "../components/Button.module.css";
import input from "../components/Input.module.css";




function Home() {
  const axios = require('axios').default;
  const SEARCHURL = "https://letsnongsa.store/api/agriculture/search";

  // ★★★★★★로그인 로그아웃 관련★★★★★★★★
  const [logined, setLogined] = useState(false);
  const [name, setName] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

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
  }, [logined])

  const onClick_logout = (event) => {
    sessionStorage.clear();
    setLogined(false);
    window.location.href = "/";
  }
  // ★★★★★★로그인 로그아웃 관련★★★★★★★★

  const [Item1, setItem1] = useState("");
  const [Item2, setItem2] = useState("");
  const [btn2, setBtn2] = useState(true);
  const [Item3, setItem3] = useState("");
  const [btn3, setBtn3] = useState(true);
  const [Item4, setItem4] = useState("");
  const [Item5, setItem5] = useState("");

  const [ItemTag,setItemTag] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [stringDate, setStringDate] = useState("");

  const [results, setResults] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [machineList, setMachineList] = useState([]);

  const [region1, setRegion1] = useState(null);
  const [region2, setRegion2] = useState(null);
  const [region3, setRegion3] = useState(null);
  const [tagValue, settagValue] = useState(null);
  const [machineType, setMachineType] = useState(null);
  const [wantTime, setWantTime] = useState("");


  const array_region1 = [
    "경기도",
    "서울특별시(예정중)",
    "부산광역시(예정중)",
    "대구광역시(예정중)",
    "인천광역시(예정중)",
    "광주광역시(예정중)",
    "대전광역시(예정중)",
    "울산광역시(예정중)",
    "세종특별자치시(예정중)",
    "강원특별자치도(예정중)",
    "충청북도(예정중)",
    "충청남도(예정중)",
    "전라북도(예정중)",
    "전라남도(예정중)",
    "경상북도(예정중)",
    "경상남도(예정중)",
    "제주특별자치도(예정중)",

  ];

  const array_region2 = [
    "가평군",
    "수원시",
    "성남시",
    "의정부시",
    "안양시",
    "부천시",
    "광명시",
    "동두천시",
    "평택시",
    "안산시",
    "고양시",
    "과천시",
    "구리시",
    "남양주시",
    "오산시",
    "시흥시",
    "군포시",
    "의왕시",
    "하남시",
    "용인시",
    "파주시",
    "이천시",
    "안성시",
    "김포시",
    "화성시",
    "광주시",
    "양주시",
    "포천시",
    "여주시",
    "연천군",
    "양평군",
  ];

  const array_region3 = ["가평군농업기술센터", "해당없음"];
  const array_machine = [
    "트랙터",
    "경운기",
    "관리기",
    "돌수집기",
    "땅속작물수확기",
    "벼수확기",
    "이양작업기",
    "자주형파종기",
    "탈곡기",
    "해당없음",
  ];

  const array_equipment = ["(장착 가능한 부속장비가 없습니다.)"];



  const onReset = (event) => {
    setItem1("");
    setItem2("");
    setItem3("");
    setItem4("");
    setItem5("");
    setResults(false);
  };

  const getCurrent = () => {
    const date = new Date();
    const years = date.getFullYear();
    const months = String(date.getMonth() + 1).padStart(2, "0");
    const days = String(date.getDate()).padStart(2, "0");
    return `${years}-${months}-${days}`;
  }

  const onChange=(event)=>{
    event.preventDefault();
    setItemTag(event.target.value);
  }

  const onChange_date = (date) => {
    const current_date = new Date();
    if (current_date < date) {
      setStartDate(date);
    }
    else {
      console.log("date failed");
      window.alert("금일 이후로 신청바랍니다.")
    }

  };

  useEffect(() => {
    const years = startDate.getFullYear();
    const months = String(startDate.getMonth() + 1).padStart(2, "0");
    const days = String(startDate.getDate()).padStart(2, "0");
    const newStringDate = `${years}-${months}-${days}`;
    setStringDate(newStringDate);
  }, [startDate])

  useEffect(() => {
    console.log(stringDate);
  }, [stringDate]);

  useEffect(() => {
    if (Item1) {
      setBtn2(false);
      if (Item2) {
        setBtn3(false);
      } else {
        setBtn3(true);
      }
    }
    else {
      setBtn2(true);
      setBtn3(true);
    }

  }, [Item1, Item2, Item3])

  //form data 안전하게 axios 송신하는 법 => 이중변수 활용 ★★★★★★★
  useEffect(() => {
    setRegion1(Item1);
    setRegion2(Item2);
    setRegion3(Item3 || null);
    settagValue(ItemTag || null);
    setMachineType(Item5 || null);
    setWantTime(stringDate ? `${stringDate}T00:00:00` : null);
  }, [Item1, Item2, Item3, ItemTag, Item5, stringDate])

  const onSubmit = async (event) => {
    event.preventDefault();

    setResults(false);
    setResults(true); 
    setNoResults(false);

    try {
      const response = await axios.post(SEARCHURL, {
        region1,
        region2,
        region3,
        tagValue,
        machineType,
        wantTime,
      });

      if (response.data) {
        console.log("datas are existed");
        setResults(true);
        setMachineList(response.data);
        setNoResults(false);
        console.log(response.data)
        console.log(machineList);
      }
      else {
        console.log("datas are not existed");
        setNoResults(true);
      }

    } catch (error) {
      console.log(error);
      console.log("fetch failed");
      setResults(false);
      setNoResults(true);
    }
  };

  useEffect(() => {
    console.log(
      region1,
      region2,
      region3,
      tagValue,
      machineType,
      wantTime,
      'values successed!');
  }, [region1, region2, region3, tagValue, machineType, wantTime])

  return (
    <div>
      <header>
        <div className={home.font0}>전국 농기계 임대 예약사업</div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={home.lets}> 🚜렛츠농사 </div>
        </Link>
        <br></br>
      </header>

      {!logined
        ? <div className={home.nav}>
          <div className={home.nav1}>
            <Link to="/login"
              style={{
                textDecoration: "none",
                cursor: "pointer"
              }}>
              <h4 style={{ color: "white" }}>로그인하기</h4>
            </Link>
            <h4 style={{ marginRight: "5px", marginLeft: "5px" }}>/</h4>
            <Link to="/sign_up" style={{ textDecoration: "none" }}>
              <h4 style={{ color: "white" }}>회원가입하기</h4>
            </Link>
          </div>
        </div>

        : <div className={home.nav}>
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
      <div className={home.apply_search}>임대신청 통합검색</div>

      <div className={home.input_tab}>
        {!logined &&
          <div className={home.limit_box}>
            <p>로그인 후 이용가능합니다</p>
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Button
                className={home.login_btn}
                text="로그인 하기"
              />
            </Link>
          </div>
        }
        <h2 className={home.label_ps}>검색 조건</h2>

        <form onSubmit={onSubmit}>
          <div className={home.forms}>
            <div className={home.titles}>
              <p className={home.title}>지역</p>
              <p className={home.required}>* 필수 입력</p>
            </div>

            <div className={home.datas}>
              <div className={home.input_required}>
                <Input
                  id={input.input}
                  type="text"
                  name="region1"
                  placeholder={showPlaceholder ? "특별시/광역시/도" : ""}
                  value={Item1 || ""}
                  readOnly
                  required
                />
                <ItemPicker
                  Array_id={1}
                  itemArray={array_region1}
                  Item={Item1}
                  setItem={setItem1}
                  showPlaceholder={showPlaceholder}
                  setShowPlaceholder={setShowPlaceholder}
                ></ItemPicker>
              </div>
              <p className={home.required}>*필수 입력 항목입니다</p>

              <div className={home.input_required}>
                <Input
                  id={input.input}
                  type="text"
                  name="region2"
                  placeholder={showPlaceholder ? "시/군/구" : ""}
                  value={Item2 || ""}
                  readOnly
                  required
                />
                <ItemPicker
                  Array_id={2}
                  itemArray={array_region2}
                  Item={Item2}
                  setItem={setItem2}
                  disabled={btn2}
                  showPlaceholder={showPlaceholder}
                  setShowPlaceholder={setShowPlaceholder}
                ></ItemPicker>
              </div>
              <p className={home.required}>*필수 입력 항목입니다</p>

              <div className={home.input_required}>
                <Input
                  id={input.input}
                  type="text"
                  name="region3"
                  //placeholder={showPlaceholder ? "임대사업소" : ""}
                  placeholder="임대사업소"
                  value={Item3 === null ? "" : Item3}
                  readOnly
                />
                <ItemPicker
                  Array_id={3}
                  itemArray={array_region3}
                  Item={Item3}
                  setItem={setItem3}
                  disabled={btn3}
                  showPlaceholder={showPlaceholder}
                  setShowPlaceholder={setShowPlaceholder}
                ></ItemPicker>
                <br></br>
              </div>
            </div>

            <div className={home.titles}>
              <p className={home.title}>농기계</p>
            </div>


            <div className={home.datas}>
              <div className={home.input_search}>
                <Input
                  id={input.search}
                  type="text"

                  onChange={onChange}


                  name="tagValue"
                  placeholder="*예시1)감자, 예시2) 트랙터"
                  className={input.search_tool}
                />


                <br></br>
              </div>

              <div className={home.input}>
                <Input
                  id={input.input}
                  type="text"
                  name="machineType"
                  placeholder="동력기 및 작업기"
                  value={Item4 || ""}
                  readOnly
                  required
                />
                <ItemPicker
                  Array_id={4}
                  itemArray={array_machine}
                  Item={Item4}
                  setItem={setItem4}
                  showPlaceholder={showPlaceholder}
                  setShowPlaceholder={setShowPlaceholder}
                ></ItemPicker>
                <br></br>
              </div>

              <div className={home.input}>
                <Input
                  id={input.input}
                  type="text"
                  name="equipment"
                  placeholder={showPlaceholder ? "부속 장비" : ""}
                  readOnly
                  required
                />
                <ItemPicker
                  Array_id={5}
                  itemArray={array_equipment}
                  Item={Item5}
                  setItem={setItem5}
                  showPlaceholder={showPlaceholder}
                  setShowPlaceholder={setShowPlaceholder}
                ></ItemPicker>
                <br></br>
              </div>
            </div>

            <div className={home.titles}>
              <p className={home.title}>
                예약
                <br />
                날짜
              </p>
            </div>

            <div className={home.datas}>
              <div className={home.date1}>시작 날짜</div>
              <div className={home.date_up}>
                
                  <Input
                    id={home.input_date}
                    value={stringDate}
                    type="text"
                    name="wantTime"
                    placeholder={getCurrent()}
                    required
                    readOnly
                  />
                  <DatePicker
                    className={home.calendar}
                    selected={startDate}
                    onChange={onChange_date}
                    customInput={<CustomDatepicker />}
                    style={{
                      gridColumns: '2/4',
                      gridRows: '4/5',
                    }}
                  />
                

              </div>

              <div className={home.date2}>예약 희망 기간</div>
              <select name="dayCnt" className={input.date2}>
                <option value='1'>1일</option>
                <option value='2'>2일</option>
                <option value='3'>3일</option>
              </select>
            </div>
          </div>

          {
            noResults &&
            <p className={home.impossible}>※예약 가능한 기계가 없습니다!</p>
          }
          <Button type="submit" text="검색하기" className={button.search} />
          <br></br>

          <Button
            onClick={onReset}
            type="reset"
            text="초기화"
            className={button.reset}
          />
          <br></br>
        </form>
      </div>

      {
        results &&
        <Results
          machineList={machineList}
          Item3={Item3}
          >
        </Results>
      }
    </div>
  );
}
export default Home;

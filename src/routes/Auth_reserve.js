import Input from '../components/Input';
import Button from '../components/Button';
import ItemPicker from '../components/ItemPicker';

import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import home from './Home.module.css';
import button from '../components/Button.module.css';
import input from '../components/Input.module.css';
import auth from './Auth.module.css';

import readingGlass from '../img/readingGlass.svg';
import calendar from '../img/calendar.svg';


function Auth_reserve() {
  const axios = require('axios').default;
  
  const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  const regionId = storedUserData.loginId;
  //   const dividedList = [];
  //   const btnIndex = [];

  const ADMINURL = 'https://letsnongsa.store/api/admin/reserve/list/30';

  const [page, setPage] = useState(1);
  const [entirePage, setEntirePage] = useState(0);
  const [minusBtn, setMinusBtn] = useState(true);
  const [plusBtn, setPlusBtn] = useState(false);
  const [btnClass, setBtnClass] = useState(button.list_num);
  const [reserveList, setReserveList] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get(ADMINURL, {
        headers: {
          Authorization: `Bearer ${storedTokenData.accessToken}`,
        },
      });

      console.log(response.data);
      setReserveList(response.data);
    };
    getResponse();
  }, []);

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
  }, [page]);

  console.log(reserveList);

  //   const onClick_plus = () => {
  //     setPage(page + 1);
  //   };
  //   const onClick_minus = () => {
  //     setPage(page - 1);
  //   };
  //   const onClick_num = (event) => {
  //     event.preventdefault();
  //     const num = event.target.value;
  //     setPage(num);
  //   };

  return (
    <div>
      
      <header>
        <div>
          <div className={home.font0}>전국 농기계 임대 예약사업</div>
          <Link to="/" style={{ textDecoration: 'none' }}>
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
        <Link to="/auth_home" style={{ textDecoration: 'none' }}>
          <Button text="선택 페이지로"></Button>
        </Link>
        <Button text="예약번호"></Button>
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
          <li
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>예약번호</div>
            <div>대여 신청 기계</div>
            <div>농기계 식별 번호</div>
            <div>예약시작일</div>
            <div>예약기간</div>
            <div>예약자명</div>
            <div>예약자 ID</div>
            <div>연락처</div>
            <div>예약상태</div>
          </li>
          {reserveList &&
            reserveList.length > 0 &&
            reserveList.map((item) => {
              return (
                <li
                  key={item.reservationId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                  }}
                >
                  <div>{item.reserveId}</div>
                  <div>{item.machineType}</div>
                  <div>{item.machineId}</div>
                  <div>{item.wantTime}</div>
                  <div>{item.reserveDayCnt}</div>
                  <div>{item.name}</div>
                  <div>{item.loginId}</div>
                  <div>{item.phoneNo}</div>
                  <div>
                    <select
                      id="reservation Status"
                      name="reservation Status"
                      value={item.reservationStatus}
                    >
                      <option value="RESERVING">예약중</option>
                      <option value="RESERVED">예약확정</option>
                      <option value="CANCELED">예약취소</option>
                      <option value="FINISHED">예약완료</option>
                    </select>
                  </div>
                </li>
              );
            })}
        </ul>
        {/* <Button text="◀" onClick={onClick_minus} disabled={minusBtn}></Button>
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
          );
        })}
        <Button text="▶" onClick={onClick_plus} disabled={plusBtn}></Button> */}
      </main>
    </div>
  );
}
export default Auth_reserve;

import home from './Home.module.css';
import sign_up from './Sign_up.module.css';

import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";


import { Link } from 'react-router-dom'

function Sign_up_2() {
  const axios = require('axios').default;

  
  const JOINURL="http://52.79.207.32:9999/member/join";
  const DUPLURL='http://52.79.207.32:9999/auth/duplicate?loginId=join';

  const [memberList, setMemberList] = useState();


  const onChange = (event) => event.target.value; //return없이 반환값 쓸려면 {}넣으면 안 됨
  const onClick = () => {}

  
  const [duplMessage,setDuplMessage] = useState("");
  const onClick_ID = async (event) => {
    event.preventDefault(); 
    const loginId=event.target.ID.value;
    
    const response = await axios.get(DUPLURL, { loginId })
    const responseData=response.data;
    

    if(responseData.message){
    setDuplMessage("사용 가능한 ID입니다"); 
    }
    else{
    setDuplMessage("중복사용된 ID입니다");
    }
  }


  const onSubmit = async (event) => {
    event.preventDefault(); 
    const loginId=event.target.ID.value;
    const name=event.target.name.value;
    const password=event.target.password.value;
    const phoneNo=event.target.phoneNo.value;
    const email=event.target.email.value;

    const response = await axios.post(JOINURL, { loginId, password, name, phoneNo, email })
  }



  console.log()

  return (
    <div>
           <header>
                <div className={home.font0}>전국 농기계 임대 예약사업</div>
                <Link to='/frontend' style={{ textDecoration: 'none' }}>
                    <div className={home.lets}> 🚜렛츠농사 </div>
                </Link>
                <br></br>
            </header>

            <div className={home.nav}>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                    <h4 style={{ color: 'white' }}>로그인하기</h4>
                </Link>
                <h4 style={{ marginRight: '5px', marginLeft: '5px' }}>/</h4>
                <Link to='/sign_up' style={{ textDecoration: 'none' }}>
                    <h4 style={{ color: 'white' }}>회원가입하기</h4>
                </Link>
            </div>

      <main className={sign_up.main}>

        <div className="Sign_up-tag0">
          <p className="Sign_up_font0">
            회원가입을 위해 정보를 입력해주세요.
          </p>
        </div>

        <form onSubmit={onSubmit}>

          <form onSubmit={onClick_ID}>
            <label htmlFor="ID" className='Sign_up_font1'>아이디</label>
            <br></br>
            <Input id="ID" name = "ID" type="text" onChange={onChange} placeholder_text="아이디를 입력해주세요."
              className='Sign_up-input2' />
            <Button type="submit" text="중복확인" className='Sign_up-button1' />
            <br></br>
            <div className='Sign_up-button1_dupl'>{duplMessage}</div>
          </form>

          <label htmlFor="pswd" className='Sign_up_font1'>비밀번호</label>
          <br></br>
          <Input id="pswd" name = "pswd" type="password" onChange={onChange} placeholder_text="··········"
            className='Sign_up-input1' />
          <br></br>

          <label htmlFor="check_pswd" className='Sign_up_font1'>비밀번호 확인</label>
          <br></br>
          <Input id="check_pswd" type="password" onChange={onChange}
            placeholder_text="비밀번호를 한번 더 입력해주세요."
            className='Sign_up-input1' />
          <br></br>

          <label htmlFor="name" name="name" className='Sign_up_font1'>이름</label>
          <br></br>
          <Input id="name" type="text" onChange={onChange} placeholder_text="이름을 입력해주세요."
            className='Sign_up-input1' />
          <br></br>


          <label htmlFor="relationship" className='Sign_up_font1'>생년월일<br></br></label>
          <select id="relationship" name="relationship" className='Sign_up-input3'>
            <option value="father" >아버지(父)</option>
            <option value="mother">어머니(母)</option>
            <option value="son">아들(子)</option>
            <option value="daughter">딸(女)</option>
          </select>
          <br></br>

          <label htmlFor="email" name="email" className='Sign_up_font1'>이메일</label>
          <br></br>
          <Input id="email" type="email" onChange={onChange} placeholder_text="이메일을 입력해주세요."
            className='Sign_up-input1' />
          <br></br>


          <label htmlFor="tel" className='Sign_up_font1'>전화번호</label>
          <br></br>
          <Input id="tel" type="number" name = "phoneNo" onChange={onChange} placeholder_text="010-XXXX-XXXX"
            className='Sign_up-input2' />
          <Button onClick={onClick} text="인증요청" className='Sign_up-button1' />
          <br></br>

          <label htmlFor="code" className='Sign_up_font1'>인증번호</label>
          <br></br>
          <Input id="code" type="number" onChange={onChange} placeholder_text="인증번호를 입력해주세요."
            className='Sign_up-input2' />
          <Button onClick={onClick} text="인증확인" className='Sign_up-button1' />
          <br></br>


          <Button onClick={onSubmit} text="가입하기" className='Sign_up-button2' />

        </form>
      </main>
    </div>
  )
};


export default Sign_up_2;

import home from './Home.module.css';
import sign_up from './Sign_up.module.css';
import button from '../components/Button.module.css';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import Button from "../components/Button";
import Input from "../components/Input";
import PostCode from "../components/PostCode";

import check_o from '../img/check_o.svg';
import check_x from '../img/check_x.svg';
import locked from '../img/locked.svg';
import opened from '../img/opened.svg';




function Sign_up_inputs() {
  const axios = require('axios').default;

  
  const LISTURL = "https://letsnongsa.store/api/member/list"
  const JOINURL = "https://letsnongsa.store/api/auth/join";
  const DUPLURL = 'https://letsnongsa.store/api/auth/duplicate';

  const storedPhoneNumberData = JSON.parse(sessionStorage.getItem('phoneNumberData'));

  const [fixedId, setfixedId] = useState("");
  const [idImg, setIdImg] = useState(check_x);
  const [dupl, setDupl] = useState(false);

  const [returnPwsd, setReturnPwsd] = useState("");
  const [returnPswd_check, setReturnPswd_check] = useState("");
  const [pswd, setPswd] = useState(false);
  const [checkPswd, setCheckPswd] = useState(false);
  const [pswdStr, setPswdStr] = useState("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
  const [pswdClass, setPswdClass] = useState(sign_up.possible);

  const [type, setType] = useState("password");
  const [lock, setLock] = useState(true);
  const [lockBtn, setLockBtn] = useState(locked);

  const [joinbtn, setJoinBtn] = useState(true);
  const [psbClass, setPsbClass] = useState(sign_up.possible);
  const [btnClass, setBtnClass] = useState(sign_up.next_btn_x);
  const [duplMessage, setDuplMessage] = useState("");
  const [postItem, setPostItem] = useState("");
  const [formValues, setFormValues] = useState({
    ID: "",
    pswd: "",
    check_pswd: "",
    name: "",
    email: "",
    address: "",
    specific_address: "",
    phoneNo: storedPhoneNumberData.PhoneNumber
  });


  const onChange = (event) => {
    const { name, value } = event.target; //속성 중 name,value만 골라서 넣어줌
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value   //수정 및 추가기능 둘 다 수행
    }));
  };
  //return없이 반환값 쓸려면 {}넣으면 안 됨
  //객체 수정하는 useState 방식

  const onClick_ID = async (event) => {
    event.preventDefault();
    try {
      const loginId = event.target.ID.value;
      const response = await axios.get(DUPLURL, { params: { loginId } })
      const responseData = response.data;


      console.log("Possible! No Duplication!");
      setDuplMessage("사용 가능한 ID입니다");
      setDupl(true);
      setfixedId(loginId);
      setIdImg(check_o);
      setPsbClass(sign_up.possible);
      setFormValues((prevValues) => ({
        ...prevValues,
        ID: loginId
      }));
    }
    catch (error) {       //res.status(404).json(data) 이런식으로 백엔드에서 보내줌
      console.log(error.response.data.message); //error을 통해 response.data.message에 접근 가능
      setDuplMessage("중복사용된 ID입니다");
      setDupl(false);
      setIdImg(check_x);
      setPsbClass(sign_up.impossible);
    }
  }

  const return_pw = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPwsd(event.target.value);
  }
  const return_pw_check = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPswd_check(event.target.value);
  }

  const password_check = () => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const password = returnPwsd;
    const check_password = returnPswd_check;

    const password_check1 = regPass.test(password);
    const password_check2 = password === check_password;
    const blank1 = password !== "";
    const blank2 = check_password === "";

    if (regPass.test(password)
      && (password === check_password || check_password === "")) {
      setPswd(true);
      setCheckPswd(true);
      setPswdClass(sign_up.possible);
      setPswdStr("올바른 비밀번호입니다.");
    } else if
      (!regPass.test(password) && (password !== "" || check_password === "")) {
      setPswd(false);
      setCheckPswd(true);
      setPswdClass(sign_up.impossible);
      setPswdStr("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
    } else if (password !== check_password && check_password !== "") {
      setPswd(true);
      setCheckPswd(false);
      setPswdClass(sign_up.impossible);
      setPswdStr("※ 작성하신 비밀번호와 일치하지 않습니다.");
    }
  }

  const onClick_locker = () => {
    setLock(!lock);

    if (lock) {
      setLockBtn(opened);
      setType("text");
    } else {
      setLockBtn(locked);
      setType("password");
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const loginId = fixedId;
    const name = event.target.name.value;
    const password = event.target.pswd.value;
    const phoneNo =
      `${storedPhoneNumberData.PhoneNumber.slice(0, 3)}${storedPhoneNumberData.PhoneNumber.slice(3, 7)}${storedPhoneNumberData.PhoneNumber.slice(7, 11)}`
    const email = event.target.email.value;
    const address = postItem;
    const specificAddress = event.target.specific_address.value;

    console.log(loginId, name, password, phoneNo, email, address, specificAddress);

    const response = await axios.post(JOINURL, {
      loginId, password, name, phoneNo, email, address, specificAddress
    });

    console.log('반환받아랏', response.data);

    if (response.data) {
      console.log("sign_up succceed!");
      window.location.href = "/sign_up_success";
    }
  }


  useEffect(password_check, [returnPwsd, returnPswd_check]);
  useEffect(() => {
    const allInputsFilled = Object.values(formValues).every((value) => value !== "");
    console.log(allInputsFilled);
    console.log(formValues)
    if (allInputsFilled && dupl && pswd && checkPswd) {
      setJoinBtn(false);
      setBtnClass(sign_up.next_btn_o);

    } else {
      setJoinBtn(true);
      setBtnClass(sign_up.next_btn_x);
    }
  }, Object.values(formValues))
  //Object : 객체에 대한 함수 라이브러리 => .values : value값들을 배열화

  return (
    <div>
      <header>
        <div className={home.font0}>전국 농기계 임대 예약사업</div>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div className={home.lets}> 🚜렛츠농사 </div>
        </Link>
        <br></br>
      </header>

      <div className={home.nav1}>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <h4 style={{ color: 'white' }}>로그인하기</h4>
        </Link>
        <h4 style={{ marginRight: '5px', marginLeft: '5px' }}>/</h4>
        <Link to='/sign_up' style={{ textDecoration: 'none' }}>
          <h4 style={{ color: 'white' }}>회원가입하기</h4>
        </Link>
      </div>

      <main className={sign_up.main}>

        <div className={sign_up.caution}>
          <p className={sign_up.font0}>
            회원정보입력
          </p>
          <p className={sign_up.need}>
            <span style={{ color: 'red' }}>*</span>는 필수입력 사항입니다.
          </p>
        </div>

        <div className={sign_up.form_inputs}>

          <form onSubmit={onClick_ID} className={sign_up.form2}>

            <label htmlFor="ID" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 아이디&nbsp;&nbsp;</div>
              <div className={sign_up.input_withIcon}>
                <Input id="ID" name="ID" type="text" placeholder="아이디를 입력해주세요."
                  className={sign_up.input_tag_withIcon} required />
                <img src={idImg} className={sign_up.icon}></img>
              </div>
              <div className={psbClass}>{duplMessage}</div>
              <Button type="submit" text="중복확인" className={button.zip_search} />
            </label>
          </form>


          <form onSubmit={onSubmit} className={sign_up.form2}>

            <label htmlFor="pswd" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 비밀번호&nbsp;&nbsp;</div>

              <div className={sign_up.input_withIcon}>
                <Input id="pswd" name="pswd" type={type} onChange={return_pw}
                  placeholder="비밀번호"
                  className={sign_up.input_tag_withIcon} required />
                <img src={lockBtn} className={sign_up.icon} onClick={onClick_locker}></img>
              </div>

              <Input id="check_pswd" name="check_pswd" type="password" onChange={return_pw_check}
                placeholder="비밀번호 확인"
                className={sign_up.input_tag} required />

              <div className={pswdClass}>{pswdStr}</div>
            </label>

            <label htmlFor="name" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 이름&nbsp;&nbsp;</div>

              <Input id="name" name="name" type="text" onChange={onChange} placeholder="이름"
                className={sign_up.input_tag} required />

            </label>


            <label htmlFor="tel" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 휴대전화&nbsp;&nbsp;</div>

              <div className={sign_up.phone_Number}>
                <Input id="tel" name="phoneNo" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={storedPhoneNumberData.PhoneNumber.slice(0, 3)}
                  readOnly
                  required />
                <div className={sign_up.phone_line}></div>
                <Input id="tel" name="phoneNo" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={storedPhoneNumberData.PhoneNumber.slice(3, 7)}
                  readOnly
                  required />
                <div className={sign_up.phone_line}></div>
                <Input id="tel" name="phoneNo" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={storedPhoneNumberData.PhoneNumber.slice(7, 11)}
                  readOnly
                  required />

              </div>
            </label>

            <label htmlFor="email" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 이메일&nbsp;&nbsp;</div>

              <Input id="email" name="email" type="email" onChange={onChange} placeholder="letsnongsa@letsnongsa.com"
                className={sign_up.input_tag} required />

            </label>


            <label htmlFor="address" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 주소&nbsp;&nbsp;</div>

              <Input id="address" name="address" type="address" onChange={onChange} placeholder="도로명주소"
                className={sign_up.input_tag}
                value={postItem}
                required
                readOnly />


              <Input id="address" name="specific_address" type="address" onChange={onChange} placeholder="상세 주소지 입력"
                className={sign_up.input_tag} />
              <div className={sign_up.possible}>
                ※ 주소 검색 버튼을 이용해 도로명 주소 입력 후 상세 주소를 입력 하십시오.
              </div>
              <PostCode item={postItem} setItem={setPostItem} onChange={onChange}></PostCode>
            </label>


            <Button
              text="회원가입"
              disabled={joinbtn}
              className={btnClass}
              type="submit">
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
};


export default Sign_up_inputs;

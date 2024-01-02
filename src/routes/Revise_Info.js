import home from './Home.module.css';
import sign_up from './Sign_up.module.css';
import button from '../components/Button.module.css';

import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

import Button from "../components/Button";
import Input from "../components/Input";
import PostCode from "../components/PostCode";
import Signed_in from '../components/Signed_in';

import locked from '../img/locked.svg';
import opened from '../img/opened.svg';

import PhoneCode from '../components/PhoneCode';



function Revise_Info() {
  const axios = require('axios').default;

  // ★★★★★★로그인 관련★★★★★★★★
  const [logined, setLogined] = useState(false);
  const [name, setName] = useState("");
  const [storedTokenData, setStoredTokenData] = useState([]);

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
    sessionStorage.removeItem("tokenData");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("phoneNumberData");
    setLogined(false);
    window.location.href = "/";
  }
  // ★★★★★★로그인 관련★★★★★★★★

  const UPDATEALLURL = "https://letsnongsa.store/api/member/update-all"
  const UPDATEPSWDURL = "https://letsnongsa.store/api/member/update-password"
  const MEMBERURL = "https://letsnongsa.store/api/member/info"



  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));


  const [returnPwsd, setReturnPwsd] = useState("");
  const [returnPswd_check, setReturnPswd_check] = useState("");
  const [pswd, setPswd] = useState(false);
  const [checkPswd, setCheckPswd] = useState(false);
  const [checkSame, setCheckSame] = useState(false);
  const [pswdStr, setPswdStr] = useState("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
  const [pswdClass, setPswdClass] = useState(sign_up.possible);
  const [revise, setRevise] = useState(false);

  const [emailValue, setEmailValue] = useState(storedUserData.email);
  const [addressValue, setAddressValue] = useState(storedUserData.address);
  const [specificAddressValue, setSpecificAddressValue] = useState(storedUserData.specificAddress);

  const [phoneValue, setPhoneValue] = useState(storedUserData.phoneNo);
  const [phoneValue1, setPhoneValue1] = useState(storedUserData.phoneNo.slice(0, 3));
  const [phoneValue2, setPhoneValue2] = useState(storedUserData.phoneNo.slice(3, 7));
  const [phoneValue3, setPhoneValue3] = useState(storedUserData.phoneNo.slice(7, 11));
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);

  let emailA, addressA, specificA = true;
  const[revisePswd,setRevisePswd] = useState(false);

  const [type, setType] = useState("password");
  const [lock, setLock] = useState(true);
  const [lockBtn, setLockBtn] = useState(locked);

  const [reviseCheck, setReviseCheck] = useState(false);

  const [joinbtn, setJoinBtn] = useState(true);
  const [psbClass, setPsbClass] = useState(sign_up.possible);
  const [btnClass, setBtnClass] = useState(sign_up.next_btn_x);
  const [postItem, setPostItem] = useState("");
  const [formValues, setFormValues] = useState({
    name: storedUserData.name,
    email: storedUserData.email,
    address: storedUserData.address,
    specific_address: storedUserData.specificAddress,
    phoneNo: storedUserData.phoneNo
  });
  //formvalues + onchange함수 활용해서 미리 초기값과 이후 작성하기를 쉽게 할 수 있도록


  const [emailAccess, setEmailAccess] = useState(true);
  const [addressAccess, setAddressAccess] = useState(true);
  const [specificAccess, setSpecificAccess] = useState(true);

  const onChange = (event) => {
    const { name, value } = event.target; //속성 중 name,value만 골라서 넣어줌
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value   //수정 및 추가기능 둘 다 수행
    }));
    console.log('Acceess :', emailAccess, addressAccess, specificAccess, pswd, checkPswd)
  };
  //return없이 반환값 쓸려면 {}넣으면 안 됨
  //객체 수정하는 useState 방식
  useEffect(() => {
    if (formValues.email !== storedUserData.email) {
      if (formValues.email) {
        emailA = true;
        setEmailAccess(true);
      }
      else {
        emailA = false;
        setEmailAccess(false);
      }
    } else {
      emailA = true;
      setEmailAccess(true);
    }

    if (formValues.address !== storedUserData.address) {
      if (formValues.address) {
        addressA = true;
        setAddressAccess(true);
      }
      else {
        addressA = false;
        setAddressAccess(false);
      }
    } else {
      addressA = true;
      setAddressAccess(true);
    }

    if (formValues.specific_address !== storedUserData.specificAddress) {
      if (formValues.specific_address) {
        specificA = true;
        setSpecificAccess(true);
        console.log('what the');
      } else {
        specificA = false;
        setSpecificAccess(false);
        console.log('why', specificA, specificAccess);
      }
    } else {
      specificA = true;
      setSpecificAccess(true);
    }

  }, Object.values(formValues))

  useEffect(() => {
    setEmailAccess(emailA);
    setAddressAccess(addressA);
    setSpecificAccess(specificA);
  }, [emailA, addressA, specificA])

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

  const onClick_revise = () => {
    if (!revise) {
      const answer = window.confirm("비밀번호를 수정하시겠습니까?");
      setRevisePswd(answer);
      console.log('revisePswd:',revisePswd);
    }
  }
  useEffect(()=>
  {
    setRevise(revisePswd)
    console.log('revise & revisePswd:',revise,revisePswd);
  },[revisePswd])

  const password_check = () => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const password = returnPwsd;
    const check_password = returnPswd_check;

    const password_check1 = regPass.test(password);
    const password_check2 = password === check_password;
    const blank1 = password !== "";
    const blank2 = check_password === "";

    if (regPass.test(password)
      && (password === check_password)
    ||(regPass.test(password)) && (check_password==="")) {
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

    if (revise && password === storedUserData.password) {
      setCheckSame(false);
      setPswdClass(sign_up.impossible);
      setPswdStr("※ 이전 비밀번호와 다르게 설정해주십시오.");
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

  const onClick_phone = () => {
    setPhoneModal(true);
    console.log(phoneValue)
  }



  useEffect(password_check, [returnPwsd, returnPswd_check]);

  useEffect(() => {
    if (phoneCheck) {
      setPhoneValue1(phoneValue.slice(0, 3));
      setPhoneValue2(phoneValue.slice(3, 7));
      setPhoneValue3(phoneValue.slice(7, 11));
    }
  }, [phoneValue])

  useEffect(() => {
    const allInputsFilled = Object.values(formValues).every((value) => value !== "");
    console.log(allInputsFilled);
    console.log(formValues)
    console.log('if문 revise revisePswd :',revise,revisePswd);
    console.log('if문 pswd,checkPswd',pswd,checkPswd);
    if (
      (emailAccess && addressAccess && specificAccess) || allInputsFilled) {
        
      if (revisePswd) {
        if (pswd && checkPswd) {
          setJoinBtn(false);
          setBtnClass(sign_up.next_btn_o);
        }
        else {
          setJoinBtn(true);
          setBtnClass(sign_up.next_btn_x);
        }
      }
      else {
        setJoinBtn(false);
        setBtnClass(sign_up.next_btn_o);
       }
    } else {
      setJoinBtn(true);
      setBtnClass(sign_up.next_btn_x);
    }
  }, Object.values(formValues))
  //Object : 객체에 대한 함수 라이브러리 => .values : value값들을 배열화



  const onSubmit = async (event) => {
    event.preventDefault();
    const loginId = storedUserData.loginId;
    const phoneNo = phoneValue;
    const email = formValues.email;
    const address = formValues.address;
    const specificAddress = formValues.specific_address;

    const oldPassword = storedUserData.password;
    const newPassword = formValues.pswd;

    let success

    console.log(loginId, phoneNo, email, address, specificAddress)
    console.log(oldPassword, newPassword)

    try {
      const response_others = await axios.post(UPDATEALLURL,
        {
          loginId, phoneNo, email, address, specificAddress
        },
        {
          headers: {
            'Authorization': `Bearer ${storedTokenData.accessToken}`
          }
        }
      )
      console.log('new info : ', loginId, phoneNo, email, address, specificAddress)
      console.log('others', response_others)
    } catch (error) {
      console.log('others error', error);
    }

    try {
      const response_pswd = await axios.post(UPDATEPSWDURL,
        {
          oldPassword, newPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${storedTokenData.accessToken}`
          }
        }
      )
      console.log('pswd', response_pswd)
      console.log('new Password :', newPassword)
    } catch (error) {
      console.log('password error', error);
    }
    try {
      const response = await axios.get(MEMBERURL,
        {
          headers: {
            'Authorization': `Bearer ${storedTokenData.accessToken}`
          }
        });
      sessionStorage.removeItem('userData');

      const userData = {
        loginId: response.data.loginId,
        name: response.data.name,
        phoneNo: response.data.phoneNo,
        email: response.data.email,
        address: response.data.address,
        specificAddress: response.data.specificAddress,
      }
      console.log(userData);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      success = true;
    } catch (error) {
      console.log('getting new userData failed', error);
    }

    if (success) {
      window.alert("회원정보가 성공적으로 수정되었습니다");
      window.location.href = '/';
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
        <Link to='/' style={{ textDecoration: 'none' }}>
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
      <main className={sign_up.main}>

        <div className={sign_up.caution}>
          <p className={sign_up.font0}>
            회원정보수정
          </p>
          <p className={sign_up.need}>
            <span style={{ color: 'red' }}>*</span>는 필수입력 사항입니다.
          </p>
        </div>

        <div className={sign_up.form_inputs}>

          <form onSubmit={onSubmit} className={sign_up.form2}>

            <label htmlFor="name" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 이름&nbsp;&nbsp;</div>

              <Input id="name" name="name"
                value={storedUserData.name}
                type="text" onChange={onChange} placeholder="이름"
                className={sign_up.input_tag} required disabled={true} />

            </label>

            <label htmlFor="pswd" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar} >
                <span style={{ color: 'red' }}>*</span> 비밀번호&nbsp;&nbsp;</div>

              <div className={sign_up.input_withIcon} onClick={onClick_revise}>
                <Input id="pswd" name="pswd" type={type} onChange={return_pw}
                  placeholder="새 비밀번호" onClick={onClick_revise}
                  className={sign_up.input_tag_withIcon} required />
                <img src={lockBtn} className={sign_up.icon} onClick={onClick_locker}></img>
              </div>

              <Input id="check_pswd" name="check_pswd" type="password" onChange={return_pw_check}
                placeholder="새 비밀번호 확인" disabled={!revise}
                className={sign_up.input_tag} required />

              <div className={pswdClass}>{pswdStr}</div>
            </label>

            <label htmlFor="tel" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 휴대전화&nbsp;&nbsp;</div>

              <div className={sign_up.phone_Number}>
                <Input id="tel" name="phoneNo1" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={phoneValue1}
                  disabled={true}
                  readOnly
                  required />
                <div className={sign_up.phone_line}></div>
                <Input id="tel" name="phoneNo2" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={phoneValue2}
                  disabled={true}
                  readOnly
                  required />
                <div className={sign_up.phone_line}></div>
                <Input id="tel" name="phoneNo3" type="number" onChange={onChange}
                  className={sign_up.input_tag_phone} value={phoneValue3}
                  disabled={true}
                  readOnly
                  required />

              </div>
              <p className={sign_up.possible}>
                ※휴대전화 번호를 변경하시려면 휴대폰 인증이 필요합니다.
              </p>
              <Button
                type="button"
                text="휴대폰 인증 다시하기"
                className={button.phone_again}
                onClick={onClick_phone}>
              </Button>
              <PhoneCode
                showModal_value={phoneModal}
                setShowModal_value={setPhoneModal}
                phoneCheck={phoneCheck}
                setPhoneCheck={setPhoneCheck}
                phoneNumber={phoneValue}
                setPhoneNumber={setPhoneValue}
                next_page="revise"
              ></PhoneCode>
            </label>

            <label htmlFor="email" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 이메일&nbsp;&nbsp;</div>

              <Input id="email" name="email"
                value={formValues.email}
                type="email" onChange={onChange} placeholder="letsnongsa@letsnongsa.com"
                className={sign_up.input_tag} required />

            </label>


            <label htmlFor="address" className={sign_up.input_flex}>
              <div className={sign_up.input_bluebar}>
                <span style={{ color: 'red' }}>*</span> 주소&nbsp;&nbsp;</div>

              <Input id="address" name="address" type="address" onChange={onChange} placeholder="도로명주소"
                className={sign_up.input_tag}
                value={formValues.address}
                required
                readOnly
                disabled={true}
              />


              <Input id="address" name="specific_address" type="address" onChange={onChange} placeholder="상세 주소지 입력"
                className={sign_up.input_tag}
                value={formValues.specific_address}
              />
              <div className={sign_up.possible}>
                ※ 주소 검색 버튼을 이용해 도로명 주소 입력 후 상세 주소를 입력 하십시오.
              </div>
              <PostCode item={addressValue} setItem={setAddressValue} onChange={onChange}></PostCode>
            </label>


            <Button
              text="정보수정"
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


export default Revise_Info;

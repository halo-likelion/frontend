import { useState, useEffect } from 'react';


import Input from '../components/Input';
import Button from '../components/Button';
import Timer from './Timer';

import phonecode from './PhoneCode.module.css';

import cellphone from '../img/cellphone.png';



function PhoneCode({ 
    showModal_value, 
    setShowModal_value, 
    phoneCheck, 
    setPhoneCheck, 
    phoneNumber, 
    setPhoneNumber,
    next_page
}) {
    const axios = require('axios').default;

    const PHONE = "https://letsnongsa.store/api/alert/phoneAuth";
    const CODE = "https://letsnongsa.store/api/alert/phoneAuthOk";

    //상위에서 값이 바뀐었다고 매번 const 선언까지 업데이트 하진 않음. useeffect등의 함수를 따로 작성해서 상위 컴포넌트의 변경사항을 적용해야 함.
    const [phone, setPhone] = useState("");

    const [backCode, setBackCode] = useState("");
    const [code, setCode] = useState("");

    const [disInput, setDisInput] = useState(true);

    const [message, setMessage] = useState("휴대폰 번호 입력과 인증 요청을 먼저 완료해주세요");
    const [messageClass, setMessageClass] = useState(phonecode.possible);

    const [timer, setTimer] = useState(false);

    const [btnClass, setBtnClass] = useState(phonecode.next_btn_x);

    useEffect(() => {
        setShowModal_value(showModal_value);
    }, [showModal_value]);      //이것 때문에 그냥 외부에서 showmodal 변수도 다 받아버리는게 낫다

    const closeModal = () => {
        setShowModal_value(false);
        setTimer(false);
    };

    const onChange_phone = (event) => {

        setPhone(event.target.value);
        console.log(phone);
        console.log(showModal_value);

    }
    const onChange_code = (event) => {
        setCode(event.target.value);
        console.log(code);
    }

    const onSubmit_phone = async (event) => {
        event.preventDefault();
        setTimer(false);
        const to = phone;
        const content = "";
        const response = await axios.post(PHONE, { to, content });

        setDisInput(false);
        setBackCode(response.data);
        setMessage("*3분 내로 인증번호를 입력해주십시오.");
        setMessageClass(phonecode.possible);
        console.log(response.data);
        console.log("요청 성공");
        setTimer(true);
    }
    const onSubmit_code = async (event) => {
        event.preventDefault();
        const Code = String(code);
        const BackCode = String(backCode);
        if (Code === BackCode) {
            console.log(code, "인증 성공");
            setMessage("*인증이 완료되었습니다. 아래의 '인증확인' 버튼을 클릭해주십시오");
            setPhoneCheck(true);
            setBtnClass(phonecode.next_btn_o);
            setPhoneNumber(phone);
            setTimer(false);
        }
        else {
            setMessage("*인증번호가 맞지 않습니다!");
            setMessageClass(phonecode.impossible);
            setPhoneCheck(false);
            setBtnClass(phonecode.next_btn_x);
            console.log("인증실패");
            console.log(Code, BackCode)
        }

    }

    const onClick_next_page = () =>{
        if(next_page==="inputs"){
            window.location.href="/sign_up_inputs";
        }else if(next_page==="revise"){
            setShowModal_value(false);
        }
    }


    return (
        <div>
            {showModal_value && (
                <div className={phonecode.modal}>
                    <div className={phonecode.img_buttonX} onClick={closeModal}></div>
                    <p className={phonecode.title}>휴대폰 인증</p>
                    
                    <div className={phonecode.main}>
                        
                        <img src={cellphone} className={phonecode.cellphone}></img>
                        <p className={phonecode.caution}>
                            휴대폰 번호 입력 후 인증번호 받기 버튼을 눌러 주세요.
                            전송받은 문자메시지에서 인증번호 확인 후 <span style={{ color: 'red' }}>3분</span> 내에 인증번호를 입력하세요.
                        </p>

                        <div className={phonecode.phone}>
                            <p className={phonecode.number}>전화번호</p>
                            <Input id="phone" name="phone" type="number"
                                onChange={onChange_phone}
                                placeholder="번호 입력란 -없이 입력하세요"
                                className={phonecode.input}>
                            </Input>
                            <Button
                                onClick={onSubmit_phone}
                                className={phonecode.get}
                                text="인증번호 받기"></Button>
                        </div>

                        <div className={phonecode.code}>
                            <p className={phonecode.number}>인증번호</p>
                            <div className={phonecode.code_timer}>
                                <Input id="code" name="code" type="number"
                                    onChange={onChange_code}
                                    disabled={disInput}
                                    placeholder="인증번호 입력"
                                    className={phonecode.input_code}>
                                </Input>
                                {timer && (
                                    <Timer limitTime={180}></Timer>
                                )}
                            </div>
                            <Button
                                onClick={onSubmit_code} className={phonecode.get}
                                text="인증번호 확인">
                            </Button>
                            <p className={messageClass}>{message}</p>
                        </div>
                        
                    </div>
                        <Button 
                        disabled={!phoneCheck} 
                        className={btnClass} 
                        text="인증 확인"
                        onClick={onClick_next_page}>
                        </Button>
         
                </div>
            )}
        </div>
    );

}

export default PhoneCode;
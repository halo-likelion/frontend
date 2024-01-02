import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import Button from "../components/Button";
import Input from "../components/Input";

import home from './Home.module.css';
import login from './Log_in.module.css';
import sign_up from './Sign_up.module.css';

import login_bell from '../img/login_bell.svg';
import id_icon from '../img/ID ICON.svg';
import pwd_icon from '../img/PASSWORD ICON.svg';




function Log_in() {
    const axios = require('axios').default;
    
    const [change, setChange] = useState("");
    const [click, setClick] = useState(false);

    const LOGINURL = "https://letsnongsa.store/api/auth/login";
    const MEMBERURL = "https://letsnongsa.store/api/member/info"

    const [wrongId, setWrongId] = useState(false);
    const [wrongPswd, setWrongPswd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [messageClass, setMessageClass] = useState(login.impossible);

    const onChange = (event) => {
        setChange(event.target.value);
    };

    

    const onSubmit = async (event) => {
        event.preventDefault();
        const loginId = event.target.ID.value;
        const password = event.target.password.value;

        console.log(loginId, password);
        setWrongId(false);
        setWrongPswd(false);
        setLoading(true);
        try {
            const response = await axios.post(LOGINURL, { loginId, password })
            const tokenData = {
                grantType: response.data.grantType,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
            sessionStorage.setItem('tokenData', JSON.stringify(tokenData));

            if (response.data) {
                try {
                    const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
                    const response_member =
                        await axios.get(MEMBERURL, {
                            headers: {
                                'Authorization': `Bearer ${storedTokenData.accessToken}`
                            }
                        })

                    const userData = {
                        loginId: response_member.data.loginId,
                        password: password,
                        name: response_member.data.name,
                        phoneNo: response_member.data.phoneNo,
                        email: response_member.data.email,
                        address: response_member.data.address,
                        specificAddress: response_member.data.specificAddress
                    }
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                    if (userData.loginId === "gapyeong11") {
                        window.location.href = "/auth_home";
                    }
                    else { window.location.href = "/"; }
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                    console.log("Getting Info Failed :(")
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.response.status == 404) {
                setWrongId(true);
                console.log("Id fail ;(");
            } else if (error.response.status == 401) {
                setWrongPswd(true);
                console.log("Pswd fail ;(");
            }
        }
    };

    useEffect(() => {
        if (loading) {
            setFailMessage("로그인중입니다..");
            setMessageClass(login.loading);
        }else {
                if (wrongId) {
                    setFailMessage("잘못된 아이디입니다.");
                    setMessageClass(login.impossible);
                }
                else if (wrongPswd) {
                    setFailMessage("잘못된 비밀번호입니다.")
                    setMessageClass(login.impossible);
                }
                else{
                    setFailMessage("");
                }
            }
        }
    ,[loading,wrongId,wrongPswd])

    return (
        <div className={home.all}>
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


            <div className={login.body}>
                <div className={login.login}>로그인</div>
                <img src={login_bell} alt='bell'></img>
                <div className={login.warning}>
                    아이디 및 비밀번호가 기억 나지 않으실 때는 하단의 아이디/비밀번호 찾기를 이용하십시오.
                    임대하신 경험이 있으시면 회원가입이 되어있습니다.
                    반드시 가까운 농업기술센터로 문의바랍니다.
                    <br></br><br></br>
                    <span style={{ color: '#0A559F' }}>
                        아직 회원이 아니시라면
                        가입 후 이용해 주십시오.
                    </span>
                </div>
                <div>
                    <form onSubmit={onSubmit} className={login.form}>
                        <div className={login.tag}>
                            <img src={id_icon} arc='id_icon'
                                className={login.input}></img>
                            <Input id="input_id" name="ID" type="text" onChange={onChange}
                                className={login.input}
                                placeholder="아이디" />
                        </div>

                        <div className={login.tag}>
                            <img src={pwd_icon} arc='id_icon'
                                className={login.input}></img>
                            <Input id="input_ps" name="password" type="password" onChange={onChange}
                                className={login.input}
                                placeholder="비밀번호" />
                        </div>

                        <p className={messageClass}>{failMessage}</p>

                        <Button type="submit" text="로그인"
                            className={login.login_btn} />

                    </form>

                    <div className={login.other_box}>
                        <Link to='/sign_up' style={{ textDecoration: 'none' }}>
                            <Button
                                className={login.other_btn}
                                text="회원가입하기"
                            />
                        </Link>


                        <Link to='#' style={{ textDecoration: 'nsone' }}>
                            <Button
                                className={login.other_btn}
                                text="아이디찾기"
                            />
                        </Link>

                        <Link to='#' style={{ textDecoration: 'none' }}>
                            <Button
                                className={login.other_btn}
                                text="비밀번호찾기"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Log_in;

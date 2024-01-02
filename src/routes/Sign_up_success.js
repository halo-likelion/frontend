import home from './Home.module.css';
import sign_up from './Sign_up.module.css';


import Button from "../components/Button";
import Input from "../components/Input";

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

function Sign_up_success() {
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
                <br></br>
                <div className={sign_up.sign_up}>회원가입 완료</div>
                <div className={sign_up.success_box}>
                    <div className={sign_up.lets}> 렛츠농사 </div>
                    <div align='center' className={sign_up.success_text}>
                        가입을 축하드립니다!
                        <br></br>
                        아래의 <span style={{color:"blue"}}>'로그인하기' 버튼</span>을 통해
                        <br></br>
                        로그인 페이지에 접속하신 뒤
                        <br></br>
                        가입하신 정보로 다시 로그인해주세요
                    </div>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <Button
                            className={sign_up.login_btn}
                            text="로그인하기"
                        />
                    </Link>
                </div>
            </main>

        </div>
    )
};


export default Sign_up_success;

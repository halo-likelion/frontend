
import Input from "../components/Input";
import Button from "../components/Button";
import ItemPicker from "../components/ItemPicker";

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import home from "./Home.module.css";
import button from "../components/Button.module.css";
import input from "../components/Input.module.css";
import auth from "./Auth.module.css";

import readingGlass from "../img/readingGlass.svg";
import calendar from "../img/calendar.svg"


function Auth_home() {
    const axios = require('axios').default;
    
    return (
        <div className={auth.home}>
            <header className={auth.header}>
                <div className={auth.banner}>
                    <div className={home.font0}>전국 농기계 임대 예약사업</div>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className={home.lets}> 🚜렛츠농사 </div>
                    </Link>
                    <br></br>
                </div>

                <div className={auth.author}>
                    <p className={auth.company}>가평군 농기계임대사업소</p>
                    <p className={auth.author_text}>
                        관리자&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;김관리
                    </p>
                </div>
            </header>
            <main>
                <Link to="/auth_reserve" style={{ textDecoration: "none" }}>
                    <div className={auth.manage}> 예약 관리 </div>
                </Link>

                <Link to="/auth_machine" style={{ textDecoration: "none" }}>
                    <div className={auth.manage}> 농기계 관리 </div>
                </Link>
            </main>
        </div>
    )
}
export default Auth_home;
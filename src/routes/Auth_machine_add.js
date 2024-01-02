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

import ImageUpload from "../components/ImageUpload";

function Auth_machine_add() {
    const axios = require('axios').default;
    const UPDATEURL = "https://letsnongsa.store/api/agriculture/update-all"
    const onSubmit = async (event) => {
        const id = event.target.id.value;
        const type = event.target.type.value;
        const price = event.target.price.value;
        const tag = event.target.tag.value;
        const content = event.target.content.value;
        const status = event.target.status.value;

        await axios.post(UPDATEURL,{id,type,price,tag,content,status});
    }

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
                <form onSubmit={onSubmit}>
                    <div>농기계 식별 번호</div>
                    <Input id = "id" name = "id"></Input>

                    <div>기계 종류</div>
                    <Input id = "type" name = "type"></Input>

                    <div>가격</div>
                    <Input id = "price" name = "price"></Input>

                    <div>태그</div>
                    <Input id = "tag" name = "tag"></Input>

                    <div>기계설명</div>
                    <Input id = "content" name = "content"></Input>

                    <div>상태</div>
                    <select name="reservePossible">
                        <option>예약가능</option>
                        <option>예약불가</option>
                    </select>

                    <div>사진</div>
                    <ImageUpload></ImageUpload>
                </form>
            </main>
        </div>
    )
}
export default Auth_machine_add;
import "./Test_code.css";
import shape from "../img/shape.svg";

import Calendar from "../components/Calendar";
import ImageUpload from "../components/ImageUpload";

function Test_code(){
    return(
    <div className="element">
    <div className="div">
      <div className="overlap">
        <div className="text-wrapper">🚜 렛츠농사</div>
        <div className="text-wrapper-4">전국 농기계 임대 예약사업</div>
      </div>
      <div className="h-1-wrapper">
        <h1 className="h-1">임대신청 통합검색</h1>
      </div>
      <div className="div-wrapper">
        <div className="text-wrapper-5">검색조건</div>
      </div>
      <div className="overlap-3">
        <div className="text-wrapper-6">검색하기</div>
      </div>
      <div className="overlap-4"> 
        <div className="overlap-5">
          <div className="rectangle" />
          <div className="text-wrapper-7">특별시/광역시/도</div>
          <div className="text-wrapper-8">*필수 입력 항목입니다.</div>
        </div>
        <div className="overlap-6">
          <div className="text-wrapper-9">※ 예시1 감자, 예시2 트랙터</div>
          <div className="shape-wrapper">
            <img className="img" alt="Shape" src= {shape}/>
          </div>
        </div>
        <div className="overlap-7">
          <div className="text-wrapper-9">동력기 및 작업기</div>
        </div>
        <div className="overlap-8">
          <div className="text-wrapper-9">부속 장비</div>
        </div>
        <div className="overlap-9">
          <div className="text-wrapper-9">2024-04-04</div>
        </div>
        <div className="overlap-10">
          <div className="rectangle" />
          <div className="text-wrapper-7">시/군/구</div>
          <div className="text-wrapper-8">*필수 입력 항목입니다.</div>
        </div>
        <div className="overlap-11">
          <div className="text-wrapper-9">임대사업소</div>
        </div>
        <div className="overlap-12">
          <div className="text-wrapper-10">선택</div>
        </div>
        <div className="overlap-13">
          <div className="text-wrapper-11">선택</div>
        </div>
        <div className="overlap-14">
          <div className="text-wrapper-10">선택</div>
        </div>
        <div className="overlap-15">
          <div className="text-wrapper-10">선택</div>
        </div>
        <div className="overlap-group-2">
          <div className="text-wrapper-10">선택</div>
        </div>
        <div className="overlap-16">
          <img className="line" alt="Line" src="./line-4.svg" />
          <img className="line-2" alt="Line" src="./line-6.svg" />
          <img className="line-3" alt="Line" src="./line-7.svg" />
          <img className="line-4" alt="Line" src="./line-3.svg" />
        </div>
        <div className="text-wrapper-12">지역</div>
        <div className="text-wrapper-13">농기계</div>
        <div className="text-wrapper-14">
          예약
          <br />
          날짜
        </div>
        <img className="icon-calendar" alt="Icon calendar" src="../img/icon-calendar.png" />
        <div className="text-wrapper-15">* 필수 입력</div>
      </div>
      <div className="div-wrapper-2">
        <div className="div-2">
          <div className="text-wrapper-16">로그인하기</div>
          <div className="text-wrapper-17">회원가입하기</div>
          <img className="line-5" alt="Line" src="../img/line-9.svg" />
        </div>
      </div>
      <div className="overlap-17">
        <div className="text-wrapper-18">초기화</div>
      </div>
    </div>
    <ImageUpload></ImageUpload>

    <Calendar></Calendar>
  </div>
    )
}

export default Test_code;
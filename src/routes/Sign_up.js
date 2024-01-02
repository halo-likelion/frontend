import home from './Home.module.css';
import sign_up from './Sign_up.module.css';

import cellphone from '../img/cellphone.png';

import Button from "../components/Button";

import { Link } from 'react-router-dom'

function Sign_up() {
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
        <div className={sign_up.sign_up}>회원가입</div>

        <div className={sign_up.body1}>
          <div className={sign_up.check_text}>휴대폰 인증</div>
          <img src={cellphone}></img>
          <div className={sign_up.warning}>
            회원가입 시 휴대폰 인증을 선택하여 가입하시기 바랍니다.
            본 사이트는 <span style={{color:'red'}}>14세 이상</span>만 회원가입이 가능합니다.
          </div>
          <Link to='/sign_up_agreements' 
          style={{ textDecoration: 'none' }}>
            <Button
              className={sign_up.sign_up_btn}
              text="회원가입"
            />
          </Link>
        </div>
      </main>

    </div>
  )
};


export default Sign_up;

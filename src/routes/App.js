import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sign_up from "./Sign_up";
import Sign_up_agreements from "./Sign_up_agreements";
import Sign_up_inputs from "./Sign_up_inputs";
import Sign_up_success from "./Sign_up_success";

import Log_in from "./Log_in";

import Home from "./Home";
import Revise_Info from './Revise_Info';
import Rent_apply from "./Rent_apply";
import Rent_list from "./Rent_list";
import Rent_detail from "./Rent_detail";

import Auth_home from "./Auth_home";
import Auth_machine from "./Auth_machine";
import Auth_reserve from "./Auth_reserve";
import Auth_machine_add from "./Auth_machine_add";
import Auth_machine_revise from "./Auth_machine_revise";


import Test_code from './Test_code';


function App(){
  return <Router> 
    <Routes>
      <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>}/>
      <Route path = "/login" element = {<Log_in/>}></Route>
      <Route path = "/sign_up" element = {<Sign_up/>}></Route>
      <Route path = "/sign_up_agreements" element = {<Sign_up_agreements/>}></Route>
      <Route path = "/sign_up_inputs" element = {<Sign_up_inputs/>}></Route>
      <Route path = "/sign_up_success" element = {<Sign_up_success/>}></Route>
      <Route path = "/test_code" element = {<Test_code/>}></Route>
      
      <Route path = "/revise_info" element = {<Revise_Info/>}></Route>

      <Route path = "/rent_apply" element = {<Rent_apply/>}></Route>
      <Route path = "/rent_list" element = {<Rent_list/>}></Route>
      <Route path = "/rent_detail/:id" element = {<Rent_detail/>}></Route>

      <Route path = "/auth_home" element = {<Auth_home/>}></Route>
      <Route path = "/auth_reserve" element = {<Auth_reserve/>}></Route>
      <Route path = "/auth_machine" element = {<Auth_machine/>}></Route>
      <Route path = "/auth_machine_add" element = {<Auth_machine_add/>}></Route>
      <Route path = "/auth_machine_revise/:id" element = {<Auth_machine_revise/>}></Route>
    </Routes>
  </Router>
} //이젠 swtich가 아니라 'Routes'로 지원하고, Route는 다음과 같은 형식을 따라야 함
// "/"는 홈화면으로 가는 루트(url뒤에 아무것도 안 붙음)
// "/movie"를 붙이면 Detail.js로 이동
// "/:id"를 붙이면 해당 movie 컴포넌트의 id표시 (Home.js에서 id property를 생성, movie.id를 대입해서 받아옴)

//레포지토리도 url에 붙여야 함
//{`${process.env.PUBLIC_URL}/`} => 'package.json'의 homepage주소가 됨
 //http://'localhost3000'/'블라블라' <= npm start시 localhost:3000이 들어가는 자리 확인(package.json에서)
export default App;

import home from './Home.module.css';
import sign_up from './Sign_up.module.css';

import check_o from '../img/check_o.svg';
import check_x from '../img/check_x.svg';

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode';

import Button from "../components/Button";
import Input from "../components/Input";
import PhoneCode from "../components/PhoneCode";





function Sign_up_agreements() {
  const axios = require('axios').default;

  
  const JOINURL = "https://letsnongsa.store/api/member/join";

  const [allChecked, setAllChecked] = useState(false);
  const [useChecked, setUseChecked] = useState(false);
  const [infoChecked, setInfoChecked] = useState(false);
  const [adChecked, setAdChecked] = useState(false);

  const [allcheckedClass, setAllCheckedClass] = useState(check_x);
  const [usecheckedClass, setUseCheckedClass] = useState(check_x);
  const [infocheckedClass, setInfoCheckedClass] = useState(check_x);
  const [adcheckedClass, setAdCheckedClass] = useState(check_x);

  const [showPhone, setShowPhone] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);

  const [nextbtn, setNextBtn] = useState(true);
  const [btnClass, setBtnClass] = useState(sign_up.next_btn_x);



  const agree_divs = [
    `■ 이용약관
 
    제1장   총  칙 
     
    제1조(목적) 이 약관은 렛츠농사(이하 "농업기계임대사업소"라 합니다)이 제공하는 웹서비스(이하 "서비스"라 합니다)를 이용함에 있어 렛츠농사와 회원간의 권리·의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다. 
     
    제2조(이용약관의 효력과 변경) 
      ① 이 약관의 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 이용자에게 공시하고, 이에 
         동의한 이용자가 회원으로 가입함으로써 효력이 발생됩니다.  
      ② 도는 필요하다고 인정되는 경우 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 서비스 
         화면에 공지함으로써 이용자가 직접 확인할 수 있도록 할 것입니다. 
      ③ 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 본인의 회원등록을 취소할 
         수 있으며, 계속 사용하시는 경우에는 약관 변경에 동의한 것으로 간주되며 변경된 약관은 전항
         과 같은 방법으로 효력이 발생합니다. 
     
    제3조(용어의 정의) 이 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.  
      ① 이용자 : 서비스에 접속하여 도가 제공하는 서비스를 받는 회원 및 비회원 
      ② 이용계약 : 서비스 이용과 관련하여 도와 이용자간에 체결하는 계약 
      ③ 가입 : 도가 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용
         계약을 완료시키는 행위 
      ④ 회원 : 이 약관에 동의하고 사이트의 회원가입에 필요한 개인정보(실명확인)를 제공하여 회원 등록을 
         한 자 
      ⑤ ID(회원번호) : 회원 식별과 회원의 서비스 이용을 위하여 이용자가 선정하고 농업기계임대사업소가 승인하는 
         영문자와 숫자의 조합(하나의 주민등록번호에 하나의 ID만 발급 가능함) 
      ⑥ PASSWORD(비밀번호) : 회원의 정보 보호를 위해 이용자 자신이 설정한 영문자와 숫자의 조합 
      ⑦ 이용해지 : 농업기계임대사업소 또는 회원이 서비스 이용이후 그 이용계약을 종료시키는 의사표시 
     
    제4조(약관 외 준칙) 이 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신망이용촉진및정보보호등에관한법률, 정보통신윤리위원회 심의규정, 정보통신 윤리강령, 프로그램보호법 등 기타 대한민국의관련법령과 상관습에 의합니다.  
      
     
    제2장  서비스 이용계약  
     
    제5조(이용계약의 성립) 이용계약은 이용자인 회원의 이용신청과 이에 대한 도의 승낙으로 성립됩니다. 
     
    제6조(이용신청) 이용신청은 서비스의 회원정보 화면에서 이용자가 농업기계임대사업소에서 요구하는 가입신청 양식에 개인의 신상정보를 기록하여 신청합니다.  
     
    제7조(이용신청의 승낙) 
      ① 회원이 제6조의 신청서에서 정한 사항을 정확히 기재하여 이용신청을 하였을 경우에 특별한 사정이 없는 한 서비스 이용신청을 승낙합니다. 
      ② 다음 각 호에 해당하는 경우에 대하여는 그 신청에 대한 제한 사유가 해소될 때까지 승낙을 유보 또는 일부 서비스 이용을 제한할 수 있습니다. 
        1. 농업기계임대사업소의 설비의 여유가 없는 경우
        2. 농업기계임대사업소의 기술상 지장이 있는 경우
        3. 내용이 허위(차명, 비실명, 주민등록번호 도용 등)인 것으로 판명되거나, 그러하다고 의심할만한 합리적인 사유가 발생할 경우 
        4. 기타 농업기계임대사업소가 필요하다고 인정하는 경우 
      ③ 다음 각 호에 해당하는 경우에는 이용 승낙을 하지 않을 수 있습니다.  
        1. 본인의 실명으로 신청하지 않았을 때 
        2. 다른사람의 명의를 사용하여 신청하였을 때 
        3. 이용신청의 내용을 허위로 기재한 경우 
        4. 사회의 안녕 질서 또는 미풍양속을 저해할 목적으로 이용하였을 때 
        5. 기타 농업기계임대사업소가 정한 이용신청 요건에 미비 되었을 때  
     
    제8조(계약사항의 변경) 회원은 회원정보관리를 통해 언제든지 자신의 정보를 열람하고 수정할 수 있습니다. 회원은 이용신청 시 기재한 사항이 변경되었을 때에는 수정을 하여야 하며, 수정하지 아니하여 발생하는 문제의 책임은 회원에게 있습니다. 
     
     
    제3장 서비스 제공 및 이용 
     
    제9조 (서비스 이용) 
      ① 농업기계임대사업소는 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정된 일자부터 서비스를 개시합니다. 
      ② 농업기계임대사업소의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 사이트에 공시하거나 회원에게 이를 통지합니다. 
      ③ 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 농업기계임대사업소의 업무상 또는 기술상의 이유로 서비스가 일시 중지될 수 있고, 또한 정기점검 등 운영상의 목적으로 도가 정한 기간에는 서비스가 일시 중지될 수 있습니다. 이러한 경우 도는 사전 또는 사후에 이를 공지합니다. 
      ④ 회원에 가입한 후라도 일부 서비스 이용 시 서비스 제공자의 요구에 따라 특정 회원에게만 제공 할 수 도 있습니다. 
      ⑤ 농업기계임대사업소는 서비스를 일정범위로 분할하여 각 범위별로 이용가능 시간을 별도로 정할 수 있습니다. 
         이 경우 그 내용을 사전에 공지합니다. 
     
    제10조 (서비스의 변경, 중지 및 정보의 저장과 사용) 
      ① 회원은 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, 농업기계임대사업소의 관리범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실에 대해 도는 아무런 책임을 지지 않음에 동의합니다. 
      ② 농업기계임대사업소가 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일전에 고지 후 서비스를 중지할 수 있으며, 이 기간동안 회원이 고지내용을 인지
         하지 못한데 대하여 도는 책임을 부담하지 아니합니다. 상당한 이유가 있을 경우 위 사전 고지 기간은 감축되거나 생략될 수 있습니다. 
         또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 농업기계임대사업소는 책임을 부담하지 아니합니다. 
      ③ 농업기계임대사업소의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항을 준용합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다. 
      ④ 농업기계임대사업소는 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 회원 또는 제3자에게 어떠한 책임도 부담하지 아니합니다. 
      ⑤ 농업기계임대사업소는 회원이 이 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 중지할 수 있습니다. 
         이 경우 농업기계임대사업소는 회원의 접속을 금지할 수 있으며, 회원이 게시한 내용의 전부 또는 일부를 임의로 삭제할 수 있습니다. 
      ⑥ 장기간 휴면 회원인 경우 안내 메일 또는 공지사항 발표 후 일정 통지기간을 거쳐 서비스 사용을 중지할 수 있습니다. 
     
    제11조 (정보의 제공 및 광고의 게재) 
      ① 농업기계임대사업소는 회원이 서비스 이용 중 필요가 있다고 인정되는 다양한 정보 및 광고에 대해서는 메일이나 서신우편, SMS, 전화 등의 방법으로 회원에게 제공할 수 있으며, 만약 원치 않는 정보를 수신한 경우 회원은 이를 수신거부 할 수 있습니다. 
      ② 농업기계임대사업소는 서비스의 운용과 관련하여 서비스화면, 홈페이지, 메일 등에 광고 등을 게재할 수 있으며, 농업기계임대사업소는 서비스를 이용하고자 하는 회원이 이 광고게재에 대하여 동의하는 것으로 간주합니다. 
      ③ 농업기계임대사업소는 서비스 상에 게재되어 있거나 서비스를 통한 광고주와의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않습니다 
     
    제12조 (게시물 또는 내용물의 삭제) 
      ① 농업기계임대사업소는 회원이 게시하거나 등록하는 서비스 내의 모든 내용물이 다음 각 호의 경우에 해당 된다고 판단되는 경우 사전 통지 없이 삭제할 수 있으며, 이에 대해 농업기계임대사업소는 어떠한 책임도 지지 않습니다. 
        1. 농업기계임대사업소, 다른 회원 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는 내용인 경우 
        2. 공공질서 및 미풍양속에 위반되는 내용인 경우 
        3. 범죄적 행위에 결부된다고 인정되는 내용일 경우 
        4. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우 
        5. 서비스 성격에 부합하지 않는 정보의 경우 
        6. 기타 관계 법령 및 도에서 정한 규정 등에 위배되는 경우 
        7. 게시된 내용이 약관에 위배되거나 상용 또는 비합법적, 불건전한 내용일 경우 
      ② 농업기계임대사업소는 서비스에 게시된 내용을 사전 통지한 날로부터 3일 경과후 편집, 이동할 수 있는 권리를 보유합니다. 
      ③ 농업기계임대사업소는 게시된 내용이 일정기간 이상 경과되어, 게시물로써의 효력을 상실하여 그 존치 목적이 불분명한 경우 공지사항 발표 후 1주일간의 통지기간을 거쳐 해당 게시물을 삭제할 수 있습니다. 
     
    제13조 (게시물의 저작권) 
      ① 회원이 서비스 내에 게시한 게시물의 저작권은 회원에게 있으며, 농업기계임대사업소는 다른 서비스에서의 게재 등 활용할 수 있습니다. 
      ② 회원의 게시물이 다른사람의 저작권, 프로그램 저작권 등을 침해함으로써 발생하는 민, 형사상의 책임은 전적으로 회원이 부담하여야 합니다. 
      ③ 회원은 서비스를 이용하여 얻은 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다. 
     
    제14조 (농업기계임대사업소의 소유권) 
      ① 농업기계임대사업소가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타권리는 농업기계임대사업소에게 소유권이 있습니다. 
      ② 회원은 농업기계임대사업소가 명시적으로 승인한 경우를 제외하고는 제1항 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정행위, 상업적 이용행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다. 
     
     
    제4장 계약 당사자의 의무 
     
    제15조 (회원의 의무 및 정보보안) 
      ① 회원은 서비스 이용을 위해 가입할 경우 현재의 사실과 일치하는 완전한 정보(이하 "가입정보"라 한다)를 제공하셔야 합니다. 또한 가입정보에 변경이 발생할 경우 즉시 갱신하셔야 합니다. 
      ② 회원이 서비스 사용을 위한 가입절차를 완료하시면 ID와 PASSWORD를 받게 됩니다. 
        1. 회원은 ID, PASSWORD 분실 등으로 인해 발생한 손해는 농업기계임대사업소가 책임을 지지 않습니다. 
        2. 회원은 매 접속 종료 시 확실히 로그아웃을 하셔야 합니다. 
      ③ 회원은 서비스를 이용하면서 다음과 같은 행위를 할 수 없습니다. 
        1. 다른사람(소수를 포함)에게 위해를 가하는 행위 
          가. 다른사람의 ID, PASSWORD, 주민등록번호 도용 및 다른사람으로 가장하는 행위 
          나. 다른사람과의 관계를 허위로 명시하는 행위 
          다. 다른사람을 비방할 목적으로 사실 또는 허위의 사실을 적시하여 명예를 훼손하는 행위 
          라. 자기 또는 다른사람에게 재산상의 이익을 주거나 다른사람에게 손해를 가할 목적으로 허위의 정보를 유통시키는 행위 
          마. 수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글이나 화상 또는 영상을 계속하여 상대방에게 도달하게 하여 상대방의 일상적 생활을 방해하는 행위 
          바. 농업기계임대사업소의 사전 승낙 없이 서비스를 이용한 영리행위 
          사. 다른사람의 정보통신서비스 이용명의를 도용하여 사용하는 행위 
        2. 불필요하거나 승인되지 않은 광고, 판촉물을 게재하거나, 스팸메일, 도배글, 피라미드 조직 등을 게재 또는 전자우편으로 보내는 행위 
        3. 저속 또는 음란한 데이터, 텍스트, 소프트웨어, 음악, 사진, 그래픽, 비디오 메시지 등(이하 "콘텐츠")을 게시, 게재 또는 전자우편으로 보내는 행위 
        4. 권리(지적재산권을 포함한 모든 권리)가 없는 콘텐츠를 게시, 게재 또는 전자우편으로 보내는 행위 
        5. 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비를 파괴, 방해 또는 기능을 제한하기 위한 소프트웨어 바이러스를 게시, 게재 또는 전자우편으로 보내는 행위 
        6. 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시, 게재, 전자우편으로 보내는 행위 등 다른 사용자의 개인정보를 수집 또는 저장하는 행위 
        7. 재물을 걸고 도박하거나 사행행위를 하는 행위 
        8. 윤락행위를 알선하거나 음행을 매개하는 내용의 정보를 유통시키는 행위 
        9. 기타 불법적이거나 부당한 행위 
      ④ 회원은 이 약관 및 관계법령에서 규정한 사항을 준수하여야 합니다. 
     
    제16조 (농업기계임대사업소의 의무) 
      ① 농업기계임대사업소는 특별한 사정이 없는 한 회원이 신청한 서비스에 대해 1근무일 이내에 서비스를 이용할 수 있도록 합니다. 
      ② 농업기계임대사업소는 이 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를 제공할 의무가 있습니다. 
      ③ 농업기계임대사업소가 제공하는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 도의 고의나 중과실에 의해 발생한 경우에 한하여 도에서 책임을 부담하며, 그 책임의 범위는 통상손해에 한합니다. 
      ④ 농업기계임대사업소는 회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 신속히 처리하여야 합니다. 다만, 신속한 처리가 곤란한 경우에는 회원에게 그 사유와 처리일정을 통보하여야 합니다. 
      ⑤ 농업기계임대사업소는 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관해서는 관련법령 및 제16조에 제시된 내용을 지킵니다. 
     
    제17조 (개인정보보호정책) 
      ① 농업기계임대사업소는 회원가입 또는 서비스이용 신청시 회원이 제공하는 정보를 통하여 회원에 관한 정보를 수집하며, 회원의 개인정보는 본 이용계약의 이행과 본 이용계약상의 서비스제공을 위한 목적으로 이용합니다. 
      ② 농업기계임대사업소는 서비스 제공과 관련하여 취득한 회원의 정보를 본인의 승낙 없이 제3자에게 누설 또는 배포할 수 없으며 상업적 목적으로 사용할 수 없습니다. 다만, 다음의 각 호의 경우에는 그러하지 아니합니다. 
        1.관계 법령에 의하여 수사상의 목적으로 관계기관으로부터 요구가 있는 경우 
        2.정보통신윤리위원회의 요청이 있는 경우 
        3.기타 관계법령에서 정한 절차에 따른 요청이 있는 경우 
      
     
    제5장 계약해지 
     
    제18조 (계약해지 및 이용제한) 
      ① 회원이 이용계약을 해지하고자 하실 때에는 회원 본인이 직접 인터넷을 통해 당 사이트에 해지 신청을 하여야 합니다. 
      ② 농업기계임대사업소는 보안 및 ID정책, 서비스의 원활한 제공 등과 같은 이유로 회원의 ID 및 PASSWORD 변경을 요구하거나 제한 할 수 있습니다. 
      ③ 농업기계임대사업소는 회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전통지 없이 이용계약을 해지할 수 있습니다. 
        1. 비 실명가입, 주민등록번호의 도용 등 회원이 제공한 데이터가 허위임이 판명된 경우 
        2. 범죄적 행위에 관련되는 경우 
        3. 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우 
        4. 다른사람의 서비스 아이디 및 비밀 번호를 도용한 경우 
        5. 다른사람의 명예를 손상시키거나 불이익을 주는 경우 
        6. 같은 사용자가 다른 아이디로 이중 등록을 한 경우 
        7. 서비스에 위해를 가하는 등 서비스의 건전한 이용을 저해하는 경우 
        8. 기타 관련법령이나  제주특별자치도가(이) 정한 이용조건에 위배되는 경우 
      ④ 이용해지에 따른 회원의 개인정보는 서버에서 완전 삭제됩니다. 
     
     
    제6장 기  타 
     
    제19조 (요금 및 유료정보) 서비스 이용은 기본적으로 무료입니다. 단, 서비스에서 정한 별도의 유료 정보와 유료서비스에 대해서는 그러하지 아니합니다. 
     
    제20조 (양도금지)  회원은 서비스의 이용권한, 기타 이용계약상의 지위를 다른사람에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다. 
     
     
    제7장 손해배상 등 
     
    제21조 (손해배상) 농업기계임대사업소는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 농업기계임대사업소의 중대한 과실에 의한 경우를 제외하고 이에 대하여 책임을 부담하지 아니합니다. 
     
    제22조 (면책조항) 
      ① 농업기계임대사업소는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 제21조의 규정에 불구하고 서비스 제공에 대한 책임이 면제됩니다. 
      ② 농업기계임대사업소는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다. 
      ③ 농업기계임대사업소는 회원의 귀책사유로 인한 서비스이용의 장애에 대하여 책임을 지지 않습니다. 
      ④ 농업기계임대사업소는 회원이 서비스를 이용하여 기대하는 이익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다. 
      ⑤ 농업기계임대사업소는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않으며, 회원 상호간 및 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없고, 이로 인한 손해를 배상 할 책임도 없습니다. 
     
    제23조 (통지)
      ① 통지를 하는 경우 회원이 도에 등록한 전자우편 주소로 할 수 있습니다.
      ② 불특정다수 회원에게 통지를 해야 할 경우 공지 게시판을 통해 7일 이상 게시함으로써 개별 통지에 갈음할 수 있습니다.
     
    제24조 (관할법원) 
      ① 서비스 이용과 관련하여 도와 회원 사이에 분쟁이 발생한 경우, 농업기계임대사업소와 회원은 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다 
      ② 제1항의 규정에도 불구하고 서비스 이용으로 발생한 분쟁에 대하여 소송이 제기될 경우 도 소재지를 관할하는 법원을 관할법원으로 합니다. 
     
    부 칙
    이 약관은 2014년  1월  일부터 시행합니다.
          `,
    `■ 개인정보 수집 및 이용안내
    렛츠농사 홈페이지는 여러분이 회원에 가입하시거나 게시판을 이용하시고자 할 경우에 필요한 최소한의 개인정보를 수집하며, 이에 대한 동의를 얻고 있습니다.
    정보주체는 개인정보 수집 동의를 거부하실 수 있습니다. 다만 이 경우 회원가입이 제한되며 회원제 서비스를 이용할 수 없습니다.
    
    1. 수집하는 개인정보 항목
       - 필수항목 :  아이디, 이름, 비밀번호, 지번주소, 도로명주소, 전화번호, 휴대폰번호
       - 컴퓨터에 의해 자동 수집되는 항목 : 접속IP정보, 서비스이용기록, 접속로그
    
    2. 개인정보의 수집 및 이용목적
    농기계 임대사업소  홈페이지는 수집한 개인정보를 다음의 목적을 위해 활용합니다. 
       - 회원관리 : 회원제 서비스 이용에 따른 본인 확인, 불만처리 등 민원처리, 고지사항 전달
    3. 개인정보의 보유 및 이용기간
    농기계 임대사업소 홈페이지의 회원정보 보유기간은 2년이며, 회원가입일로부터 2년이 경과하거나 회원탈퇴시 보유하고 있는 개인정보(메일 자료 포함)를 지체없이 파기합니다. 
    단, 2년 경과시 개인정보 수집 및 이용 재동의절차를 거쳐 개인정보의 보유 및 이용기간을 연장할 수 있습니다.`,

    `1. 목적
    - 렛츠농사 홈페이지는 회원들에게 보다 다양한 도청 소식을 홍보하고, 각종 설문조사, 이벤트 시행을 위하여 홈페이지 회원의 개인정보를 활용할 수 있습니다.
    
    2. 수집 및 활용 관련 정보
    - 수집항목 : 이름, 휴대폰번호, 주소
    - 활용대상 : 소식, 설문조사, 이벤트
    
    3. 개인정보의 보유 및 이용기간
    - 렛츠농사 홈페이지의 회원정보 보유기간은 2년이며, 회원가입일로부터 2년이 경과하거나 회원탈퇴시 보유하고 있는 개인정보를 지체없이 파기합니다. 
    단, 2년 경과시 개인정보 수집 및 이용 재동의절차를 거쳐 개인정보의 보유 및 이용기간을 연장할 수 있습니다.`
  ]

  const allBtnEvent = () => {
    if (allChecked === false) {
      setAllChecked(true);
      setAllCheckedClass(check_o);

      setUseChecked(true);
      setUseCheckedClass(check_o);

      setInfoChecked(true);
      setInfoCheckedClass(check_o);

      setAdChecked(true);
      setAdCheckedClass(check_o);
    } else {
      setAllChecked(false);
      setAllCheckedClass(check_x);

      setUseChecked(false);
      setUseCheckedClass(check_x);

      setInfoChecked(false);
      setInfoCheckedClass(check_x);

      setAdChecked(false);
      setAdCheckedClass(check_x);
    }
    console.log(allChecked, useChecked, infoChecked, adChecked, nextbtn)
  }

  const useBtnEvent = () => {
    if (useChecked === false) {
      setUseChecked(true);
      setUseCheckedClass(check_o);
    } else {
      setUseChecked(false);
      setUseCheckedClass(check_x);
    }
  }

  const infoBtnEvent = () => {
    if (infoChecked === false) {
      setInfoChecked(true);
      setInfoCheckedClass(check_o);
    } else {
      setInfoChecked(false);
      setInfoCheckedClass(check_x);
    }
  }

  const adBtnEvent = () => {
    if (adChecked === false) {
      setAdChecked(true);
      setAdCheckedClass(check_o);
    } else {
      setAdChecked(false);
      setAdCheckedClass(check_x);
    }
  }

  const onClick = () => {
    setShowPhone(true);
    console.log(showPhone, phoneCheck);
  }

  useEffect(() => {
    if (useChecked === true && infoChecked === true && adChecked === true) {
      setAllChecked(true);
      setAllCheckedClass(check_o);
    } else {
      setAllChecked(false)
      setAllCheckedClass(check_x);
    }
  }, [useChecked, infoChecked, adChecked])

  useEffect(() => {
    if (useChecked === true && infoChecked === true) {
      setNextBtn(false);
      setBtnClass(sign_up.next_btn_o);

    } else {
      setNextBtn(true);
      setBtnClass(sign_up.next_btn_x);
    }
  }, [useChecked, infoChecked])

  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberData = {
    PhoneNumber: phoneNumber
  }
  sessionStorage.setItem('phoneNumberData', JSON.stringify(phoneNumberData));

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

      <main className={sign_up.main_agreement}>

        <div className={sign_up.agree}>약관동의</div>

        <div className={sign_up.agree1}>
          이용약관 및 개인정보처리방침 안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.
        </div>

        <form className={sign_up.form1}>
          <label htmlFor="allchecked" className={sign_up.allchecked}>
            <img src={allcheckedClass}></img>
            <Input id="allchecked" type="checkbox" checked={allChecked} onChange={allBtnEvent}
              className={sign_up.check} />
            전체 동의하기
          </label>


          <label htmlFor="usechecked" className={sign_up.checked}>
            <div><span style={{ color: "red" }}>[필수]</span> 이용약관동의</div>
            <div className={sign_up.agree_div}>
              <div>
                {agree_divs[0]}
              </div>
            </div>

            <div className={sign_up.agree_check}>
              <img style={{ width: '20px', height: '20px' }} src={usecheckedClass}></img>
              <Input id="usechecked" type="checkbox" checked={useChecked} onChange={useBtnEvent}
                className={sign_up.check} />
              동의합니다
            </div>
          </label>

          <label htmlFor="infochecked" className={sign_up.checked}>
            <div><span style={{ color: "red" }}>[필수]</span> 개인정보 수집 및 이용</div>
            <div className={sign_up.agree_div}>{agree_divs[1]}</div>

            <div className={sign_up.agree_check}>
              <img style={{ width: '20px', height: '20px' }} src={infocheckedClass}></img>
              <Input id="infochecked" type="checkbox" checked={infoChecked} onChange={infoBtnEvent}
                className={sign_up.check} />
              동의합니다
            </div>
          </label>

          <label htmlFor="adchecked" className={sign_up.checked}>
            <div><span style={{ color: "gray" }}>[선택]</span> 홍보 및 이벤트 활용</div>
            <div className={sign_up.agree_div}>{agree_divs[2]}</div>

            <div className={sign_up.agree_check}>
              <img style={{ width: '20px', height: '20px' }} src={adcheckedClass}></img>
              <Input id="adchecked" type="checkbox" checked={adChecked} onChange={adBtnEvent}
                className={sign_up.check} />
              동의합니다
            </div>
          </label>
        </form>

        <Button text="다음" onClick={onClick} disabled={nextbtn} className={btnClass}></Button>

        <PhoneCode
          showModal_value={showPhone}
          setShowModal_value={setShowPhone}
          phoneCheck={phoneCheck}
          setPhoneCheck={setPhoneCheck}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          next_page="inputs"
          >
        </PhoneCode>
      </main>

    </div>
  )
};


export default Sign_up_agreements;

//componets의 속성값 제대로 확인하고

//label과 input의 htmlFor과 id를 맞춘다면
// => label내의 모든 요소들이 클릭대상이 됨(so img도 클릭했을 때 바뀔 수 있는 것)
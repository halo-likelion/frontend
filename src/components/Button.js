import PropTypes from "prop-types";
//styles객체에 ./Button.module.css를 대입하는 것
//이런식으로 style의 클래스를 다른 파일에다가도 대입 가능
//+ 뿐만 아니라 클래스 이름이 중복되더라도 서로 다른 파일에서 import된거면 사용 가능(밑에 title클래스 참조)
//how? => html내에서는 랜덤 방식으로 클래스가 생성되기에ㅇㅇ rendering할 때 중복될 일이 없는 것

function Button(props){  
    return <button 
    onClick = {props.onClick} 
    className={props.className} //className={props.className}에서 수정함
    type = {props.type}
    disabled={props.disabled}
    value={props.value}
    style={props.style}
    >
        {props.text}
        </button>;
}

Button.propTypes = {    // const MemorizedBtn = React.memo(Btn)
                        //Btn.propTypes = {}을 통해서 하던 일을 여기선 다른 파일에서 import해서 처리할 수 있음
    text : PropTypes.string.isRequired,

}

export default Button;
import PropTypes from "prop-types";
function Input(props){
    return (
        <input 
        id = {props.id} 
        name={props.name}
        type = {props.type}
        onChange={props.onChange} 
        className={props.className} 
        placeholder={props.placeholder}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        style={props.style}
        >
            
        </input>
    );
}
export default Input;
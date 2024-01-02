import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../img/calendar.svg"

function CustomDatepicker({ value, onClick, style}) {
  return (
    <div onClick={onClick} style={{ display: "inline-block", cursor: "pointer" }}>
      <img src={calendar} alt="Open Calendar" width="32" height="32" style={style}/>
      <input type="hidden" value={value} readOnly />
    </div>
  );
}

export default CustomDatepicker;
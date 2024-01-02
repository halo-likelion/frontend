import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { useState } from 'react';

import button from "./Button.module.css";


function PostCode(props) {
    const [postModal, setPostModal] = useState(false);

    const openPost = (event) => {
        event.preventDefault();
        setPostModal(true);
    }
    const closePost = (event) => {
        setPostModal(false);
    }

    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data);
        console.log("in postcode",fullAddress);
        console.log(data.zonecode);
        props.setItem(fullAddress);
        setPostModal(false);

        const event = {
            target: {
              name: "address",
              value: fullAddress,
            },
          };
        props.onChange(event);
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: "80%",
        height: "80%",
        padding: "7px",
        border: "2px solid #666"
    };

    



    return (
        <div>
            <button type='button' onClick={openPost} className={button.zip_search}>주소검색</button>
            {postModal &&
                (<div>
                    <button className={button.postCloseBtn} onClick={closePost}>닫기</button>
                    <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
                </div>
                )}
        </div>
    )
}

export default PostCode;
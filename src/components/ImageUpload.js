import React, { useState , useRef } from "react";
import axios from "axios";

import plus from "../img/plus.svg";

import Input from "./Input";
import Button from "./Button";


import image from "./Image.module.css";

function ImageUpload(props) {
    const [imageUrl, setImageUrl] = useState("");
    const [imgUp, setImgUp] = useState(false);
    const [imageName, setImageName] = useState(null);

    const handleChange = (event) => {
        const image_file = event.target.files[0];
        if (image_file) {
            setImageName(image_file);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setImgUp(true);
            console.log(image_file);
            console.log("URL:",imageUrl);
        }
    };

    const formatDate = (date) => {
        return date.toUTCString();
    };



    return (
        <div>
            {!imgUp ?
                <label htmlFor="select">
                    <img src={plus} className={image.select} alt="custom-button" />
                    <Input
                        id="select"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        className={image.select}
                        style={{ display: "none" }}>
                    </Input>
                </label>

                :
                (
                    <div>
                        <img src={imageUrl} className={image.upload}></img>
                        <br></br>
                        <label htmlFor="revise">
                            <div>수정하기</div>
                            <Input
                                id="revise"
                                type="file"
                                onChange={handleChange}
                                accept="image/*"
                                className={image.select}
                                style={{ display: "none" }}>
                            </Input>
                        </label>
                    </div>
                )}
                <Button text="Upload"></Button>
        </div>
    );
};

export default ImageUpload;
import React, { useState, useEffect } from "react";
import Button from './Button';
import Input from './Input';

import button from './Button.module.css';
import itempicker from './ItemPicker.module.css';
import home from "../routes/Home.module.css";

import readingGlass from "../img/readingGlass.svg";

function ItemPicker({ Array_id,
    itemArray,
    Item,
    setItem,
    btn,
    showPlaceholder,
    setShowPlaceholder, }) {
    const [showModal, setShowModal] = useState(false);
    const [showModal_1, setShowModal_1] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (event) => {
        event.preventDefault();
        setShowModal(true);
        setCurrentIndex(0);
    };

    const closeModal = (event) => {
        setShowModal(false);
    }

    const handleItemClick = (event) => {
        event.preventDefault();
        const region = event.target.textContent.split("(");
        const suffix = region.length > 1 ? "(" + region[1] : "";
        const selectedItem = region[0] + suffix;
        if (selectedItem === "해당없음") {
            setShowPlaceholder(false);
        }

        if (Array_id !== 1 || selectedItem === "경기도") {
            setItem(selectedItem === "해당없음" ? null : selectedItem);
            closeModal();
            event.target.style.backgroundColor = "#FFF";
        } else {
            setShowModal_1(true);
        }
    };

    const closeModal_1 = (event) => {
        event.preventDefault();
        setShowModal_1(false);
    }

    const dividedArrays = [];
    for (let i = 0; i < itemArray.length; i += 6) {
        dividedArrays.push(itemArray.slice(i, i + 6));
    }

    const dividedArrays_img = [];
    for (let i = 0; i < itemArray.length; i += 2) {
        dividedArrays_img.push(itemArray.slice(i, i + 2));
    }

    const handlePageClick = (index) => {
        setCurrentIndex(index);
    };

    const hasNextPage = currentIndex + 1 < dividedArrays.length;
    const hasPrevPage = currentIndex > 0;

    const hasNextPage_img = currentIndex + 1 < dividedArrays_img.length;
    const hasPrevPage_img = currentIndex > 0;

    function doNothing(event) {
        event.preventDefault();
    };

    const Modal_1 = () => {
        useEffect(() => {
            const setContentBoxes = (index) => {
                const contentBoxes = Array.from(document.querySelectorAll(`[id^="content_box_${Array_id}_"]`));
                const currentContentBoxes = contentBoxes.slice(index * 6, index * 6 + 6);
                const maxWidth = currentContentBoxes.reduce((maxWidth, box) => Math.max(maxWidth, box.clientWidth), 0);
                currentContentBoxes.forEach((box) => (box.style.width = `${maxWidth}px`));
            };

            setContentBoxes(currentIndex);
        }, [currentIndex]);

        return (
            <div className={itempicker.all}>
                <div className={itempicker.info_up}>
                    <Button
                        className={button.img_buttonX}
                        onClick={closeModal}>
                    </Button>
                    <div className={itempicker.modal_title}>특별시/광역시/도</div>
                    <hr className={itempicker.modal_hr}></hr>
                </div>

                <div className={itempicker.box}>

                    <Input className={itempicker.input} type='text' name='region1' required />
                    {dividedArrays[currentIndex].map((item, index) => (
                        <div
                            key={item}
                            id={`content_box_${Array_id}_${index}`}
                            className={itempicker.contents}
                            onClick={handleItemClick}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div className={itempicker.content_box}>
                                {item}
                            </div>
                        </div>
                    ))}
                    <div className={itempicker.btn_page}>
                        {hasPrevPage && (
                            <button
                                key={currentIndex - 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex - 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex}
                            </button>
                        )}
                        <button
                            key={currentIndex}
                            className={itempicker.btn}
                            onClick={doNothing}
                            style={{
                                marginRisght: '5px',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {currentIndex + 1}
                        </button>
                        {hasNextPage && (
                            <button
                                key={currentIndex + 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex + 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex + 2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    function Modal_2() {
        useEffect(() => {
            const setContentBoxes = (index) => {
                const contentBoxes = Array.from(document.querySelectorAll(`[id^="content_box_${Array_id}_"]`));
                const currentContentBoxes = contentBoxes.slice(index * 6, index * 6 + 6);
                const maxWidth = currentContentBoxes.reduce((maxWidth, box) => Math.max(maxWidth, box.clientWidth), 0);
                currentContentBoxes.forEach((box) => (box.style.width = `${maxWidth}px`));
            };

            setContentBoxes(currentIndex);
        }, [currentIndex]);

        return (
            <div className={itempicker.all}>
                <div className={itempicker.info_up}>
                    <Button
                        className={button.img_buttonX}
                        onClick={closeModal}>
                    </Button>
                    <div className={itempicker.modal_title}>시/군/구</div>
                    <hr className={itempicker.modal_hr}></hr>
                </div>

                <div className={itempicker.box}>

                    <Input className={itempicker.input} type='text' name='region1' required />

                    {dividedArrays[currentIndex].map((item, index) => (
                        <div
                            key={item}
                            id={`content_box_${Array_id}_${index}`}
                            className={itempicker.contents}
                            onClick={handleItemClick}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div className={itempicker.content_box}>
                                {item}
                            </div>
                        </div>
                    ))}
                    <div className={itempicker.btn_page}>
                        {hasPrevPage && (
                            <button
                                key={currentIndex - 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex - 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex}
                            </button>
                        )}
                        <button
                            key={currentIndex}
                            className={itempicker.btn}
                            onClick={doNothing}
                            style={{
                                marginRisght: '5px',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {currentIndex + 1}
                        </button>
                        {hasNextPage && (
                            <button
                                key={currentIndex + 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex + 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex + 2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function Modal_3() {
        useEffect(() => {
            const setContentBoxes = (index) => {
                const contentBoxes = Array.from(document.querySelectorAll(`[id^="content_box_${Array_id}_"]`));
                const currentContentBoxes = contentBoxes.slice(index * 6, index * 6 + 6);
                const maxWidth = currentContentBoxes.reduce((maxWidth, box) => Math.max(maxWidth, box.clientWidth), 0);
                currentContentBoxes.forEach((box) => (box.style.width = `${maxWidth}px`));
            };

            setContentBoxes(currentIndex);
        }, [currentIndex]);

        return (
            <div className={itempicker.all}>
                <div className={itempicker.info_up}>
                    <Button
                        className={button.img_buttonX}
                        onClick={closeModal}>
                    </Button>
                    <div className={itempicker.modal_title}>임대사업소</div>
                    <hr className={itempicker.modal_hr}></hr>
                </div>

                <div className={itempicker.box}>

                    <Input className={itempicker.input} type='text' name='region1' required />

                    {dividedArrays[currentIndex].map((item, index) => (
                        <div
                            key={item}
                            id={`content_box_${Array_id}_${index}`}
                            className={itempicker.contents}
                            onClick={handleItemClick}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div className={itempicker.content_box}>
                                {item}
                            </div>
                        </div>
                    ))}
                    <div className={itempicker.btn_page}>
                        {hasPrevPage && (
                            <button
                                key={currentIndex - 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex - 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex}
                            </button>
                        )}
                        <button
                            key={currentIndex}
                            className={itempicker.btn}
                            onClick={doNothing}
                            style={{
                                marginRisght: '5px',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {currentIndex + 1}
                        </button>
                        {hasNextPage && (
                            <button
                                key={currentIndex + 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex + 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex + 2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function Modal_4() {
        useEffect(() => {
            const setContentBoxes = (index) => {
                const contentBoxes = Array.from(document.querySelectorAll(`[id^="content_box_${Array_id}_"]`));
                const currentContentBoxes = contentBoxes.slice(index * 2, index * 2 + 2);
                const maxWidth = currentContentBoxes.reduce((maxWidth, box) => Math.max(maxWidth, box.clientWidth), 0);
                currentContentBoxes.forEach((box) => (box.style.width = `${maxWidth}px`));
            };

            setContentBoxes(currentIndex);
        }, [currentIndex]);

        return (
            <div className={itempicker.all}>
                <div className={itempicker.info_up}>
                    <Button
                        className={button.img_buttonX}
                        onClick={closeModal}>
                    </Button>
                    <div className={itempicker.modal_title}>임대사업소</div>
                    <hr className={itempicker.modal_hr}></hr>
                </div>

                <div className={itempicker.box}>

                    <Input className={itempicker.input} type='text' name='region1' required />

                    {dividedArrays_img[currentIndex].map((item, index) => (
                        <div
                            key={item}
                            id={`content_box${Array_id}_${index}`}
                            className={itempicker.contents_img}
                            onClick={handleItemClick}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div className={itempicker.content_box_img}>
                                <img src="#" alt={item} />
                                <p></p>
                            </div>
                        </div>

                    ))}
                    <div className={itempicker.btn_page}>
                        {hasPrevPage && (
                            <button
                                key={currentIndex - 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex - 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex}
                            </button>
                        )}
                        <button
                            key={currentIndex}
                            className={itempicker.btn}
                            onClick={doNothing}
                            style={{
                                marginRisght: '5px',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {currentIndex + 1}
                        </button>
                        {hasNextPage && (
                            <button
                                key={currentIndex + 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex + 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex + 2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function Modal_5() {
        useEffect(() => {
            const setContentBoxes = (index) => {
                const contentBoxes = Array.from(document.querySelectorAll(`[id^="content_box_${Array_id}_"]`));
                const currentContentBoxes = contentBoxes.slice(index * 6, index * 6 + 6);
                const maxWidth = currentContentBoxes.reduce((maxWidth, box) => Math.max(maxWidth, box.clientWidth), 0);
                currentContentBoxes.forEach((box) => (box.style.width = `${maxWidth}px`));
            };

            setContentBoxes(currentIndex);
        }, [currentIndex]);

        return (
            <div className={itempicker.all}>
                <div className={itempicker.info_up}>
                    <Button
                        className={button.img_buttonX}
                        onClick={closeModal}>
                    </Button>
                    <div className={itempicker.modal_title}>특별시/광역시/도</div>
                    <hr className={itempicker.modal_hr}></hr>
                </div>

                <div className={itempicker.box_last}>

                    <Input className={itempicker.input} type='text' name='region1' required />
                    {dividedArrays[currentIndex].map((item, index) => (
                        <div
                            key={item}
                            id={`content_box_${Array_id}_${index}`}
                            className={itempicker.contents}
                            onClick={handleItemClick}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            <div className={itempicker.content_box}>
                                {item}
                            </div>
                        </div>
                    ))}
                    <div className={itempicker.btn_page}>
                        {hasPrevPage && (
                            <button
                                key={currentIndex - 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex - 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex}
                            </button>
                        )}
                        <button
                            key={currentIndex}
                            className={itempicker.btn}
                            onClick={doNothing}
                            style={{
                                marginRisght: '5px',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            {currentIndex + 1}
                        </button>
                        {hasNextPage && (
                            <button
                                key={currentIndex + 1}
                                className={itempicker.btn}
                                onClick={() => handlePageClick(currentIndex + 1)}
                                style={{ cursor: 'pointer', marginRight: '5px' }}
                            >
                                {currentIndex + 2}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 수정: className='Sign_up-button1'에서 className={itempicker.select}
    return (
        <div>
            <Button
                onClick={openModal}
                text="선택"
                className={button.select}
                disabled={btn}
                style={{ cursor: "pointer" }}

            />

            {showModal && (
                <div className={itempicker.modal}>
                    {Array_id === 1 ? <Modal_1 /> : null}
                    {Array_id === 2 ? <Modal_2 /> : null}
                    {Array_id === 3 ? <Modal_3 /> : null}
                    {Array_id === 4 ? <Modal_4 /> : null}
                    {Array_id === 5 ? <Modal_5 /> : null}
                </div>


            )}

            {showModal_1 && (
                <div className={itempicker.backdrop}>
                    <div className={itempicker.modal_1_close}>
                        <Button className={button.img_buttonX} onClick={closeModal_1}></Button>
                        추후 서비스 예정
                    </div>
                </div>
            )}
        </div>
    );
};


export default ItemPicker;

//onClick={closeModal} => ()괄호를 붙이면 함수실행결과이고,
//이벤트핸들러 함수인 onClick에 함수변수를 넣고싶다면 말그대로 그냥 {closeModal}을 쓸 것
//아니면 {()=>closeModal()} 이렇게 써야함

//props대신 인자 쓸거면 중괄호 까먹지 말고

//조건부 부분은 중괄호로 감싸줘야함
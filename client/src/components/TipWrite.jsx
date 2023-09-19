import React, { useState } from 'react'
import style from "../css/TipWrite.module.css"
import QuillTest from './QuillTest';
import 'bootstrap/dist/css/bootstrap.min.css';


const TipWrite = () => {

    // 포지션 함수
    function changeColor(value) {
        if (position.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setposition(position.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setposition([...position, value]);
        }
    }

    const [position, setposition] = useState([]);
    return (


        <div>
            <div className={style.Tip_content_box1}>
                <div className={style.Tip_content_box2}>
                    <form>
                        <div className="mb-3">
                            <div className={style.Tip_content_box_font}>
                                <h2>Tip 🥇</h2>
                            </div>
                            <h4>제목</h4>
                            <input className="form-control" type="text" name="name" placeholder='글제목을 입력하세요.' />
                        </div>
                        <div className="mb-3">
                            <h4>카테고리</h4>
                        </div>
                        <button
                            className={style.Tip_button_container}
                            type="button"
                            onClick={() => changeColor('1')}
                            style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                        >
                            개발
                        </button>
                        <button
                            className={style.Tip_button_container}
                            type="button"
                            onClick={() => changeColor('2')}
                            style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                        >
                            공부
                        </button>
                        <button
                            className={style.Tip_button_container}
                            type="button"
                            onClick={() => changeColor('3')}
                            style={{ backgroundColor: position.includes('3') ? '#ABE9FF' : '' }}
                        >
                            취업
                        </button>
                        <button
                            className={style.Tip_button_container}
                            type="button"
                            onClick={() => changeColor('4')}
                            style={{ backgroundColor: position.includes('4') ? '#ABE9FF' : '' }}
                        >
                            생활 / 기타
                        </button>
                        <div className="mb-3">
                            <h4>내용</h4>
                        </div>

                        <div>
                            <QuillTest />
                        </div>

                       

                        <button className={style.submit_btn} type='submit'>
                            작성
                        </button>

                        <button className={style.submit_btn} type='text'>
                            취소
                        </button>

                    </form>
                </div>


            </div>
        </div >
    )
}

export default TipWrite
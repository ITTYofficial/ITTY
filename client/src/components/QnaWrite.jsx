import React, { useState } from 'react'
import style from "../css/QnaWrite.module.css"
import QuillTest from './QuillTest';
import 'bootstrap/dist/css/bootstrap.min.css';


const QnaWrite = () => {

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
            <div className={style.Qna_content_box1}>
                <div className={style.Qna_content_box2}>
                    <form>
                        <div className="mb-3">
                            <div className={style.Qna_content_box_font}>
                                <h2>QnA 💡</h2>
                            </div>
                            <label className="form-label" htmlFor="name">제목</label>
                            <input className="form-control" type="text" name="name" placeholder='글제목을 입력하세요.' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">카테고리</label>
                        </div>

                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('1')}
                            style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                        >
                            개발
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('2')}
                            style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                        >
                            공부
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('3')}
                            style={{ backgroundColor: position.includes('3') ? '#ABE9FF' : '' }}
                        >
                            취업
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('4')}
                            style={{ backgroundColor: position.includes('4') ? '#ABE9FF' : '' }}
                        >
                            생활 / 기타
                        </button>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">내용</label>
                            </div>

                            <div>
                                <QuillTest />
                            </div>
                       
                        <div className={style.Qna_button_box}>
                            <button type="button" className="btn btn-outline-secondary">취소</button>
                            <div className={style.Qna_space_box}></div>
                            <button type="submit" className="btn btn-primary">작성</button>
                        </div>
                    </form>
                </div>


            </div>
        </div >
    )
}

export default QnaWrite
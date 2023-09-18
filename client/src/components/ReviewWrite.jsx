import React, { useState } from 'react'
import LeftContainer from './LeftContainer'
import styles from '../css/ReviewWrite.module.css'
import QuillTest from './QuillTest';
import Button from 'react-bootstrap/Button';


const ReviewWrite = () => {

    /* 별점관련 */
    const [star, setStart] = useState(0);

    const drawStar = (event) => {
        const value = event.target.value;
        document.querySelector(`.${styles.star} span`).style.width = `${value * 10}%`;
        setStart(value);
        console.log('별확인', star);
    }
    /* 별점관련 */

    /* 키워드관련 */
    const [position, setposition] = useState([]);

    function changeColor(value) {
        if (position.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setposition(position.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setposition([...position, value]);
        }
    }
    /* 키워드관련 */

    return (
        <div className={styles.Main_container}>
            <h2>수료생 후기🧑‍🎓</h2>
            <form>
                <p>제목</p>
                <input className="form-control" type="text" placeholder='제목을 입력해주세요' />
                <p>만족도</p>
                <div className={styles.review_star}>
                    <span className={styles.star}>
                        ★★★★★
                        <span>★★★★★</span>
                        <input type="range" onChange={drawStar} value={star} step="1" min="0" max="10" /> {/* 수정된 부분 */}
                    </span>
                </div>
                <p>키워드 (중복선택 가능)</p>
                <div className={styles.keyworld_content}>
                    <button
                        type="button"
                        onClick={() => changeColor('1')}
                        style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                    >
                        강력추천
                    </button>
                    <button
                        type="button"
                        onClick={() => changeColor('2')}
                        style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                    >
                        추천
                    </button>
                    <button
                        type="button"
                        onClick={() => changeColor('3')}
                        style={{ backgroundColor: position.includes('3') ? '#ABE9FF' : '' }}
                    >
                        비추천
                    </button>
                    <button
                        type="button"
                        onClick={() => changeColor('4')}
                        style={{ backgroundColor: position.includes('4') ? '#ABE9FF' : '' }}
                    >
                        전공
                    </button>
                    <button
                        type="button"
                        onClick={() => changeColor('5')}
                        style={{ backgroundColor: position.includes('5') ? '#ABE9FF' : '' }}
                    >
                        비전공
                    </button>
                    <input type="hidden" name="position" value={position.join(',')} />
                </div>

                <p>내용</p>
                <QuillTest />

                {/* 전송 버튼 */}
                <button className={styles.submit_btn} type='submit'>
                    작성완료
                </button>

            </form>


        </div>
    )
}

export default ReviewWrite
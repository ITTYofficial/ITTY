import React, { useState } from 'react'
import LeftContainer from './LeftContainer'
import styles from '../css/ReviewWrite.module.css'

const ReviewWrite = () => {

    const [star, setStart] = useState(0);

    const drawStar = (event) => {
        const value = event.target.value;
        document.querySelector(`.${styles.star} span`).style.width = `${value * 10}%`;
        setStart(value);
        console.log('별확인', star);
    }

    return (
        <div className={styles.Main_container}>
            <h2>수료생 후기</h2>
            <form>
                <p>제목</p>
                <input type='text' placeholder='제목을 입력해주세요'></input>
                <br/><br/><br/>
                <p>만족도 (5점만점)</p>
                <input type="text" placeholder='숫자를 입력 해 주세요'/>
                <hr/>
                <p>만족도</p>
                <input type='range'></input>
                <hr/>
                <p>만족도</p>
                <span className={styles.star}>
                    ★★★★★
                    <span>★★★★★</span>
                    <input type="range" onChange={drawStar} value={star} step="1" min="0" max="10" /> {/* 수정된 부분 */}
                </span>
                <hr/>
            </form>


        </div>
    )
}

export default ReviewWrite
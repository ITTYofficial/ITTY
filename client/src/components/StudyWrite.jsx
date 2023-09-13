import React, { useState } from 'react'
import style from "../css/StudyWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';




const StudyWrite = () => {

    const [selectedValues, setSelectedValues] = useState([]);

    // 포지션 함수
    function changeColor(value) {
        if (selectedValues.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setSelectedValues([...selectedValues, value]);
        }
    }

    // 날짜관련 스테이트
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();

        // 작성된 값 확인할수 있는곳
        console.log('선택한 포지션:', selectedValues);
        console.log('프로젝트 시작일:', startDate);
        console.log('프로젝트 종료일:', endDate);
        const formData = new FormData(event.target);

        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
        });
    }

    return (
        <div className={style.Main_container}>
            <h2>스터디</h2>
            <form onSubmit={handleSubmit}>
                <p> 제목 </p>
                <input type="text" name='title' />

                <p>포지션</p>

                <button
                    type="button"
                    onClick={() => changeColor('1')}
                    style={{ backgroundColor: selectedValues.includes('1') ? '#ABE9FF' : '' }}
                >
                    코딩테스트 준비
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('2')}
                    style={{ backgroundColor: selectedValues.includes('2') ? '#ABE9FF' : '' }}
                >
                    취업 준비
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('3')}
                    style={{ backgroundColor: selectedValues.includes('3') ? '#ABE9FF' : '' }}
                >
                    개발 공부
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('4')}
                    style={{ backgroundColor: selectedValues.includes('4') ? '#ABE9FF' : '' }}
                >
                    자격증 공부
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('4')}
                    style={{ backgroundColor: selectedValues.includes('4') ? '#ABE9FF' : '' }}
                >
                    그룹 / 모임
                </button>

                <input type="hidden" name="selectedValue" value={selectedValues.join(',')} />

                <div className={style.second_block}>
                    <div>
                        <p>스터디 시작일</p>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>
                    <div>
                        <p>스터디 종료일</p>
                        <DatePicker selected={startDate} onChange={date => setEndDate(date)} />

                    </div>
                    <div>
                        <p>인원</p>
                        <input type="text" name='persons' placeholder='인원을 입력해주세요' />
                    </div>
                    <div>
                        <p>상태</p>
                        <select name='recruit'>
                            <option>모집중</option>
                            <option>모집완료</option>
                        </select>
                    </div>

                </div>
                <p>내용</p>
                <div>
                    <QuillTest />
                </div>


                {/* 전송 버튼 */}
                <input type="submit" value="전송" />


            </form>
        </div>
    )
}

export default StudyWrite
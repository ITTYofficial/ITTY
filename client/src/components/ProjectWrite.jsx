import React, { useState } from 'react'
import style from "../css/ProjectWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';




const ProjectWrite = () => {

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
            <h2>프로젝트</h2>
            <form onSubmit={handleSubmit}>
                <p> 제목 </p>
                <input type="text" name='title' />

                <p>포지션</p>

                <button
                    type="button"
                    onClick={() => changeColor('1')}
                    style={{ backgroundColor: selectedValues.includes('1') ? '#ABE9FF' : '' }}
                >
                    백엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('2')}
                    style={{ backgroundColor: selectedValues.includes('2') ? '#ABE9FF' : '' }}
                >
                    프론트엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('3')}
                    style={{ backgroundColor: selectedValues.includes('3') ? '#ABE9FF' : '' }}
                >
                    풀스택
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('4')}
                    style={{ backgroundColor: selectedValues.includes('4') ? '#ABE9FF' : '' }}
                >
                    DB
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('5')}
                    style={{ backgroundColor: selectedValues.includes('5') ? '#ABE9FF' : '' }}
                >
                    UI / UX
                </button>

                <input type="hidden" name="selectedValue" value={selectedValues.join(',')} />

                <div className={style.second_block}>
                    <div>
                        <p>프로젝트 시작일</p>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>
                    <div>
                        <p>프로젝트 종료일</p>
                        <DatePicker selected={startDate} onChange={date => setEndDate(date)} />

                    </div>
                    <div className={style.frame_work_container}>
                        <div>
                            <p>프론트</p>
                            <select name='framework_front'>
                                <option value={1}>React</option>
                                <option value={2}>Next.js</option>
                                <option value={3}>Vue.js</option>
                                <option value={4}>기타</option>

                            </select>
                        </div>
                        <div>
                            <p>백엔드</p>
                            <select name='framework_back'>
                                <option>Spring / Spring Boot</option>
                                <option>Node.js</option>
                                <option>Django</option>
                                <option>Flask</option>
                                <option>기타</option>
                            </select>
                        </div>
                        <div>
                            <p>DB</p>
                            <select name='framework_db'>
                                <option>MySQL</option>
                                <option>Oracle</option>
                                <option>MariaDB</option>
                                <option>MongoDB</option>
                                <option>기타</option>

                            </select>
                        </div>
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
                <div>
                    <QuillTest />
                </div>


                {/* 전송 버튼 */}
                <input type="submit" value="전송" />


            </form>
        </div>
    )
}

export default ProjectWrite
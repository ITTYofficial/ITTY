import React, { useContext, useState } from 'react'
import style from "../css/ProjectWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';
import axios from 'axios';
import { PlayBoardContext } from '../context/PlayBoardContext';




const ProjectWrite = () => {

    const [position, setposition] = useState([]);
    const { value } = useContext(PlayBoardContext);

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

    // 날짜관련 스테이트
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();

        // 작성된 값 확인할수 있는곳
        console.log('선택한 포지션:', position);
        console.log('프로젝트 시작일:', startDate);
        console.log('프로젝트 종료일:', endDate);
        const formData = new FormData(event.target);

        const obj = {};
        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['startDate'] = startDate;
        obj['endDate'] = endDate;
        obj['content'] = value;
        console.log(obj);

        axios.post('http://localhost:8088/project/write', obj)
        .then((res)=>{
            console.log("통신 완료");
        })
        .catch((err)=>{
            console.log("통신 실패");
            console.log(err);
        })
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
                    style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                >
                    백엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('2')}
                    style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                >
                    프론트엔드
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('3')}
                    style={{ backgroundColor: position.includes('3') ? '#ABE9FF' : '' }}
                >
                    풀스택
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('4')}
                    style={{ backgroundColor: position.includes('4') ? '#ABE9FF' : '' }}
                >
                    DB
                </button>
                <button
                    type="button"
                    onClick={() => changeColor('5')}
                    style={{ backgroundColor: position.includes('5') ? '#ABE9FF' : '' }}
                >
                    UI / UX
                </button>

                <input type="hidden" name="position" value={position.join(',')} />

                <div className={style.second_block}>
                    <div>
                        <p>프로젝트 시작일</p>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    </div>
                    <div>
                        <p>프로젝트 종료일</p>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

                    </div>
                    <div className={style.frame_work_container}>
                        <div>
                            <p>프론트</p>
                            <select name='framework_front'>
                                <option>React</option>
                                <option>Next.js</option>
                                <option>Vue.js</option>
                                <option>기타</option>

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
                            <option value={0}>모집중</option>
                            <option value={1}>모집완료</option>
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
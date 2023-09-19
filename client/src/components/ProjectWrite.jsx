import React, { useContext, useEffect, useState } from 'react'
import style from "../css/ProjectWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';
import axios from 'axios';
import { PlayBoardContext } from '../context/PlayBoardContext';
import { useLocation, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';




const ProjectWrite = () => {

    // // 특정 게시글 조회하기 위한 id값 가져오기
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [position, setposition] = useState([]);
    const { value, setValue } = useContext(PlayBoardContext);

    // 포지션 함수
    function changeColor(value) {
        if (position.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setposition(position.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setposition([...position, value]);
            console.log(value);
        }
    }

    // 날짜관련 스테이트
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();

        // 작성된 값 확인할수 있는곳
        // console.log('선택한 포지션:', position);
        // console.log('프로젝트 시작일:', startDate);
        // console.log('프로젝트 종료일:', endDate);
        const formData = new FormData(event.target);

        const obj = {};
        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['startDate'] = startDate;
        obj['endDate'] = endDate;
        obj['content'] = value;
        // console.log(obj);
        if (id) {
            obj['_id'] = id
        }

        axios.post('http://localhost:8088/project/write', obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.")
                console.log(res);
                window.location.href = `/projectDetail/${res.data._id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성 실패")
                window.location.href = `/projectList`
            })
    }

    // 게시글정보 저장할 State
    const [projectDetail, setProjectDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getProject = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`http://localhost:8088/project/projectDetail/${id}`)
                .then((res) => {
                    console.log(res);
                    setProjectDetail(res.data.detailProject[0]);
                    setStartDate(new Date(res.data.detailProject[0].startDate));
                    setEndDate(new Date(res.data.detailProject[0].endDate));
                    setValue(res.data.detailProject[0].content)
                    const positionArr = res.data.detailProject[0].position.split(',');
                    setposition(positionArr);
                });
        }
    };

    useEffect(() => {
        getProject();
    }, []);


    return (
        <div className={style.Main_container}>
            <h2>프로젝트</h2>
            <form onSubmit={handleSubmit}>
                <p> 제목 </p>
                {id ? <input className="form-control" type="text" name='title' defaultValue={projectDetail.title} /> : <input className="form-control" name='title' type="text" placeholder='제목을 입력해주세요' />}

                <p>포지션</p>
                <div className={style.position_content}>
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
                </div>

                <input type="hidden" name="position" value={position.join(',')} />

                <div className={style.second_block}>
                    <div className={style.date_content}>
                        <p>프로젝트 시작일</p>
                        {id ? <DatePicker className='form-control' defaultValue={projectDetail.startDate} selected={startDate} onChange={date => setStartDate(date)} /> : <DatePicker className='form-control' selected={startDate} onChange={date => setStartDate(date)} />}

                    </div>
                    <div className={style.date_content}>
                        <p>프로젝트 종료일</p>
                        {id ? <DatePicker className='form-control' defaultValue={projectDetail.endDate} selected={endDate} onChange={date => setEndDate(date)} /> : <DatePicker className='form-control' selected={endDate} onChange={date => setEndDate(date)} />}
                    </div>
                    <div className={style.frame_work_container}>
                        <div>
                            <p>프론트</p>
                            <select className='form-control' name='framework_front'>
                                {id&&projectDetail.frameword_front === "React"? <option selected>React</option> : <option>React</option>}
                                {id&&projectDetail.frameword_front === "Next.js"? <option selected>Next.js</option> : <option>Next.js</option>}
                                {id&&projectDetail.frameword_front === "Vue.js"? <option selected>Vue.js</option> : <option>Vue.js</option>}
                                {id&&projectDetail.frameword_front === "기타"? <option selected>기타</option> : <option>기타</option>}
                            </select>
                        </div>
                        <div>
                            <p>백엔드</p>
                            <select className='form-control' name='framework_back'>
                                {id&&projectDetail.framework_back === "Spring / Spring Boot"? <option selected>Spring / Spring Boot</option> : <option>Spring / Spring Boot</option>}
                                {id&&projectDetail.framework_back === "Node.js"? <option selected>Node.js</option> : <option>Node.js</option>}
                                {id&&projectDetail.framework_back === "Django"? <option selected>Django</option> : <option>Django</option>}
                                {id&&projectDetail.framework_back === "Flask"? <option selected>Flask</option> : <option>Flask</option>}
                                {id&&projectDetail.framework_back === "기타"? <option selected>기타</option> : <option>기타</option>}
                            </select>
                        </div>
                        <div>
                            <p>DB</p>
                            <select className='form-control' name='framework_db'>
                                {id&&projectDetail.framework_db === "MySQL"? <option selected>MySQL</option> : <option>MySQL</option>}
                                {id&&projectDetail.framework_db === "Oracle"? <option selected>Oracle</option> : <option>Oracle</option>}
                                {id&&projectDetail.framework_db === "MariaDB"? <option selected>MariaDB</option> : <option>MariaDB</option>}
                                {id&&projectDetail.framework_db === "MongoDB"? <option selected>MongoDB</option> : <option>MongoDB</option>}
                                {id&&projectDetail.framework_db === "기타"? <option selected>기타</option> : <option>기타</option>}
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>인원</p>
                        {id ? <input className="form-control" type="number" name='persons' defaultValue={projectDetail.persons} /> : <input className="form-control" type="number" name='persons' placeholder='인원을 입력해주세요' />}

                    </div>
                    <div>
                        <p>상태</p>
                        <select className='form-control' name='recruit'>
                            <option>모집상태 선택</option>
                            <option>모집중</option>
                            <option>모집완료</option>
                        </select>
                    </div>

                </div>
                <p>내용</p>
                <div className={style.quill_content}>
                    <QuillTest />
                </div>


                {/* 전송 버튼 */}
                <button className={style.submit_btn} type='submit'>
                    작성완료
                </button>
            </form>
        </div>
    )
}

export default ProjectWrite
import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "../css/ProjectWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';
import axios from 'axios';
import { useLocation, } from 'react-router-dom';
import { QuillContext } from '../context/QuillContext';




const ProjectWrite = () => {

    // 배포용 URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // // 특정 게시글 조회하기 위한 id값 가져오기
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [position, setposition] = useState([]);
    const { value, setValue, cancel } = useContext(QuillContext);

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

    // 경고메세지 출력을 위한 Ref
    const titleRef = useRef(null)
    const positionRef = useRef(null)
    const personRef = useRef(null)
    const dateRef = useRef(null)
    const framework_frontRef = useRef(null)
    const framework_backRef = useRef(null)
    const framework_dbRef = useRef(null)
    const contentRef = useRef(null)
    const refList = {
        title: titleRef,
        position: positionRef,
        persons: personRef,
        framework_front: framework_frontRef,
        framework_back: framework_backRef,
        framework_db: framework_dbRef,
        content: contentRef
    }
    let refVisible = false

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();

        // 작성된 값 확인할수 있는곳
        const formData = new FormData(event.target);
        formData.append('id', sessionStorage.getItem('memberId'));
        formData.append('writer', sessionStorage.getItem('memberNickname'));

        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        obj['startDate'] = startDate;
        obj['endDate'] = endDate;
        obj['content'] = value;
        if (id) {
            obj['_id'] = id
        }

        // 입력값 확인
        const inputRule = {
            title: /^.{2,255}$/,
            position: /^.{1,255}$/,
            framework_front: /^.{1,255}$/,
            framework_back: /^.{1,255}$/,
            framework_db: /^.{1,255}$/,
            persons: /^[0-9]{1,100}$/,
            content: /^.{12,65535}$/
        };

        for (const key in refList) {
            const check = obj[key];
            if (!check || !inputRule[key].test(check)) {
                refList[key].current.textContent = "글자수를 더 입력해주세요."
                refList[key].current.style.color = "red";
                refVisible = true;
                if (!check) {
                    if (key === "title") {
                        refList[key].current.textContent = "제목을 입력해주세요.";
                    } else if (key === "position") {
                        refList[key].current.textContent = "포지션을 선택해주세요.";
                    } else if (key === "content") {
                        refList[key].current.textContent = "내용을 입력해주세요.";
                    } else if (key === "persons") {
                        refList[key].current.textContent = "인원을 입력해주세요.";
                    }
                }

            } else {
                refList[key].current.textContent = null;
            }
        }

        if (obj.endDate < obj.startDate) {
            dateRef.current.textContent = "날짜를 다시 선택해주세요."
            dateRef.current.style.color = "red";
            refVisible = true;
        } else {
            dateRef.current.textContent = null;
        }

        if (refVisible) {
            alert('필수 입력 항목을 확인해주세요.')
            return;
        }

        axios.post(`${baseUrl}/project/write`, obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.")
                window.location.href = `/projectDetail/${res.data._id}?id=${res.data.id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성을 실패했습니다.")
                window.location.href = `/projectList`
            })
    }

    // 게시글정보 저장할 State
    const [projectDetail, setProjectDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getProject = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`${baseUrl}/project/projectDetail/${id}`)
                .then((res) => {
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
        setValue(null);
        getProject();
    }, []);


    return (

        <div className={style.Main_container}>
            <h2>프로젝트 🏆</h2>
            <form onSubmit={handleSubmit}>
                <h4> 제목 </h4>
                <div ref={titleRef}></div>
                <input
                    className="form-control"
                    name='title'
                    type="text"
                    style={{ marginTop: '2%' }}
                    {...(id ? { defaultValue: projectDetail.title } : { placeholder: '제목을 입력해주세요' })} />
                <h4>포지션</h4>
                <div ref={positionRef}></div>
                <div className={style.position_content} style={{ marginTop: '2%' }}>
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
                        <h4>프로젝트 시작일</h4>
                        <DatePicker
                            className='form-control'
                            {...(id && { defaultValue: projectDetail.startDate })}
                            selected={startDate}
                            onChange={date => setStartDate(date)} />
                    </div>

                    <div className={style.date_content}>
                        <h4>프로젝트 종료일  <span ref={dateRef}></span> </h4>

                        <DatePicker
                            className='form-control'
                            {...(id && { defaultValue: projectDetail.endDate })}
                            selected={endDate}
                            onChange={date => setEndDate(date)} />

                    </div>

                    <div className={style.frame_work_container}>

                        <div>

                            <h4>프론트</h4>
                            <div ref={framework_frontRef}></div>
                            <select className='form-control' name='framework_front'>
                                {id && projectDetail.frameword_front === "React" ? <option selected>React</option> : <option>React</option>}
                                {id && projectDetail.frameword_front === "Next.js" ? <option selected>Next.js</option> : <option>Next.js</option>}
                                {id && projectDetail.frameword_front === "Vue.js" ? <option selected>Vue.js</option> : <option>Vue.js</option>}
                                {id && projectDetail.frameword_front === "기타" ? <option selected>기타</option> : <option>기타</option>}
                            </select>

                        </div>
                        <div>
                            <h4>백엔드</h4>
                            <div ref={framework_backRef}></div>
                            <select className='form-control' name='framework_back'>
                                {id && projectDetail.framework_back === "Spring / Spring Boot" ? <option selected>Spring / Spring Boot</option> : <option>Spring / Spring Boot</option>}
                                {id && projectDetail.framework_back === "Node.js" ? <option selected>Node.js</option> : <option>Node.js</option>}
                                {id && projectDetail.framework_back === "Django" ? <option selected>Django</option> : <option>Django</option>}
                                {id && projectDetail.framework_back === "Flask" ? <option selected>Flask</option> : <option>Flask</option>}
                                {id && projectDetail.framework_back === "기타" ? <option selected>기타</option> : <option>기타</option>}
                            </select>
                        </div>
                        <div>
                            <h4>DB</h4>
                            <div ref={framework_dbRef}></div>
                            <select className='form-control' name='framework_db'>
                                {id && projectDetail.framework_db === "MySQL" ? <option selected>MySQL</option> : <option>MySQL</option>}
                                {id && projectDetail.framework_db === "Oracle" ? <option selected>Oracle</option> : <option>Oracle</option>}
                                {id && projectDetail.framework_db === "MariaDB" ? <option selected>MariaDB</option> : <option>MariaDB</option>}
                                {id && projectDetail.framework_db === "MongoDB" ? <option selected>MongoDB</option> : <option>MongoDB</option>}
                                {id && projectDetail.framework_db === "기타" ? <option selected>기타</option> : <option>기타</option>}
                            </select>
                        </div>

                    </div>

                    <div className={style.space_box_2}>
                        <h4>인원</h4>
                        <div ref={personRef}></div>
                        <input
                            className="form-control"
                            type="number"
                            name='persons'
                            style={{ marginTop: '2%' }}
                            {...(id ? { defaultValue: projectDetail.persons } : { placeholder: '인원을 입력해주세요' })} />
                    </div>

                    {/*                     <div className={style.space_box_2}>
                        <h4>상태</h4>
                        <select className='form-control' name='recruit'>
                            <option>모집상태 선택</option>
                            <option>모집중</option>
                            <option>모집완료</option>
                        </select>
                    </div> */}
                </div>

                <h4 className={style.space_box_2}>내용</h4>
                <div ref={contentRef}></div>
                <div className={style.quill_content}>
                    <QuillTest />
                </div>


                {/* 전송 버튼 */}
                <div className={style.button_group}>
                    <button onClick={cancel} className={style.cancel_btn} type='button'>
                        취소
                    </button>
                    <button className={style.submit_btn} type='submit'>
                        작성
                    </button>
                </div>
            </form>
        </div>

    )
}

export default ProjectWrite
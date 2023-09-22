import React, { useContext, useEffect, useState } from 'react'
import style from "../css/StudyWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { PlayBoardContext } from '../context/PlayBoardContext';
import { useLocation } from 'react-router-dom';



const StudyWrite = () => {

    // // 특정 게시글 조회하기 위한 id값 가져오기
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const { value, setValue } = useContext(PlayBoardContext);
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

        const obj = {};
        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['startDate'] = startDate;
        obj['endDate'] = endDate;
        obj['content'] = value;
        if (id) {
            obj['_id'] = id
        }
        console.log(obj);

        axios.post('http://localhost:8088/study/write', obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.")
                console.log(res);
                window.location.href = `/studyDetail/${res.data._id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성 실패")
                window.location.href = `/studyList`
            })
    }

    // 게시글정보 저장할 State
    const [studyDetail, setStudyDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getStudy = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`http://localhost:8088/study/detail/${id}`)
                .then((res) => {
                    console.log(res);
                    setStudyDetail(res.data.detailStudy[0]);
                    setStartDate(new Date(res.data.detailStudy[0].periodStart));
                    setEndDate(new Date(res.data.detailStudy[0].periodEnd));
                    setValue(res.data.detailStudy[0].content);
                    const positionArr = res.data.detailStudy[0].selectedValues.split(',');
                    setSelectedValues(positionArr);
                });
            // respnse에서 데이터 꺼내서 State에 저장
        }
    };

    useEffect(() => {
        setValue(null);
        getStudy();
    }, []);

    return (
        <div className={style.Main_container_box}>
            <div className={style.Main_container}>
                <h2>스터디 📚</h2>
                <form onSubmit={handleSubmit}>
                    <h4> 제목 </h4>
                    <input
                        className="form-control"
                        name='title'
                        type="text"
                        {...(id ? { defaultValue: studyDetail.title } : { placeholder: '제목을 입력해주세요' })}
                    />
                    <h4>포지션</h4>
                    <div className={style.position_content}>
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
                            onClick={() => changeColor('5')}
                            style={{ backgroundColor: selectedValues.includes('5') ? '#ABE9FF' : '' }}
                        >
                            그룹 / 모임
                        </button>
                    </div>

                    <input type="hidden" name="selectedValues" value={selectedValues.join(',')} />

                    <div className={style.second_block}>
                        <div>
                            <h4>스터디 시작일</h4>
                            <DatePicker
                                className='form-control'
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                {...(id && { defaultValue: studyDetail.periodStart })}
                            />
                        </div>

                        <div>
                            <h4>스터디 종료일</h4>
                            <DatePicker
                                className='form-control'
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                {...(id && { defaultValue: studyDetail.periodEnd })}
                            />
                        </div>

                        <div>
                            <div className={style.space_box_1}></div>
                            <h4>인원</h4>
                            <input
                                className="form-control"
                                name='persons'
                                type="number"
                                {...(id ? { defaultValue: studyDetail.persons } : { placeholder: '인원을 입력해주세요' })}
                            />

                        </div>

                        <div>
                            <div className={style.space_box_1}></div>
                            <h4>상태</h4>
                            <select className='form-control' name='recruit'>
                                <option>모집상태 선택</option>
                                <option>모집중</option>
                                <option>모집완료</option>
                            </select>
                        </div>

                    </div>

                    <h4 className={style.margin_top_p_tag}>내용</h4>
                    <div className={style.quill_content}>
                        <QuillTest />
                    </div>


                    <button className={style.submit_btn} type='submit'>
                        작성완료
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudyWrite
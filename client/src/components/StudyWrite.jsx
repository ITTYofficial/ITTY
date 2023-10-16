import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "../css/StudyWrite.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuillTest from './QuillTest';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { QuillContext } from '../context/QuillContext';

const StudyWrite = () => {

    // 배포용 URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // // 특정 게시글 조회하기 위한 id값 가져오기
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const { value, setValue } = useContext(QuillContext);

    const [selectedValues, setSelectedValues] = useState([]);

    // 포지션 함수
    function changeColor(value) {
        if (selectedValues.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setSelectedValues([value]);
        }
    }

    // 날짜관련 스테이트
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // 경고메세지 출력을 위한 Ref
    const titleRef = useRef(null)
    const selectRef = useRef(null)
    const personRef = useRef(null)
    const dateRef = useRef(null)
    const contentRef = useRef(null)
    const refList = {
        title: titleRef,
        selectedValues: selectRef,
        persons: personRef,
        content: contentRef
    }
    let refVisible = false

    // 폼 전송 시 호출되는 함수
    function handleSubmit(event) {
        event.preventDefault();

        // 작성된 값 확인할수 있는곳
        console.log('선택한 포지션:', selectedValues);
        console.log('프로젝트 시작일:', startDate);
        console.log('프로젝트 종료일:', endDate);
        const formData = new FormData(event.target);
        formData.append('id', sessionStorage.getItem('memberId'));
        formData.append('writer', sessionStorage.getItem('memberNickname'));
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

        // 입력값 확인
        const inputRule = {
            title: /^.{2,255}$/,
            selectedValues: /^.{1,255}$/,
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
                    } else if (key === "persons") {
                        refList[key].current.textContent = "인원을 입력해주세요.";
                    } else if (key === "content") {
                        refList[key].current.textContent = "내용을 입력해주세요.";
                    } else if (key === "selectedValues") {
                        refList[key].current.textContent = "카테고리를 선택해주세요.";
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
        console.log(obj);

        axios.post(`${baseUrl}/study/write`, obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.")
                console.log(res);
                window.location.href = `/studyDetail/${res.data._id}?id=${res.data.id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성에 실패했습니다.")
                window.location.href = `/studyList`
            })
    }

    // 게시글정보 저장할 State
    const [studyDetail, setStudyDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getStudy = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`${baseUrl}/study/detail/${id}`)
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

        <div className={style.Main_container}>
            <h2>스터디 📚</h2>
            <form onSubmit={handleSubmit}>
                <h4> 제목 </h4>
                <div ref={titleRef}></div>
                <input
                    className="form-control"
                    name='title'
                    type="text"
                    style={{ marginTop: '2%' }}
                    {...(id ? { defaultValue: studyDetail.title } : { placeholder: '제목을 입력해주세요' })}
                />
                <h4>카테고리</h4>
                <div ref={selectRef}></div>
                <div className={style.position_content} style={{ marginTop: '2%' }}>
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
                        <div ref={dateRef}></div>
                        <DatePicker
                            className='form-control'
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            {...(id && { defaultValue: studyDetail.periodEnd })}
                        />
                    </div>

                    <div>
                        <h4>인원</h4>
                        <div ref={personRef}></div>
                        <input
                            style={{ marginTop: '2%' }}
                            className="form-control"
                            name='persons'
                            type="number"
                            {...(id ? { defaultValue: studyDetail.persons } : { placeholder: '인원을 입력해주세요' })}
                        />

                    </div>

                    {/*                     <div>
                        <h4>상태</h4>
                        <select className='form-control' name='recruit'>
                            <option>모집상태 선택</option>
                            <option>모집중</option>
                            <option>모집완료</option>
                        </select>
                    </div>
 */}
                </div>

                <h4 className={style.margin_top_p_tag}>내용</h4>
                <div ref={contentRef}></div>
                <div style={{ marginTop: '2%' }} className={style.quill_content}>

                    <QuillTest />
                </div>

                <div className={style.button_group}>
                    <button className={style.cancel_btn} type='submit'>
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

export default StudyWrite
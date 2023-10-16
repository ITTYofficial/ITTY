import React, { useContext, useEffect, useRef, useState } from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { QuillContext } from '../context/QuillContext';

const AnonymityList = () => {

    // 배포용 URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // 특정 게시글 조회하기 위한 id값 가져오기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const { value, setValue } = useContext(QuillContext);
    console.log("id :", id);

    // 경고메세지 출력을 위한 Ref
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const refList = {
        title: titleRef,
        content: contentRef
    }
    let refVisible = false


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('id', sessionStorage.getItem('memberId'));
        console.log(e.target);

        const obj = {};
        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['content'] = value;
        if (id) {
            obj['_id'] = id
        }

        // 입력값 확인
        const inputRule = {
            title: /^.{2,255}$/,
            content: /^.{12,65535}$/
        };

        for (const key in refList) {
            const check = obj[key];
            if (!check || !inputRule[key].test(check)) {
                refList[key].current.textContent = "글자수를 더 입력해주세요.";
                refList[key].current.style.color = "red";
                refVisible = true;
                if (!check) {
                    if (key === "title") {
                        refList[key].current.textContent = "제목을 입력해주세요.";
                    } else if (key === "content") {
                        refList[key].current.textContent = "내용을 입력해주세요.";
                    }
                }
            } else {
                refList[key].current.textContent = null;
            }
        }

        if (refVisible) {
            alert("필수 입력 항목을 확인해주세요.");
            return;
        }

        await axios.post(`${baseUrl}/anony/write`, obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.");
                window.location.href = `/anonymityDetail/${res.data._id}`
            }).catch((err) => {
                alert("게시글 작성을 실패했습니다.");
                window.location.href = "/anonymityList"
            })
    }

    // 게시글정보 저장할 State
    const [anonyDetail, setAnonyDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getAnony = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`${baseUrl}/anony/anonyDetail/${id}`)
                .then((res) => {
                    console.log(res);
                    setAnonyDetail(res.data.detailAnony[0]);
                    setValue(res.data.detailAnony[0].content)
                });
            // respnse에서 데이터 꺼내서 State에 저장
        }
    };

    useEffect(() => {
        setValue(null);
        getAnony();
    }, []);


    return (
        <div className={style.Main_container}>
            <h2>익명게시판 🤐</h2>
            <div className={style.right_container}>
                <form onSubmit={handleSubmit}>
                    <h4>제목</h4>
                    <div ref={titleRef}></div>
                    <input
                        style={{ marginTop: "2%" }}
                        className="form-control"
                        type="text"
                        name='title'
                        {...(id ? { defaultValue: anonyDetail.title } : { placeholder: '제목을 입력해주세요' })} />
                    <h4>내용</h4>
                    <div ref={contentRef} style={{ marginBottom: "2%" }}></div>
                    <div className={style.quill_div}>
                        <QuillTest />
                    </div>
                    {/* 전송 버튼 */}
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
        </div>
    )
}

export default AnonymityList
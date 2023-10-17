import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "../css/QnaWrite.module.css"
import QuillTest from './QuillTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { QuillContext } from '../context/QuillContext';


const QnaWrite = () => {

    // 배포용 URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    // 포지션 함수
    function changeColor(value) {
        if (position.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setposition(position.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setposition([value]);
        }
    }

    const [position, setposition] = useState([]);

    // 글 작성 관련

    // Quill value
    const { value, setValue, cancel } = useContext(QuillContext);

    // 특정 게시글 조회하기 위한 id값 가져오기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const nickname = sessionStorage.getItem("memberNickname");

    // 경고메세지 출력을 위한 Ref
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const categoryFRef = useRef(null)
    const refList = {
        title: titleRef,
        category: categoryFRef,
        content: contentRef
    }
    let refVisible = false

    // 게시글 작성 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('writer', nickname);
        formData.append('id', sessionStorage.getItem('memberId'));
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        obj["content"] = value;
        if (id) {
            obj["_id"] = id;
        }

        // 입력값 확인
        const inputRule = {
            title: /^.{2,255}$/,
            category: /^.{1,255}$/,
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
                    } else if (key === "content") {
                        refList[key].current.textContent = "내용을 입력해주세요.";
                    } else if (key === "category") {
                        refList[key].current.textContent = "카테고리를 선택해주세요.";
                    }
                }

            } else {
                refList[key].current.textContent = null;
            }
        }

        if (refVisible) {
            alert('필수 입력 항목을 확인해주세요.')
            return;
        }

        axios
            .post(`${baseUrl}/qna/write`, obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.");
                window.location.href = `/qnaDetail/${res.data._id}?id=${res.data.id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성을 실패했습니다.");
                window.location.href = `/qnaList`
            });
    };

    // 게시글정보 저장할 State
    const [qnaDetail, setQnADetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getQnA = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios
                .get(`${baseUrl}/qna/qnaDetail/${id}`)
                .then((res) => {
                    setQnADetail(res.data.detailQnA[0]);
                    setValue(res.data.detailQnA[0].content);
                    const positionArr = res.data.detailQnA[0].category.split(',');
                    setposition(positionArr);
                });
            // respnse에서 데이터 꺼내서 State에 저장
        }
    };

    useEffect(() => {
        setValue(null);
        getQnA();
    }, []);

    return (


        <div>
            <div className={style.Qna_content_box1}>
                <div className={style.Qna_content_box2}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className={style.Qna_content_box_font}>
                                <h2>QnA 💡</h2>
                            </div>
                            <h4>제목</h4>
                            <div ref={titleRef}></div>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                style={{ marginTop: '2%' }}
                                {...(id ? { defaultValue: qnaDetail.title } : { placeholder: '글제목을 입력하세요.' })} />
                        </div>
                        <div className="mb-3">
                            <h4>카테고리</h4>
                            <div ref={categoryFRef}></div>
                        </div>

                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('1')}
                            style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                        >
                            개발
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('2')}
                            style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                        >
                            공부
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('3')}
                            style={{ backgroundColor: position.includes('3') ? '#ABE9FF' : '' }}
                        >
                            취업
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('4')}
                            style={{ backgroundColor: position.includes('4') ? '#ABE9FF' : '' }}
                        >
                            생활
                        </button>
                        <button
                            className={style.Qna_button_container}
                            type="button"
                            onClick={() => changeColor('5')}
                            style={{ backgroundColor: position.includes('5') ? '#ABE9FF' : '' }}
                        >
                            기타
                        </button>
                        <input type="hidden" name="category" value={position.join(',')} />
                        <div className="mb-3">
                            <h4>내용</h4>
                            <div ref={contentRef}></div>
                        </div>

                        <div className={style.quill_div}>
                            <QuillTest />
                        </div>

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


            </div>
        </div >
    )
}

export default QnaWrite
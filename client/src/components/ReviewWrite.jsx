import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../css/ReviewWrite.module.css'
import QuillTest from './QuillTest';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { QuillContext } from '../context/QuillContext';


const ReviewWrite = () => {

    // 배포용 URL
    const baseUrl = process.env.REACT_APP_BASE_URL;

    /* 별점관련 */
    const [star, setStart] = useState(0);

    const drawStar = (event) => {
        const value = event.target.value;
        document.querySelector(`.${styles.star} span`).style.width = `${value * 10}%`;
        setStart(value);
    }
    /* 별점관련 */

    /* 키워드관련 */
    const [keyWord, setKeyWord] = useState([]);

    function keyChangeColor(value) {
        if (keyWord.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setKeyWord(keyWord.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setKeyWord([value]);
        }
    }

    const [position, setPosition] = useState([]);

    function poChangeColor(value) {
        if (position.includes(value)) {
            // 이미 선택된 버튼인 경우 선택 해제
            setPosition(position.filter(item => item !== value));
        } else {
            // 누른 버튼 값 추가
            setPosition([value]);
        }
    }
    /* 키워드관련 */

    // 글 작성 관련

    // Quill value
    const { value, setValue, cancel } = useContext(QuillContext);

    // 특정 게시글 조회하기 위한 id값 가져오기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    // 경고메세지 출력을 위한 Ref
    const titleRef = useRef(null)
    const scoreRef = useRef(null)
    const keyWordRef = useRef(null)
    const positionRef = useRef(null)
    const contentRef = useRef(null)
    const refList = {
        title: titleRef,
        score: scoreRef,
        keyWord: keyWordRef,
        position: positionRef,
        content: contentRef
    }
    let refVisible = false

    // 게시글 작성 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('id', sessionStorage.getItem('memberId'));
        formData.append('writer', sessionStorage.getItem('memberNickname'));
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
            score: /^.{1,255}$/,
            keyWord: /^.{1,255}$/,
            position: /^.{1,255}$/,
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
                    } else if (key === "keyWord") {
                        refList[key].current.textContent = "추천 키워드를 선택해주세요.";
                    } else if (key === "position") {
                        refList[key].current.textContent = "전공 여부를 선택해주세요.";
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

        axios
            .post(`${baseUrl}/review/write`, obj)
            .then((res) => {
                alert("게시글이 등록되었습니다.");
                window.location.href = `/reviewDetail/${res.data._id}?id=${res.data.id}`
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성 실패");
                window.location.href = `/reviewList`
            });
    };

    // 게시글정보 저장할 State
    const [reviewDetail, setReviewDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getReview = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios
                .get(`${baseUrl}/review/reviewDetail/${id}`)
                .then((res) => {
                    setReviewDetail(res.data.detailReview[0]);
                    setValue(res.data.detailReview[0].content);
                });
            // respnse에서 데이터 꺼내서 State에 저장
        }
    };

    useEffect(() => {
        setValue(null);
        getReview();
    }, []);

    return (
        <div className={styles.Main_container}>
            <h2>수료생 후기🧑‍🎓</h2>
            <form onSubmit={handleSubmit}>
                <h4>제목</h4>
                <div ref={titleRef}></div>
                <input
                    className="form-control"
                    name='title'
                    type="text"
                    style={{ marginTop: "2%" }}
                    {...(id ? { defaultValue: reviewDetail.title } : { placeholder: '제목을 입력해주세요' })} />
                <h4>만족도</h4>
                <div ref={scoreRef} style={{ marginBottom: "2%" }}></div>
                <div className={styles.review_star}>
                    <span className={styles.star}>
                        ★★★★★
                        <span>★★★★★</span>
                        <input
                            type="range"
                            name='score'
                            onChange={drawStar}
                            {...(id ? { defaultValue: reviewDetail.score } : { value: star })}
                            step="1" min="0" max="10" /> {/* 수정된 부분 */}
                    </span>
                </div>
                <h4>추천 키워드</h4>
                <div ref={keyWordRef} style={{ marginBottom: "2%" }}></div>
                <div className={styles.keyworld_content}>
                    <button
                        type="button"
                        onClick={() => keyChangeColor('1')}
                        style={{ backgroundColor: keyWord.includes('1') ? '#ABE9FF' : '' }}
                    >
                        강력추천
                    </button>
                    <button
                        type="button"
                        onClick={() => keyChangeColor('2')}
                        style={{ backgroundColor: keyWord.includes('2') ? '#ABE9FF' : '' }}
                    >
                        추천
                    </button>
                    <button
                        type="button"
                        onClick={() => keyChangeColor('3')}
                        style={{ backgroundColor: keyWord.includes('3') ? '#ABE9FF' : '' }}
                    >
                        비추천
                    </button>
                    <input type="hidden" name="keyWord" value={keyWord.join(',')} />

                    <h4>전공 여부</h4>
                    <div ref={positionRef} style={{ marginBottom: "2%" }}></div>
                    <button
                        type="button"
                        onClick={() => poChangeColor('1')}
                        style={{ backgroundColor: position.includes('1') ? '#ABE9FF' : '' }}
                    >
                        전공
                    </button>
                    <button
                        type="button"
                        onClick={() => poChangeColor('2')}
                        style={{ backgroundColor: position.includes('2') ? '#ABE9FF' : '' }}
                    >
                        비전공
                    </button>
                    <input type="hidden" name="position" value={position.join(',')} />
                </div>

                <h4>내용</h4>
                <div ref={contentRef} style={{ marginBottom: "2%" }}></div>
                <div className={styles.quill_div}>
                    <QuillTest />
                </div>

                {/* 전송 버튼 */}
                <div className={styles.button_group}>
                    <button onClick={cancel} className={styles.cancel_btn} type='button'>
                        취소
                    </button>
                    <button className={styles.submit_btn} type='submit'>
                        작성
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewWrite
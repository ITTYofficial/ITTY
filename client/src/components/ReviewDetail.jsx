import React, { useEffect, useState } from 'react'
import styles from '../css/ReviewDetail.module.css'
import LeftContainer from './LeftContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewDetail = () => {

    // 특정 게시글 조회하기 위한 id값 가져오기
    const { id } = useParams();

    const Rank = ({score}) => (
        <span className={`${styles.tag_button} ${styles.star}`}>
            ⭐{Number(score/2)}
        </span>
    );
    const Recomend = () => (
        <span className={`${styles.tag_button} ${styles.recommend}`}>
            강력추천👍
            {/* 비추천👎 */}
        </span>
    );
    const Major = () => (
        <span className={`${styles.tag_button} ${styles.major}`}>
            전공자🎓
            {/* 비전공자🎓*/}
        </span>
    );

    const CommentItem = () => (
        <div className={styles.comment_list}>
            <div className={styles.play_comment_profile}>
                <span>
                    <Image
                        src="https://i.pinimg.com/736x/24/d2/97/24d2974e5cd0468587422e38c8aab210.jpg"
                        roundedCircle
                    />
                </span>
                <span>
                    <p>빅데이터분석</p>
                    <h4>수업시간에롤</h4>
                    <div className={styles.comment_cancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </div>
                </span>
            </div>
            {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
            <div>
                <p>
                    데이터디자인반 프론트엔드 희망하는 26살입니다.
                    <br />
                    같이하면 재밋게 열심히 잘 할수 있을것같아요. 연락처는 쪽지로
                    보내드렸습니다.
                    <br />
                    확인하시고 연락부탁드려요~!
                </p>
            </div>
            {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

            <div>
                <p>3시간 전</p>
            </div>
        </div>
    );

    // 게시글정보 저장할 State
    const [reviewDetail, setReviewDetail] = useState([]);
    const [visible, setVisible] = useState([false, false, false]);

    // 게시글 조회함수
    // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
    const getReview = async () => {
        // projectRouter랑 통신해서 response에 결과값 저장
        await axios.get(`http://localhost:8088/review/reviewDetail/${id}`)
            .then((res) => {
                // respnse에서 데이터 꺼내서 State에 저장
                console.log(res.data);
                setReviewDetail(res.data.detailReview[0]);
                const positionArr = res.data.detailReview[0].keyWord.split(',');
                positionArr.map((item) => (visible[item - 1] = true));
            })
            .catch((err) => {
                console.log(err);
            })
    };

    // 페이지 렌더링시 조회함수 실행
    useEffect(() => {
        getReview();
    }, []);

    // 날짜 변환 함수
    const getTimeAgoString = (dateString) => {
        const createdAt = new Date(dateString);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const day = createdAt.getDate();

        return `${year}년 ${month}월 ${day}일`
    };

    // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
    const getTime = (dateString) => {
        const createdAt = new Date(dateString);
        const now = new Date();
        const timeDifference = now - createdAt;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(hoursDifference / 24);

        if (daysDifference === 0) {
            if (hoursDifference === 0) {
                return "방금 전";
            } else {
                return `${minutesDifference}분 전`;
            }
        } else if (hoursDifference < 24) {
            return `${hoursDifference}시간 전`;
        } else {
            return `${daysDifference}일 전`;
        }
    };

    // 수정 페이지 이동
    const nav = useNavigate();
    const moveUpdate = () => {
        nav(`/reviewWrite?id=${id}`)
    }

    // 게시글 삭제
    const deleteReview = async () => {
        await axios.post(`http://localhost:8088/review/delete/${id}`)
            .then((res) => {
                alert("삭제 완료")
                window.location.href = '/ReviewList'
            })
            .catch((err) => {
                alert("삭제 실패")
                console.log(err);
            })
    }

    /* 수정삭제 버튼 */

    const [meat, setMeat] = useState(false);

    const Dropdown = () => (
        <div className={styles.meat_dropdown}>
            <li onClick={moveUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
                <span>수정</span>
            </li>
            <li onClick={deleteReview}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
                <span>삭제</span>
            </li>
        </div>
    );

    const toggleMeat = () => {
        if (meat) {
            setMeat(!meat);
        }
    };

    /* 수정삭제 버튼 */

    return (
        <div className={styles.Main_container}>
            <LeftContainer />
            <div className={styles.right_container}>
                <h2>수료생후기</h2>
                <hr />
                <div className={styles.top_content}>
                    <div>
                        <div className={styles.profile_img}>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                        <div>
                            <p>데이터디자인</p>
                            <p>종강만기다림</p>
                        </div>
                        <div className={styles.tag_buttons}>
                            {visible[0] && <Rank score={reviewDetail.score}/>}
                            {visible[1] && <Recomend />}
                            {visible[2] && <Major />}
                        </div>
                    </div>
                    <div>
                        <p>{getTimeAgoString(reviewDetail.createdAt)} 👁‍🗨 {reviewDetail.views} 💬 4</p>
                    </div>
                </div>

                <div className={styles.middle_content}>
                    <h4>{reviewDetail.title}</h4>

                    {/* 글 내용 부분 */}
                    <div className={styles.meatball}>
                        <ul>
                            <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                            {meat && <Dropdown />}
                        </ul>
                    </div>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: reviewDetail.content }}></p>
                    </div>
                </div>
                <div className={styles.division_line}>
                    <div>
                        <p>댓글 2</p>
                    </div>
                </div>

                <div className={styles.comment_write}>
                    <div>
                        <div>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                        <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
                    </div>
                    <button type="button">댓글쓰기</button>
                </div>

                <CommentItem />

            </div>

        </div>
    )
}

export default ReviewDetail
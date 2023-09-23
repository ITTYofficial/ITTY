import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/QnaDetail.module.css";
import styles from "../css/Community.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const QnaDetail = () => {

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  /* 글 제목 앞에 쓰일 카테고리 아이콘(글 작성시 선택 가능-개발/공부/취업/생활 및 기타 ) */
  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>개발 🙋🏻‍♀️</span>
  );
  const Study = () => (
    <span className={`${style.play_title} ${style.study}`}>공부✨</span>
  );
  const Job = () => (
    <span className={`${style.play_title} ${style.job}`}>취업🎓</span>
  );
  const Life = () => (
    <span className={`${style.play_title} ${style.life}`}>생활/기타🌷</span>
  );

  const CommentItem = () => (
    <div className={style.commant_list}>
      <div className={style.play_commant_profile}>
        <span></span>
        <span>
          {/* 댓글 프로필 */}
          <p>빅데이터분석</p>
          <h4>수업시간에롤</h4>
        </span>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
      <span>
        <p>
          정말 꿀팁이라고 생각합니다.
          <br />
          정말 큰 도움이 되었다고 생각합니다
          <br />
          Qna 게시판을 이래서 사용하나봐요
          <span className={style.qna_choice_box}>
            <button type="button" class="btn btn-warning">
              채택 👍
            </button>
          </span>
        </p>
      </span>

      {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

      <div>
        <p>3시간 전</p>
      </div>
    </div>
  );

  // 게시글정보 저장할 State
  const [qnaDetail, setQnADetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getQnA = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios.get(`http://localhost:8088/qna/qnaDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setQnADetail(res.data.detailQnA[0]);
        const positionArr = res.data.detailQnA[0].category.split(',');
        positionArr.map((item) => (visible[item - 1] = true));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getQnA();
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

  /* 미트볼 수정삭제 수환이가 만든거 가져옴 */
  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={style.meat_dropdown}>
      <li onClick={moveUpdate}>수정</li>
      <li onClick={deleteQnA}>삭제</li>
    </div>
  );

  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/qnaWrite?id=${id}`)
  };

  // 게시글 삭제
  const deleteQnA = async () => {
    await axios.post(`http://localhost:8088/qna/delete/${id}`)
      .then((res) => {
        alert("삭제 완료")
        window.location.href = '/qnaList'
      })
      .catch((err) => {
        alert("삭제 실패")
        console.log(err);
      })

  }

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.qna_font}>
          <p>QnA 💡</p>
        </div>
        <div className={style.division_line}></div>

        <div className={style.play_wrap_content}>
          <span className={style.play_detail_profile}>
            <span className={style.profile_pic}>
              <img src="#" />
            </span>
            {/* 글 작성 프로필 */}
            <span className={style.profile_text}>
              <p>데이터 디자인</p>
              <h4>수업중몰래롤</h4>
            </span>
          </span>

          {/* 자유게시판 상세페이지 상단 제목부분 START */}
          <div className={style.play_wrap_top}>
            <div className={style.play_profile}>
              <span>
           
                <span className={style.play_top_title}>
                  {visible[0] &&<Develope />}
                  {visible[1] &&<Study />}
                  {visible[2] &&<Job />}
                  {visible[3] &&<Life />}
                  
                </span>
                <h4>{qnaDetail.title}</h4>
              </span>

              <span>
                <div className={style.qna_time_box}>{getTimeAgoString(qnaDetail.createdAt)}</div>
                <span className={style.qna_comment_box}>👁‍🗨 {qnaDetail.views} 💬 4</span>
              </span>
            </div>
            <hr className={style.division_line_2}></hr>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 Finish */}

          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            <div className={style.meatball}>
              <ul>
                <svg
                  onClick={() => {
                    setMeat(!meat);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
                {meat && <Dropdown />}
              </ul>
            </div>

            <span dangerouslySetInnerHTML={{ __html: qnaDetail.content }}></span>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={style.division_line_commant}>
            <div>
              <h4>댓글 3</h4>
            </div>
          </div>

          <div className={style.commant_write}>
            <div>
              <div>
                <img src="#" />
              </div>
              <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
            </div>
            <button type="button">댓글쓰기</button>
          </div>
          {/* 댓글달기 끝 */}

          <CommentItem />
          <CommentItem />
        </div>
      </div>
    </div>
  );
};

export default QnaDetail;

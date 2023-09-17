import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/QnaDetail.module.css";
import styles from "../css/Community.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const QnaDetail = () => {
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

  /* 미트볼 수정삭제 수환이가 만든거 가져옴 */
  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={style.meat_dropdown}>
      <li onClick={moveUpdate}>수정</li>
      <li onClick={deleteQna}>삭제</li>
    </div>
  );

  // 수정 페이지 이동
  const moveUpdate = () => {};

  // 게시글 삭제
  const deleteQna = async () => {};

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
                  <Develope />
                </span>
                <h4>리액트 useEffect관련 질문입니다 😂</h4>
              </span>

              <span>
                <div className={style.qna_time_box}>1시간 전</div>
                <span className={style.qna_comment_box}>👁‍🗨 28 💬 4</span>
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

            <span>
              useEffect 쓰는데 너무 헷갈리더라구요..
              <br />
              <br />
              useEffect가 리액트 컴포넌트가 렌더링 될때마다
              <br />
              <br />
              특정 작업을 할 수 있도록 하는 Hook이잖아요....?
              <br />
              <br />
              근데 그게 잘 이해가 안가더라구요..
              <br />
              <br />
              mount/unmount/update시 작업 설정 할수 있다는데
              <br />
              <br />
              하 ㅋ 증말 먼소릴까요??
              <br />
              <br />
              저만 이해 안되나염?? 😂😂😂😂😂
              <br />
              <br />
            </span>
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

import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/TipDetail.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";


/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const TipDetail = () => {
  /* 글 제목 앞에 쓰일 카테고리 아이콘(글 작성시 선택 가능-개발/공부/취업/생활 및 기타 ) */
  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>
      개발 🙋🏻‍♀️
    </span>
  );
  const Study = () => (
    <span className={`${style.play_title} ${style.study}`}>
      공부✨
    </span>
  );
  const Job = () => (
    <span className={`${style.play_title} ${style.job}`}>
      취업🎓
    </span>
  );
  const Life = () => (
    <span className={`${style.play_title} ${style.life}`}>생활/기타🌷</span>
  );

  const CommentItem = () => (
    <div className={style.commant_list}>
      <div className={style.play_commant_profile}>
        <span>
          <Image
            src="https://i.pinimg.com/736x/24/d2/97/24d2974e5cd0468587422e38c8aab210.jpg"
            roundedCircle
          />
        </span>
        <span>
          {/* 댓글 프로필 */}
          <p>빅데이터분석</p>
          <h4>수업시간에롤</h4>
        </span>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
      <div>
        <p>
          정말 꿀팁이라고 생각합니다.
          <br />
          정말 큰 도움이 되었다고 생각합니다
          <br />
          tip 게시판을 이래서 사용하나봐요
        </p>
      </div>
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
      <li onClick={deleteTip}>삭제</li>
    </div>
  );


  // 수정 페이지 이동
  const moveUpdate = () => {
  }

  // 게시글 삭제
  const deleteTip = async () => {

  }


  return (

    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.tip_font}>
          <p>Tip 💡</p>
        </div>
        <div className={style.division_line}>
        </div>

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
                <h4>
                  자바 별찍기 문제 꿀팁
                </h4>
              </span>

              <span>
                <div className={style.tip_time_box}>1시간 전</div>
                <span className={style.tip_comment_box}>
                  👁‍🗨 28 💬 4
                </span>
              </span>

            </div>
            <hr className={style.division_line_2}>
            </hr>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 Finish */}



          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            <div className={style.meatball}>
              <ul>
                <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
                {meat && <Dropdown />}
              </ul>
            </div>

            <span>
              꿀팁 하나 알려드릴까요
              <br />
              <br />
              for문 별찍기 다들 어려워하시잖아요
              <br />
              <br />
              그거 이중포문쓰면 헷갈리잖아요
              <br />
              <br />
              그때 꿀팁입니다
              <br />
              <br />
              유튜브 검색하시면
              <br />
              <br />
              유용한정보 진짜 많아요 ㅋ
              <br />
              <br />
              서칭해서 별찍기문제 이해해보세용
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

export default TipDetail
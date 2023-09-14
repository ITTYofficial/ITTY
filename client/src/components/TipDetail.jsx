import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/TipDetail.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styles from "../css/Community.module.css";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

const TipDetail = () => {
  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>
      개발🔨
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
          <p>빅데이터분석</p>
          <h4>수업시간에롤</h4>
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
            <span className={style.profile_text}>
              <p>데이터 디자인</p>
              <h4>수업중몰래롤</h4>
            </span>
          </span>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={style.play_wrap_top}>

            <div className={style.play_profile}>

              <span>
                <span className={style.play_top_title}>
                  <Develope />
                </span>
                <h4>
                  자바 별찍기 문제 꿀팁
                </h4>
                <div>
                  <span className={style.tip_comment_box}>
                    <p>👁‍🗨 28 💬 4</p>
                  </span>
                </div>
              </span>




            </div>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 END!!!!! */}

          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            <span>
              안녕하세요 데이터디자인반 김초롱입니다.
              <br />
              <br />
              이번 공공기관 프로젝트 함께할 사람을 찾고 있는데
              <br />
              <br />
              혹시 생각 있으시면
              <br />
              <br />
              댓글 달아주시면 감사하겠습니다.
              <br />
              <br />
              현재 프론트 1명만 구한 상황이구요
              <br />
              <br />
              백/프론트/DB 쪽 담당해줄 사람을 찾고있습니다.
              <br />
              <br />
              같이 배우면서 하는거니까 부담갖지말고 편하게 연락주세요.
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
          <CommentItem />
        </div>
      </div>
    </div>
  );
};

export default TipDetail
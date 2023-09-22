import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/TipDetail.module.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";


/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const TipDetail = () => {

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
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

  // 게시글정보 저장할 State
  const [tipDetail, setTipDetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getTip = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios.get(`http://localhost:8088/tip/tipDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setTipDetail(res.data.detailTip[0]);
        const positionArr = res.data.detailTip[0].category.split(',');
        positionArr.map((item) => (visible[item - 1] = true));
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getTip();
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
      <li onClick={deleteTip}>삭제</li>
    </div>
  );


  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/tipWrite?id=${id}`)
  }

  // 게시글 삭제
  const deleteTip = async () => {
    await axios.post(`http://localhost:8088/tip/delete/${id}`)
      .then((res) => {
        alert("삭제 완료")
        window.location.href = '/TipList'
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
              <h5>수업중몰래롤</h5>
            </span>

          </span>

          {/* 자유게시판 상세페이지 상단 제목부분 START */}
          <div className={style.play_wrap_top}>
            <div className={style.play_profile}>

              <span>
                <h4>
                  {tipDetail.title}
                </h4>
                <span className={style.play_top_title}>
                  {visible[0]&&<Develope />}
                  {visible[1]&&<Study />}
                  {visible[2]&&<Job />}
                  {visible[3]&&<Life />}
                </span> 
              </span>

              <span>
                <div className={style.tip_time_box}>{getTimeAgoString(tipDetail.createdAt)}</div>
                <span className={style.tip_comment_box}>
                  👁‍🗨 {tipDetail.views} 💬 4
                </span>
              </span>

            </div>
            <hr className={style.division_line_2}>
            </hr>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 Finish */}



          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            {/* 글 수정/삭제 미트볼 */}
            <div className={style.meatball}>
              <ul>
                <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
                {meat && <Dropdown />}
              </ul>
            </div>

            <p dangerouslySetInnerHTML={{ __html: tipDetail.content }}></p>

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
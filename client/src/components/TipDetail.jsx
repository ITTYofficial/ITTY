import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/TipDetail.module.css";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuillContext } from "../context/QuillContext";
import CommentItem from "./CommentItem";
import QuillComment from './QuillComment'
import { Link } from "react-router-dom";

/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const TipDetail = () => {
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

  const Others = () => (
    <span className={`${style.play_title} ${style.others}`}>기타 ✨</span>
  );

  // 게시글정보 저장할 State
  const [tipDetail, setTipDetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getTip = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios
      .get(`http://localhost:8088/tip/tipDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setTipDetail(res.data.detailTip[0]);
        const positionArr = res.data.detailTip[0].category.split(",");
        positionArr.map((item) => (visible[item - 1] = true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 특정 게시글의 작성자 정보를 조회하기 위한 nickname값 가져오기-지홍
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get("id");

  // 회원정보 저장할 state-지홍
  const [memberInfo, setMemberInfo] = useState([]);

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { commentList, setCommentList, getComment, coValue, setCoValue } = useContext(QuillContext);

  // 댓글 내용 가져오는 함수
  const commentChange = (e) => {
    setComment(e.target.value);
  };

  // 회원 정보 조회 함수
  const memberSearching = async () => {
    await axios
      .get(`http://localhost:8088/member/memberSearching?id=${nickname}`)
      .then((res) => {
        console.log("axios다음 니크네임", res.data.member.nickname);
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  // 댓글 작성완료 시 호출되는 함수
  function commentSubmit(event) {
    if (!sessionStorage.getItem("memberId")) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {
    event.preventDefault();
    const obj = {
      id: sessionStorage.getItem('memberId'),
      writer: sessionStorage.getItem("memberNickname"),
      postid: id,
      content: coValue,
      boardType: 'tip'
    };
    console.log(obj);

    axios
      .post("http://localhost:8088/comment/write", obj)
      .then((res) => {
        alert("댓글이 등록되었습니다.");
        console.log(res);
        setCoValue('');
        getComment(id);
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패");
      });
  }};

  // 페이지 빠져나갈 때 댓글 리스트 초기화
  useEffect(() => {
    return () => {
      setCommentList([]);
    };
  }, []);

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getTip();
    getComment(id);
    memberSearching();
  }, []);

  // 날짜 변환 함수
  const getTimeAgoString = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();

    return `${year}년 ${month}월 ${day}일`;
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
    nav(`/tipWrite?id=${id}`);
  };

  // 게시글 삭제
  const deleteTip = async () => {
    await axios
      .post(`http://localhost:8088/tip/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/TipList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  const toggleMeat = () => {
    if (meat) {
      setMeat(!meat);
    }
  };

  return (
    <div className={style.Main_container} onClick={toggleMeat}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.tip_font}>
        <Link to={"/tipList"}>
          <p>팁 공유 📢</p>
          </Link>
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
              <h5>수업중몰래롤</h5>
            </span>
          </span>

          {/* 자유게시판 상세페이지 상단 제목부분 START */}
          <div className={style.play_wrap_top}>
            <div className={style.play_profile}>
              <span>
                <span className={style.play_top_title}>
                  {visible[0] && <Develope />}
                  {visible[1] && <Study />}
                  {visible[2] && <Job />}
                  {visible[3] && <Life />}
                  {visible[4] && <Others />}
                </span>
                <h4>{tipDetail.title}</h4>
              </span>

              <span>
                <div className={style.tip_time_box}>
                  {getTimeAgoString(tipDetail.createdAt)}
                </div>
                <span className={style.tip_comment_box}>
                  👁‍🗨 {tipDetail.views} 💬 {tipDetail.comments}
                </span>
              </span>
            </div>
            <hr className={style.division_line_2}></hr>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 Finish */}

          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            {/* 글 수정/삭제 미트볼 */}
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
            <div className="quill_content_font_style">
              <p dangerouslySetInnerHTML={{ __html: tipDetail.content }}></p>
            </div>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={style.division_line_comment}>
            <div>
              <h4>댓글 {tipDetail.comments}</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
          <div className={style.comment_write}>
              <div>
                <div className={style.comment_write_profile}>
                  <Image src="https://i.ibb.co/XsypSbQ/profile-01.png" roundedCircle />
                </div>
                <div className={style.quillComment_container}>
                  <QuillComment />
                </div>
                {/* <textarea
                  onChange={commentChange}
                  placeholder="댓글을 쓰려면 로그인이 필요합니다."
                  value={comment}
                ></textarea> */}
              </div>
              <div className={style.submit_btn_group}>
                <button type="submit">댓글쓰기</button>
              </div>
            </div>
          </form>
          {/* 댓글달기 끝 */}

          {commentList.map((item) => (
            <CommentItem key={item._id} props={item} postId={id} boardType='tip'/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipDetail;

import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/StudyDetail.module.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { QuillContext } from "../context/QuillContext";
import CommentItem from "./CommentItem";
import QuillComment from './QuillComment'

const StudyDetail = () => {
  /* 키워드 컴포넌트 */

  const FindSomeone = () => (
    <span className={`${style.play_title} ${style.findsomeone}`}>
      모집중
    </span>
  );

  const Completed = () => (
    <span className={`${style.play_title} ${style.completed}`}>
      모집완료
    </span>
  );
  const Purpose = () => (
    <span className={`${style.play_title} ${style.purpose}`}>
      코딩테스트 대비 📖
    </span>
  );
  const Getajob = () => (
    <span className={`${style.play_title} ${style.getajob}`}>취업 준비 😋</span>
  );

  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>
      개발 공부 🔎
    </span>
  );
  const Certificate = () => (
    <span className={`${style.play_title} ${style.certificate}`}>
      자격증 공부 📝
    </span>
  );
  const Groupstudy = () => (
    <span className={`${style.play_title} ${style.groupstudy}`}>
      그룹 / 모임 🙋🏻‍♀️
    </span>
  );
  /* 키워드 컴포넌트 */

  /* 수정삭제 버튼 */

  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={style.meat_dropdown}>
      <li onClick={moveUpdate}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
        <span>수정</span>
      </li>
      <li onClick={deleteStudy}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
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

  // 함수들
  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  // 게시글정보 저장할 State
  const [studyDetail, setStudyDetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false, false]);

  // 특정 게시글 조회하기위한 nickname값 가져오기 -지홍
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get("id");

  // 회원정보 저장할 state -지홍
  const [memberInfo, setMemberInfo] = useState({});

  //회원정보 조회 함수 -지홍
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

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것
  const getStudy = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios
      .get(`http://localhost:8088/study/detail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        setStudyDetail(res.data.detailStudy[0]);
        console.log(res.data.detailStudy[0]);
        const positionArr = res.data.detailStudy[0].selectedValues.split(",");
        positionArr.map((item) => (visible[item - 1] = true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getStudy();
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
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference === 0) {
      if (hoursDifference === 0) {
        return "방금 전";
      } else {
        return `${hoursDifference}시간 전`;
      }
    } else {
      return `${daysDifference}일 전`;
    }
  };

  // 수정 페이지 이동
  const moveUpdate = () => {
    window.location.href = `/studyWrite?id=${id}`;
  };

  // 게시글 삭제
  const deleteStudy = async () => {
    await axios
      .post(`http://localhost:8088/study/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/studyList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { commentList, setCommentList, getComment, coValue, setCoValue } = useContext(QuillContext);

  // 댓글 내용 가져오는 함수
  const commentChange = (e) => {
    setComment(e.target.value);
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
        boardType: 'study'
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
    }
  }

  // 페이지 빠져나갈 때 댓글 리스트 초기화
  useEffect(() => {
    return () => {
      setCommentList([]);
    };
  }, []);

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      {/* 아래 쪽에 projectDetail에서 꺼내쓰는 부분은 위 State에서 꺼내는 부분입니당 */}
      <div className={style.right_container} onClick={toggleMeat}>
        <div className={style.division_line}>
          <div className={style.division_top_line}>
            <Link>Community🌐</Link> /{" "}
            <Link to={"/studyList"}>스터디 구해요🐣</Link>
          </div>
        </div>
        <div>
          <div className={style.keyworld_buttons}>
            <FindSomeone/>
            {visible[0] && <Purpose />}
            {visible[1] && <Getajob />}
            {visible[2] && <Develope />}
            {visible[3] && <Certificate />}
            {visible[4] && <Groupstudy />}
          </div>
          <div className={style.Top_container}>
            <div>
              <h4>{studyDetail.title}</h4>
              <p>
                📆 기간 {getTimeAgoString(studyDetail.periodStart)}~
                {getTimeAgoString(studyDetail.periodEnd)}
              </p>
              <p>🙍‍♂️ 인원 {studyDetail.persons}명</p>
            </div>

            <div className={style.Top_right_container}>
              <div>
                <span>
                  <p>{memberInfo.class}</p>
                  <h5>{memberInfo.nickname}</h5>
                </span>

                <span className={style.Profile_img}>
                  <Image src={memberInfo.profileImg} roundedCircle />
                </span>
              </div>
              <div>
                <p>👁‍🗨 {studyDetail.views} 💬 10</p>
              </div>
              <span className={style.mem_completed}>
                  모집완료 ✔
                </span>
            </div>
          </div>

          <hr />
          <div className={style.text_content_wrapper}>
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

            <div className={style.Detail_content}>
              <div className="quill_content_font_style">
                <p
                  dangerouslySetInnerHTML={{ __html: studyDetail.content }}
                ></p>
              </div>
            </div>
          </div>

          <div className={style.division_line}>
            <div>
              <p>댓글 3</p>
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

          {/* 댓글부분 */}
          {commentList.map((item) => (
            <CommentItem key={item._id} props={item} postId={id} boardType='study'/>
          ))}
          {/* 댓글부분 */}
        </div>
      </div>
    </div>
  );
};

export default StudyDetail;

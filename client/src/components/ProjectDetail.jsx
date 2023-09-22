import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import Button from "react-bootstrap/Button";
import PlayBoard from "../css/PlayBoardDetail.module.css";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";

const ProjectDetail = () => {
  /* 키워드 컴포넌트 */

  // 내부 컴포넌트
  const Frontend = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.frontend}`}>
      프론트엔드✨
    </span>
  );
  const Backend = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.backend}`}>
      백엔드👻
    </span>
  );
  const Db = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.db}`}>
      DataBase🎓
    </span>
  );
  const Uxui = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.uxui}`}>UX/UI🎨</span>
  );
  const Fullstack = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.fullstack}`}>
      풀스택💼
    </span>
  );
  /* 키워드 컴포넌트 */

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 내용 가져오는 함수
  const commnetChange = (e) => {
    setComment(e.target.value);
  }

  // 댓글 작성 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();
    const obj = {
      postid: id,
      content: comment
    };
    console.log(obj);

    axios.post('http://localhost:8088/comment/write', obj)
      .then((res) => {
        alert("댓글이 등록되었습니다.")
        console.log(res);
        getComment();
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패")
      })
  }

  // 댓글 리스트 저장할 State
  const [commentList, setCommentList] = useState([]);

  // 댓글 조회 함수
  const getComment = () => {
    axios.get(`http://localhost:8088/comment/commentList?postId=${id}`)
      .then((res) => {
        console.log(res.data);
        setCommentList(res.data.comment)
      })
  }

  // 댓글 삭제 함수
  const deleteComment = (commentId) => {
    axios.get(`http://localhost:8088/comment/delete/${commentId}`)
      .then((res) => {
        getComment();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /* 댓글 컴포넌트 */
  const CommentItem = ({ props }) => (
    <div className={PlayBoard.comment_list}>
      <div className={PlayBoard.play_comment_profile}>
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
          {props.content}
        </p>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

      <div>
        <p>{getTime(props.createdAt)}</p>
      </div>
    </div>
  );
  /* 댓글 컴포넌트 */

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();
  // 특정 게시글 조회하기위한 nickname값 가져오기 -지홍
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get('nickname');

  // 게시글정보 저장할 State
  const [projectDetail, setProjectDetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false, false]);

  // 회원정보 저장할 state -지홍
  const [memberInfo, setMemberInfo] = useState({});

  //회원정보 조회 함수 -지홍
  const memberSearching = async () => {

    await axios
      .get(`http://localhost:8088/member/memberSearching?nickname=${nickname}`)
      .then((res) => {
        console.log('axios다음 니크네임', res.data.member.nickname);
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log('err :', err);
      })
  };

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것
  const getProject = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    const response = await axios.get(
      `http://localhost:8088/project/projectDetail/${id}`
    );
    // respnse에서 데이터 꺼내서 State에 저장
    setProjectDetail(response.data.detailProject[0]);
    const positionArr = response.data.detailProject[0].position.split(',');
    positionArr.map((item) => (visible[item - 1] = true));
  };

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

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getProject();
    memberSearching();
  }, []);

  // 수정 페이지 이동
  const moveUpdate = () => {
    window.location.href = `/projectWrite?id=${id}`;
  };

  // 게시글 삭제
  const deleteProject = async () => {
    await axios.post(`http://localhost:8088/project/delete/${id}`)
      .then((res) => {
        alert("삭제 완료")
        window.location.href = '/ProjectList'
      })
      .catch((err) => {
        alert("삭제 실패")
        console.log(err);
      })
  }

  /* 수정삭제 버튼 */

  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={PlayBoard.meat_dropdown}>
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
      <li onClick={deleteProject}>
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

  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container} onClick={toggleMeat}>
        <div className={PlayBoard.division_line}>
          <div>
            <a href="#">Community🌐</a> /{" "}
            <a href="/playboardList">프로젝트 같이해요🛵</a>
          </div>
        </div>

        <div className={PlayBoard.play_wrap_content}>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={PlayBoard.play_wrap_top}>
            <div className={PlayBoard.play_top_title}>
              {visible[0] && <Backend />}
              {visible[1] && <Frontend />}
              {visible[2] && <Fullstack />}
              {visible[3] && <Db />}
              {visible[4] && <Uxui />}
            </div>

            <div className={PlayBoard.play_profile}>
              <span>
                <h4>
                  {projectDetail.title}
                </h4>
                <p>📆 기간 {getTimeAgoString(projectDetail.startDate)} ~ {getTimeAgoString(projectDetail.endDate)}</p>
                <p>🙍‍♂️ 인원 {projectDetail.persons}명</p>
                <p>📝 활용기술 {projectDetail.framework_front}, {projectDetail.framework_back}, {projectDetail.framework_db}</p>
              </span>

              <div>
                <span className={PlayBoard.play_detail_profile}>
                  <span className={PlayBoard.profile_text}>
                    <p>{memberInfo.class}</p>
                    <h4>{memberInfo.nickname}</h4>
                  </span>
                  <span className={PlayBoard.profile_pic}>
                    <img src={memberInfo.profileImg} />
                  </span>
                </span>
                <span>
                  <p>👁‍🗨 {projectDetail.views} 💬 4</p>
                </span>
              </div>
            </div>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 END!!!!! */}

          {/* 게시글 content 시작 */}
          <div className={PlayBoard.meatball}>
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

          <div className={PlayBoard.play_content}>
            <span dangerouslySetInnerHTML={{ __html: projectDetail.content }}></span>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={PlayBoard.division_line_comment}>
            <div>
              <h4>댓글 3</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
            <div className={PlayBoard.comment_write}>
              <div>
                <div>
                <Image src="https://i.ibb.co/XsypSbQ/profile-01.png" roundedCircle />
                </div>
                <textarea onChange={commnetChange} placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
              </div>
              <button type="submit">댓글쓰기</button>
            </div>
          </form>
          {/* 댓글달기 끝 */}

          {commentList.map((item) => (<CommentItem key={item._id} props={item} />))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

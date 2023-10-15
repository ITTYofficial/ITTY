import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/QnaDetail.module.css";
import styles from "../css/Community.module.css";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { QuillContext } from "../context/QuillContext";
import QnaCommentItem from "./QnaCommentItem";
import QuillComment from './QuillComment'
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
/* css는 project etail css 내용만 가져와서 추가해서 사용 중~ */

const QnaDetail = () => {
  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  /* 글 제목 앞에 쓰일 카테고리 아이콘(글 작성시 선택 가능-개발/공부/취업/생활 및 기타 ) */
  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>개발 👩🏻‍💻</span>
  );
  const Study = () => (
    <span className={`${style.play_title} ${style.study}`}>공부 📚</span>
  );
  const Job = () => (
    <span className={`${style.play_title} ${style.job}`}>취업 🎓</span>
  );
  const Life = () => (
    <span className={`${style.play_title} ${style.life}`}>생활 🌷</span>
  );
  const Others = () => (
    <span className={`${style.play_title} ${style.others}`}>기타 ✨</span>
  );

  // 게시글정보 저장할 State
  const [qnaDetail, setQnADetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getQnA = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios
      .get(`http://localhost:8088/qna/qnaDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setQnADetail(res.data.detailQnA[0]);
        const positionArr = res.data.detailQnA[0].category.split(",");
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

  // 현재 로그인 회원 정보 조회
  const nowUser = sessionStorage.getItem("memberId")

  // 회원정보 저장할 state-지홍
  const [memberInfo, setMemberInfo] = useState([]);

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

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { commentList, setCommentList, getComment, coValue, setCoValue, myInfo, setMyInfo } = useContext(QuillContext);

  // 댓글 작성완료 시 호출되는 함수
  function commentSubmit(event) {
    if (!sessionStorage.getItem("memberId")) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {
      event.preventDefault();

      // 댓글 빈값 막기
      if (coValue == "" || coValue == "<p><br></p>") {
        alert("내용을 입력해주세요");
        return; // 댓글이 비어있으면 함수를 여기서 끝내기
      }

      const obj = {
        id: sessionStorage.getItem('memberId'),
        writer: sessionStorage.getItem("memberNickname"),
        postid: id,
        content: coValue,
        boardType: 'qna'
      };

      axios
        .post("http://localhost:8088/comment/write", obj)
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          setCoValue("");
          getComment(id);
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 작성 실패");
        });
    }
  };

  // 페이지 빠져나갈 때 댓글 리스트 초기화
  useEffect(() => {
    return () => {
      setCommentList([]);
    };
  }, []);

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getQnA();
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
        <span> 수정</span>
      </li>
      <li onClick={deleteQnA}>
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
        <span> 삭제</span>
      </li>
    </div>
  );

  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/qnaWrite?id=${id}`);
  };

  // 게시글 삭제
  const deleteQnA = async () => {
    await axios
      .post(`http://localhost:8088/qna/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/qnaList";
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


  /* 쪽지 */

  const [message, setMessage] = useState(false);

  const toggleMessage = () => {
    if (message) {
      setMessage(false);
    }
  }

  const messageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('sendUserId', sessionStorage.getItem('memberId'));
    console.log("데이터 확인", e.target);

    const obj = {};
    formData.forEach((value, key) => {
      console.log(`폼 요소 이름: ${key}, 값: ${value}`);
      obj[key] = value;
    });
    await axios.post('http://localhost:8088/message/write', obj)
      .then((res) => {
        alert("글 작성 완료")
        handleClose();

      }).catch((err) => {
        alert("작성에 실패했습니다.")

      })
  }


  /* 모달 */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);

  }
  const handleShow = () => {
    /* setCroppedImage(null); */
    setShow(true);
    /* handleCropperClick(); */
  }

  /* 모달 */


  /* 쪽지 */

  return (
    <div className={style.Main_container} onClick={toggleMeat}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.qna_font}>
          <Link to={"/qnaList"}>
            <p>QnA 💡</p>
          </Link>
        </div>
        <div className={style.division_line}></div>

        <div className={style.play_wrap_content}>
          <span className={style.play_detail_profile}>
            <span className={style.profile_pic} onClick={() => { setMessage(!message) }}>
              <img src="#" />
            </span>
            {message &&
              <div className={style.message_dropdown}>
                <li onClick={handleShow}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  <span>쪽지보내기</span>
                </li>
              </div>
            }
            <Modal show={show} onHide={handleClose}>
              <form onSubmit={messageSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>쪽지 보내기</Modal.Title>
                  <input type="hidden" name='getUserId' value={memberInfo.id}></input>
                </Modal.Header>
                <Modal.Body>
                  <textarea className={style.message_modal_input} name="content" placeholder="쪽지입력" />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    취소
                  </Button>
                  <Button variant="primary" type="submit">
                    보내기
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
            {/* 글 작성 프로필 */}
            <span className={style.profile_text}>
              <p>{memberInfo.class}</p>
              <h5>{memberInfo.nickname}</h5>

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
                <h4>{qnaDetail.title}</h4>
              </span>

              <span>
                <div className={style.qna_time_box}>
                  {getTimeAgoString(qnaDetail.createdAt)}
                </div>
                <span className={style.qna_comment_box}>
                  👁‍🗨 {qnaDetail.views} 💬 {qnaDetail.comments}
                </span>
              </span>
            </div>
            <hr className={style.division_line_2}></hr>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 Finish */}

          {/* 게시글 content 시작 */}
          <div className={style.play_content}>
            <div className={style.meatball} style={{ display: qnaDetail.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
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
              <span
                dangerouslySetInnerHTML={{ __html: qnaDetail.content }}
              ></span>
            </div>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={style.division_line_comment}>
            <div>
              <h4>댓글 {qnaDetail.comments}</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
            <div className={style.comment_write}>
              <div>
                <div className={style.comment_write_profile}>
                  <Image src={myInfo.profileImg ? myInfo.profileImg : "https://i.ibb.co/XsypSbQ/profile-01.png"} roundedCircle />
                </div>
                <div className={style.quillComment_container}>
                  <QuillComment />
                </div>
              </div>
              <div className={style.submit_btn_group}>
                <button type="submit">댓글쓰기</button>
              </div>
            </div>
          </form>
          {/* 댓글달기 끝 */}

          {commentList.map((item) => (
            <QnaCommentItem key={item._id} props={item} postId={id} postWriter={qnaDetail.id} nowUser={nowUser} boardType='qna' />
          ))}
        </div>
      </div>
    </div>
  );
};
export default QnaDetail;

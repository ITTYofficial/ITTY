import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import Button from "react-bootstrap/Button";
import styles from "../css/ProjectDetail.module.css";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { QuillContext } from "../context/QuillContext";
import CommentItem from "./CommentItem";
import QuillComment from './QuillComment'
import Modal from 'react-bootstrap/Modal';

const ProjectDetail = () => {
  /* 키워드 컴포넌트 */

  // 내부 컴포넌트

  const FindSomeone = () => (
    <span className={`${styles.play_title} ${styles.findsomeone}`}>
      모집중
    </span>
  );

  const Completed = () => (
    <span className={`${styles.play_title} ${styles.completed}`}>
      모집완료
    </span>
  );
  const Frontend = () => (
    <span className={`${styles.play_title} ${styles.frontend}`}>
      프론트엔드✨
    </span>
  );
  const Backend = () => (
    <span className={`${styles.play_title} ${styles.backend}`}>백엔드👻</span>
  );
  const Db = () => (
    <span className={`${styles.play_title} ${styles.db}`}>DataBase🎓</span>
  );
  const Uxui = () => (
    <span className={`${styles.play_title} ${styles.uxui}`}>UX/UI🎨</span>
  );
  const Fullstack = () => (
    <span className={`${styles.play_title} ${styles.fullstack}`}>풀스택💼</span>
  );
  /* 키워드 컴포넌트 */

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { commentList, setCommentList, getComment, coValue, setCoValue, myInfo, setMyInfo } = useContext(QuillContext);

  // QuillComment 컴포넌트 초기화용 state
  const [commentKey, setCommentKey] = useState(0);

  // 댓글 작성 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();

    // 회원만 작성가능하게 수정 - 지홍
    if (!sessionStorage.getItem("memberId")) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {

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
        boardType: 'project'
      };

      axios
        .post("http://localhost:8088/comment/write", obj)
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          setCoValue("");
          getComment(id);
          setCommentKey(commentKey + 1);
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

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();
  // 특정 게시글 조회하기위한 nickname값 가져오기 -지홍
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get("id");

  // 게시글정보 저장할 State
  const [projectDetail, setProjectDetail] = useState([]);
  const [visible, setVisible] = useState([false, false, false, false, false]);

  // 현재 로그인 회원 정보 조회
  const nowUser = sessionStorage.getItem("memberId")

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
  const getProject = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    const response = await axios.get(
      `http://localhost:8088/project/projectDetail/${id}`
    );
    // respnse에서 데이터 꺼내서 State에 저장
    setProjectDetail(response.data.detailProject[0]);
    const positionArr = response.data.detailProject[0].position.split(",");
    positionArr.map((item) => (visible[item - 1] = true));
  };

  // 날짜 변환 함수
  const getTimeAgoString = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getProject();
    getComment(id);
    memberSearching();
  }, []);

  // 수정 페이지 이동
  const moveUpdate = () => {
    window.location.href = `/projectWrite?id=${id}`;
  };

  // 게시글 삭제
  const deleteProject = async () => {
    await axios
      .post(`http://localhost:8088/project/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/ProjectList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 모집 상태 변경
  const handleRecruit = async () => {
    let obj = {
      postId: id
    }
    await axios.post(`http://localhost:8088/project/recruit`, obj)
      .then((res) => {
        // 글 정보 자체가 변하는거니까 새로고침으로 했슴다
        console.log(res.data);
        setProjectDetail(res.data.detailProject);
        const positionArr = res.data.detailProject.position.split(",");
        positionArr.map((item) => (visible[item - 1] = true));
        alert('전환 성공')
      })
      .catch((err) => {
        console.log(err);
        alert('전환 실패')
      })
  }

  /* 수정삭제 버튼 */
  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={styles.meat_dropdown}>
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
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container} onClick={toggleMeat}>
        <div className={styles.division_line}>
          <div>
            <a href="#">Community🌐</a> /{" "}
            <a href="/stylesList">프로젝트 같이해요🛵</a>
          </div>
        </div>

        <div className={styles.play_wrap_content}>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={styles.play_wrap_top}>
            <div className={styles.play_top_title}>
              {projectDetail.recruit == 1 ? <FindSomeone /> : <Completed />}
              {visible[0] && <Backend />}
              {visible[1] && <Frontend />}
              {visible[2] && <Fullstack />}
              {visible[3] && <Db />}
              {visible[4] && <Uxui />}
            </div>

            <div className={styles.play_profile}>
              <span>
                <h4>{projectDetail.title}</h4>
                <p>
                  📆 기간 {getTimeAgoString(projectDetail.startDate)} ~{" "}
                  {getTimeAgoString(projectDetail.endDate)}
                </p>
                <p>🙍‍♂️ 인원 {projectDetail.persons}명</p>
                <p>
                  📝 활용기술 {projectDetail.framework_front},{" "}
                  {projectDetail.framework_back}, {projectDetail.framework_db}
                </p>
              </span>

              <div>
                <span className={styles.play_detail_profile}>
                  <span className={styles.profile_text}>
                    <p>{memberInfo.class}</p>
                    <h4>{memberInfo.nickname}</h4>
                  </span>
                  <span className={styles.profile_pic} onClick={() => { setMessage(!message) }}>
                    <img src={memberInfo.profileImg} />
                  </span>
                  {message &&
                    <div className={styles.message_dropdown}>
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
                        <textarea className={styles.message_modal_input} name="content" placeholder="쪽지입력" />
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

                </span>
                <span className={styles.profile_view}>
                  <p>👁‍🗨 {projectDetail.views} 💬 {projectDetail.comments}</p>
                </span>
                {(nowUser === projectDetail.id ?
                  <span className={styles.mem_completed} onClick={handleRecruit}>
                    모집완료 ✔
                  </span>
                  :
                  null)}

              </div>
            </div>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 END!!!!! */}

          {/* 게시글 content 시작 */}

          <div className={styles.play_content}>
            <div className={styles.meatball} style={{ display: projectDetail.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
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
              <p
                dangerouslySetInnerHTML={{ __html: projectDetail.content }}
              ></p>
            </div>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={styles.division_line_comment}>
            <div>
              <h4>댓글 {projectDetail.comments}</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
            <div className={styles.comment_write}>
              <div>
                <div className={styles.comment_write_profile}>
                  <Image src={myInfo.profileImg ? myInfo.profileImg : "https://i.ibb.co/XsypSbQ/profile-01.png"} roundedCircle />
                </div>
                <div className={styles.quillComment_container}>
                  <QuillComment key={commentKey} />
                </div>
                {/* <textarea
                  onChange={commentChange}
                  placeholder="댓글을 쓰려면 로그인이 필요합니다."
                  value={comment}
                ></textarea> */}
              </div>
              <div className={styles.submit_btn_group}>
                <button type="submit">댓글쓰기</button>
              </div>
            </div>
          </form>
          {/* 댓글달기 끝 */}

          {commentList.map((item) => (
            <CommentItem key={item._id} props={item} postId={id} boardType='project' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

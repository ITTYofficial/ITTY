import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/AnonymityDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { QuillContext } from "../context/QuillContext";
import AnonymityComment from "./AnonymityComment";
import QuillComment from './QuillComment'

const AnonymityDetail = () => {
  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  // 회원정보 저장할 state
  const [memberInfo, setMemberInfo] = useState({});


  const [anonyDetail, setAnonyDetail] = useState([]);
  // 게시글 조회함수
  const getAnony = async () => {
    await axios
      .get(`${baseUrl}/anony/anonyDetail/${id}`)
      .then((res) => {
        setAnonyDetail(res.data.detailAnony[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getAnony();
    getAnonyComment(id);
    return () => {
      setAnonyCommentList([]);
    };
  }, []);

  // 날짜 변환 함수
  const getTimeAgoString = (dateString) => {
    const createdAt = new Date(dateString);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/anonymityWrite?id=${id}`);
  };

  // 게시글 삭제
  const deletePlay = async () => {
    await axios
      .post(`${baseUrl}/anony/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/anonymityList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { anonyCommentList, setAnonyCommentList, getAnonyComment, coValue, setCoValue } = useContext(QuillContext);

  // QuillComment 컴포넌트 초기화용 state
  const [commentKey, setCommentKey] = useState(0);

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
        writer: sessionStorage.getItem("memberId"),
        postId: id,
        content: coValue,
      };

      axios
        .post(`${baseUrl}/anony/commentWrite`, obj)
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          setCoValue("");
          getAnonyComment(id);
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
      setAnonyCommentList([]);
    };
  }, []);

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
      <li onClick={deletePlay}>
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
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container} onClick={toggleMeat}>
        <div className={styles.play_wrap_content}>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={styles.play_wrap_top}>
            <div className={styles.play_profile}>
              <span>
                <h2>{anonyDetail.title}</h2>
                <p>{getTimeAgoString(anonyDetail.createdAt)}</p>
              </span>

              <div>
                <span className={styles.play_detail_profile}>
                  <span className={styles.profile_text}>
                    <p>{memberInfo.class}</p>
                    <h4>{memberInfo.nickname}</h4>
                  </span>
                  <span className={styles.profile_pic}>
                    <Image
                      src="https://i.ibb.co/G3ZBWXt/01.png"
                      roundedCircle
                    />
                  </span>
                </span>
                <span className={styles.profile_view}>
                  <p>👁‍🗨 {anonyDetail.views} 💬 {anonyDetail.comments}</p>
                </span>
              </div>
            </div>
          </div>
          {/* 게시글 content 시작 */}
          <div className={styles.play_content}>
            <div className={styles.meatball} style={{ display: anonyDetail.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
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
              <span dangerouslySetInnerHTML={{ __html: anonyDetail.content }} />
            </div>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={styles.division_line_comment}>
            <div>
              <h4>댓글 {anonyDetail.comments}</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
            <div className={styles.comment_write}>
              <div>
                <div className={styles.comment_write_profile}>
                  <Image src="https://i.ibb.co/G3ZBWXt/01.png" roundedCircle />
                </div>
                <div className={styles.quillComment_container}>
                  <QuillComment key={commentKey} />
                </div>
              </div>
              <div className={styles.submit_btn_group}>
                <button type="submit">댓글쓰기</button>
              </div>
            </div>
          </form>
          {/* 댓글달기 끝 */}

          {anonyCommentList.map((item) => (
            <AnonymityComment key={item._id} props={item} postId={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnonymityDetail;

import React, { useContext, useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/AnonymityDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import CommentItem from "./CommentItem";
import { QuillContext } from "../context/QuillContext";
import AnonymityComment from "./AnonymityComment";
import QuillComment from './QuillComment'

const AnonymityDetail = () => {
  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();
  console.log("아이디 옴?", id);

  // 특정 게시글 조회하기위한 nickname값 가져오기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // 게시글정보 저장할 State
  /* const [anonyDetail, setanonyDetail] = useState([]); */
  // 회원정보 저장할 state
  const [memberInfo, setMemberInfo] = useState({});

  // console.log('디테일상단 니크네임', nickname);

  const [anonyDetail, setAnonyDetail] = useState([]);
  // 게시글 조회함수
  const getAnony = async () => {
    await axios
      .get(`http://localhost:8088/anony/anonyDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        /* console.log('res 확인', res.data.detailAnony[0]); */
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
    /* memberSearching(); */
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
      .post(`http://localhost:8088/anony/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/anonymityList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { anonyCommentList, setAnonyCommentList, getAnonyComment } =
    useContext(QuillContext);

  // 댓글 내용 가져오는 함수
  const commentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 작성완료 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();
    const obj = {
      writer: sessionStorage.getItem("memberId"),
      postId: id,
      content: comment,
    };
    console.log(obj);

    axios
      .post("http://localhost:8088/anony/commentWrite", obj)
      .then((res) => {
        alert("댓글이 등록되었습니다.");
        console.log(res);
        getAnonyComment(id);
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패");
      });
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
        {/*                 <div className={styles.division_line}>
                    <div>
                        <Link>Community🌐</Link> /{" "}
                        <Link to={"/stylesList"}>자유게시판⚽</Link>
                    </div>
                </div> */}

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
                      src="https://cdn-icons-png.flaticon.com/512/4123/4123763.png"
                      roundedCircle
                    />
                  </span>
                </span>
                <span>
                  <p>👁‍🗨 {anonyDetail.views} 💬 4</p>
                </span>
              </div>
            </div>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 END!!!!! */}

          {/* 게시글 content 시작 */}

          <div className={styles.play_content}>
            <div className={styles.meatball}>
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
                dangerouslySetInnerHTML={{ __html: anonyDetail.content }}
              ></span>
            </div>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={styles.division_line_comment}>
            <div>
              <h4>댓글 3</h4>
            </div>
          </div>
          <form onSubmit={commentSubmit}>
          <div className={styles.comment_write}>
              <div>
                <div className={styles.comment_write_profile}>
                  <Image src="https://i.ibb.co/XsypSbQ/profile-01.png" roundedCircle />
                </div>
                <div className={styles.quillComment_container}>
                  <QuillComment />
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

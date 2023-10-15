import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../css/CommentItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { QuillContext } from "../context/QuillContext";
import QuillReComment from './QuillReComment'

const CommentItem = ({ props, postId, boardType }) => {

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { getComment, deleteComment, deleteReComment, reCoValue, setReCoValue, myInfo, setMyInfo } =
    useContext(QuillContext);

  // 대댓글 작성완료 시 호출되는 함수
  function reCommentSubmit(event, _id) {
    if (!sessionStorage.getItem("memberId")) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {
      event.preventDefault();

      // 댓글 빈값 막기
      if (reCoValue == "" || reCoValue == "<p><br></p>") {
        alert("내용을 입력해주세요");
        return; // 댓글이 비어있으면 함수를 여기서 끝내기
      }
      const createdAt = new Date().toISOString();
      const obj = {
        id: sessionStorage.getItem("memberId"),
        writer: sessionStorage.getItem("memberNickname"),
        content: reCoValue,
        commentId: _id,
        createdAt: createdAt,
        boardType: boardType
      };

      axios
        .post("http://localhost:8088/comment/reWrite", obj)
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          setReCoValue('');
          getComment(postId);
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 작성 실패");
        });
    }
  }

  // 대댓글 작성 칸 출력 조절 State
  const [recommentVisible, setRecommentVisible] = useState(false);

  // 대댓글 작성 칸 함수
  const showRecommentWrite = () => {
    setRecommentVisible(!recommentVisible);
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

  // 대댓글 컴포넌트
  const ReComment = ({ commentId, props, index }) => {
    return (
      <div className={styles.recomment_list_box}>
        <div className={styles.play_recomment_profile}>
          <span>
            <Image src={props.writerInfo.profileImg} roundedCircle />
          </span>
          <span>
            <p>{props.writerInfo.class}</p>
            <h4>{props.writer}</h4>
          </span>
          <div className={styles.recomment_cancel} style={{ display: props.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
            <svg
              onClick={() => deleteReComment(commentId, postId, index, boardType)}
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
          </div>
        </div>
        {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
        <div className={styles.recomment_content_box}>
          <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
        </div>
        {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

        <div className={styles.comment_time_box_2}>
          <p>{getTime(props.createdAt)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.comment_list}>
      <div className={styles.play_comment_profile}>
        <span>
          <Image src={props.writerInfo.profileImg} roundedCircle />
        </span>
        <span>
          <p>{props.writerInfo.class}</p>
          <h4>{props.writer}</h4>
          <div className={styles.comment_cancel} style={{ display: props.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
            <svg
              onClick={() => deleteComment(props._id, postId, boardType)}
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
          </div>
        </span>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
      <div className="quill_comment_font_style">
        <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

      <div>
        <p className={styles.comment_time_box}>{getTime(props.createdAt)}</p>
        <span
          className={styles.recomment_button_box_2}
          onClick={showRecommentWrite}
        >
          댓글쓰기
        </span>
      </div>
      {/* <div
        className={styles.recomment_button_box}
        
      >
        
      </div> */}

      {recommentVisible && (
        <form onSubmit={(event) => reCommentSubmit(event, props._id)}>
          <div className={styles.comment_write}>
            <div>
              <div className={styles.comment_write_profile}>
                <Image src={myInfo.profileImg ? myInfo.profileImg : "https://i.ibb.co/XsypSbQ/profile-01.png"} roundedCircle />
              </div>
              <div className={styles.quillComment_container}>
                <QuillReComment />
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
      )}
      {props.reComment.map((item, index) => (
        <ReComment
          key={index}
          commentId={props._id}
          props={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default CommentItem;

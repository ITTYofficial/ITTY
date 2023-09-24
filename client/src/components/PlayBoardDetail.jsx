import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import PlayBoard from "../css/PlayBoardDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const PlayBoardDetail = () => {
  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();
  // 특정 게시글 조회하기위한 nickname값 가져오기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get('nickname');
  // 게시글정보 저장할 State
  const [playDetail, setplayDetail] = useState([]);
  // 회원정보 저장할 state
  const [memberInfo, setMemberInfo] = useState({});

  console.log('디테일상단 니크네임', nickname);

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
  const getPlay = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios
      .get(`http://localhost:8088/play/playboardDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        setplayDetail(res.data.detailPlay[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getPlay();
    getComment();
    memberSearching();

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
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/playBoardWrite?id=${id}`);
  };

  // 게시글 삭제
  const deletePlay = async () => {
    await axios
      .post(`http://localhost:8088/play/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/playBoardList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 내용 가져오는 함수
  const commentChange = (e) => {
    setComment(e.target.value);
  }



  // 댓글 작성완료 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();
    const obj = {
      writer: sessionStorage.getItem("memberNickname"),
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
  /* const getComment = async () => {
    try {
      const res = await axios.get(`http://localhost:8088/comment/commentList?postId=${id}`);

      let commentsWithMemberInfo = await Promise.all(
        res.data.comment.map(async (comment) => {
          const writerInfoResponse = await axios.get(
            `http://localhost:8088/member/memberSearching?nickname=${comment.writer}`
          );
          comment.writerInfo = {
            class: writerInfoResponse.data.member.class,
            profileImg: writerInfoResponse.data.member.profileImg,
          };

          if (comment.reComment) {
            comment.reComment = await Promise.all(
              comment.reComment.map(async (reComment) => {
                const reWriterInfoResponse = await axios.get(
                  `http://localhost:8088/member/memberSearching?nickname=${reComment.writer}`
                );
                reComment.writerInfo = {
                  class: reWriterInfoResponse.data.member.class,
                  profileImg: reWriterInfoResponse.data.member.profileImg,
                };
                return reComment;
              })
            );
          }

          return comment;
        })
      );

      console.log("commentsWithMemberInfo 내용물 : ", commentsWithMemberInfo);

      const sortedComments = commentsWithMemberInfo.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      setCommentList(sortedComments);
    } catch (err) {
      alert("통신에 실패했습니다.");
      console.log(err);
    }
  }; */




  // 댓글 조회 함수
  const getComment = () => {
    console.time('소요시간');
    axios.get(`http://localhost:8088/comment/commentList2?postId=${id}`)
      .then((res) => {
        console.log('확인!', res.data);
        setCommentList(res.data.comments)
        console.timeEnd('소요시간');
      })
  }

  /* 작성자 정보 뭉탱이로 가져가서 받아오기 */
  /*   const [writerInfoArray, setWriterInfoArray] = useState([]);
  
    const getWriter = async () => {
      const obj = {};
      commentList.forEach(comment => {
        if (!obj[comment.writer]) {
          obj[comment.writer] = true;
        }
  
        if (comment.reComment) {
          comment.reComment.forEach(reComment => {
            if (!obj[reComment.writer]) {
              obj[reComment.writer] = true;
            }
          });
        }
      });
      const writers = Object.keys(obj);
  
      try {
        const response = await axios.post('http://localhost:8088/member/getWriterInfo', { writers });
        const writerInfoArray = response.data.writerInfoArray;
        console.log('작성자 정보:', writerInfoArray);
        setWriterInfoArray(writerInfoArray);
  
      } catch (error) {
        console.error(error);
      }
    };
  
    console.log('확인', writerInfoArray);
  
  
    useEffect(() => {
      getWriter();
    }, [commentList]); */

  /* 작성자 정보 뭉탱이로 가져가서 받아오기 */

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

  const ReComment = ({ props }) => {

    return (
      <div className={PlayBoard.recomment_list_box}>
        <div className={PlayBoard.play_recomment_profile}>
          <span>
            <Image src={props.writerInfo.profileImg} roundedCircle />
          </span>
          <span>
            <p>{props.writerInfo.class}</p>
            <h4>{props.writer}</h4>
          </span>
          <div className={PlayBoard.recomment_cancel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </div>

        </div>
        {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
        <div>
          <p>
            {props.content}
          </p>
        </div>
        {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

        <div className={PlayBoard.comment_time_box_2}>
          <p>{getTime(props.createdAt)}</p>
        </div>

      </div>
    )
  };


  const [recommentVisible, setRecommentVisible] = useState(false);

  const showRecommentWrite = () => {
    setRecommentVisible(!recommentVisible);
  }

  const CommentItem = ({ props }) => {

    // 대댓글 작성완료 시 호출되는 함수
    function reCommentSubmit(event, _id) {
      event.preventDefault();
      console.log(_id);
      const createdAt = new Date().toISOString();
      const obj = {
        writer: sessionStorage.getItem("memberNickname"),
        content: reComment,
        commentID: _id,
        createdAt: createdAt
      };
      console.log(obj);

      axios.post('http://localhost:8088/comment/reWrite', obj)
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

    // 대댓글 내용 담을 State
    const [reComment, setReComment] = useState();

    // 대댓글 내용 가져오는 함수
    const reCommentChange = (e) => {
      setReComment(e.target.value);
      console.log(e.target.value);
    }

    return (
      <div className={PlayBoard.comment_list}>
        <div className={PlayBoard.play_comment_profile}>
          <span>
            <Image src={props.writerInfo.profileImg} roundedCircle />
          </span>
          <span>
            <p>{props.writerInfo.class}</p>
            <h4>{props.writer}</h4>
            <div className={PlayBoard.comment_cancel}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </div>
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
          <p className={PlayBoard.comment_time_box}>{getTime(props.createdAt)}</p>
        </div>
        <div className={PlayBoard.recomment_button_box} onClick={showRecommentWrite}>
          댓글쓰기
        </div>

        {recommentVisible &&
          <form onSubmit={(event) => reCommentSubmit(event, props._id)}>
            <div className={PlayBoard.recomment_write}>
              <div>
                <div>
                  <img src="#" />
                </div>``
                <textarea onBlur={reCommentChange} placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
              </div>
              <button type="submit">댓글쓰기</button>
            </div>
          </form>
        }
        {props.reComment.map((item) => <ReComment props={item} />)}

      </div>
    );
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
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container} onClick={toggleMeat}>
        <div className={PlayBoard.division_line}>
          <div>
            <a href="#">Community🌐</a> /{" "}
            <a href="/playboardList">자유게시판⚽</a>
          </div>
        </div>

        <div className={PlayBoard.play_wrap_content}>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={PlayBoard.play_wrap_top}>
            <div className={PlayBoard.play_profile}>
              <span>
                <h2>
                  {playDetail.title}
                </h2>
                <p>{getTimeAgoString(playDetail.createdAt)}</p>
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
                  <p>👁‍🗨 {playDetail.views} 💬 4</p>
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
            <div className='quill_content_font_style'>
              <span dangerouslySetInnerHTML={{ __html: playDetail.content }}></span>
            </div>
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
                  <img src="#" />
                </div>
                <textarea onBlur={commentChange} placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
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

export default PlayBoardDetail;

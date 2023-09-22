import React, { useEffect, useState } from 'react'
import style from "../css/PortDetail.module.css";
import LeftContainer from './LeftContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PortDetail = () => {

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  // 댓글 내용 담을 State
  const [comment, setComment] = useState();

  // 댓글 내용 가져오는 함수
  const commnetChange = (e) => {
    setComment(e.target.value);
  }

  // 댓글 작성 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();
    // 회원만 작성가능하게 수정 - 지홍
    if (!sessionStorage.getItem('memberId')) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {
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
  };

  // 댓글 리스트 저장할 State
  const [commentList, setCommentList] = useState([]);

  // 댓글 조회 함수
  const getComment = () => {
    axios.get(`http://localhost:8088/comment/commentList?postId=${id}`)
      .then(async (res) => {
        // 회원정보 조회 -지홍 (내림차순 정렬까지 내가 했다 광영아)
        let memberPromises = res.data.comment.map((comment) => {
          const nickname = comment.writer;
          return axios.get(
            `http://localhost:8088/member/memberSearching?nickname=${nickname}`
          );
        });

        let memberResponses = await Promise.all(memberPromises);
        let member = memberResponses.map((response) => ({
          member: response.data.member,
        }));

        console.log("member 내용물 : ", member.member);
        // 게시판 정보랑 회원정보랑 하나로 합치는 함수
        let fusion = member.map((item, index) => {
          return { ...item, ...res.data.comment[index] };
        });
        console.log("퓨전", fusion);

        const sortedcomments = fusion.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setCommentList(sortedcomments)
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };

  // 댓글 삭제 함수
  const deleteComment = (commentId) => {// <- commentId가 뭐죠??

    axios.get(`http://localhost:8088/comment/delete/${commentId}`)
      .then((res) => {
        getComment();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const CommentItem = ({ props }) => (
    <div className={style.comment_list}>
      <div className={style.play_comment_profile}>
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

  // 게시글정보 저장할 State
  const [portDetail, setPortDetail] = useState([]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getPort = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios.get(`http://localhost:8088/port/portDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setPortDetail(res.data.detailPort[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getPort();
    getComment();
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

  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/portWrite?id=${id}`)
  }

  // 게시글 삭제
  const deletePort = async () => {
    await axios.post(`http://localhost:8088/port/delete/${id}`)
      .then((res) => {
        alert("삭제 완료")
        window.location.href = '/PortList'
      })
      .catch((err) => {
        alert("삭제 실패")
        console.log(err);
      })
  }


  /* 수정삭제 버튼 */

  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={style.meat_dropdown}>
      <li onClick={moveUpdate}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
        <span>수정</span>
      </li>
      <li onClick={deletePort}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container} onClick={toggleMeat}>
        <h4>{portDetail.title}</h4>
        <div className={style.top_container}>
          <div className={style.top_container_sub}>
            <div className={style.profile_img}>
              <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
            </div>
            <div>
              <p>빅데이터분석반</p>
              <p>언제취뽀</p>
            </div>
          </div>
          <div>
            <p>{getTimeAgoString(portDetail.createdAt)} 👁‍🗨 {portDetail.views} 💬 4</p>
          </div>
        </div>

        <div className={style.middle_container}>
          <img src={portDetail.imgPath}></img>

        </div>

        {/* 글 내용 부분 */}
        <div className={style.meatball}>
          <ul>
            <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
            {meat && <Dropdown />}
          </ul>
        </div>


        <div>
          <p dangerouslySetInnerHTML={{ __html: portDetail.content }}></p>
        </div>

        <div className={style.division_line_comment}>
          <div>
            <h4>댓글 3</h4>
          </div>
        </div>

        <div className={style.comment_write}>
          <div>
            <div>
              <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
            </div>
            <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
          </div>
          <button type="button">댓글쓰기</button>
        </div>

        {commentList.map((item) => (<CommentItem key={item._id} props={item} />))}

      </div>
    </div>
  )
}

export default PortDetail
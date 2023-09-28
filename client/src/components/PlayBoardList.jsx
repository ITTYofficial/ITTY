import React, { useEffect, useState } from "react";
import PlayBoard from "../css/PlayBoardList.module.css";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Pagination from "react-js-pagination";

const PlayBoardList = (props) => {
  // 장터리스트 담을 State
  const [playList, setPlayList] = useState([]);

  // 회원만 작성 할 수 있도록 제한하는 함수-지홍
  const checkSessionStorage = (e) => {
    // sessionStorage에서 값을 가져옴
    var value = sessionStorage.getItem("memberId");

    // 값이 없으면 alert 창을 표시하고 /login 페이지로 이동
    if (!value || value === "") {
      alert("로그인해야합니다");
      window.location.href = "/login";
      e.preventDefault();
    }
  };

  // 새로운 게시판 리스트 함수
  const getList = async() => {
    console.log('조회함수 진입');
    console.time('소요시간');
   await axios.get(`http://localhost:8088/total/findMemberInfo?play=play`)
      .then(async(res) => {
        console.log('확인!', res.data);
        
        const sortedPlays = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // 댓글 개수 카운팅
        const counting = sortedPlays.map((item) => (item._id))
        const countList = (await axios.post(`http://localhost:8088/comment/commentCount`, counting)).data.countList
        const play = sortedPlays.map((obj, index) => ({
          ...obj,
          count: countList[index],
        }));
        setPlayList(play);
        setMaxPage(sortedPlays.length);

        // setPlayList(res.data.lists);
        // setMaxPage(res.data.lists.length)

        console.timeEnd('소요시간');
      })
  }

  // 게시판 리스트 조회 함수
  // const readPlayList = async () => {
  //   await axios
  //     .get("http://localhost:8088/play/playList")
  //     .then(async (res) => {
  //       // 회원정보조회-지홍
  //       console.log("1. writer :", res.data.play[0].writer);
  //       let memberPromises = res.data.play.map((play) => {
  //         const nickname = play.writer;
  //         const id = play.id

  //         return axios.get(
  //           `http://localhost:8088/member/memberSearching?id=${id}`
  //         );
  //       });

  //       let memberResponses = await Promise.all(memberPromises);
  //       let member = memberResponses.map((response) => ({
  //         member: response.data.member,
  //       }));

  //       console.log("member 내용물 : ", member.member);
  //       let fusion = member.map((item, index) => {
  //         return { ...item, ...res.data.play[index] };
  //       });
  //       console.log("퓨전", fusion);

  //       const sortedPlays = fusion.sort((a, b) => {
  //         // 게시글 데이터 작성 일자별 내림차순 정렬
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       });

  //       // 댓글 개수 카운팅
  //       const counting = sortedPlays.map((item) => (item._id))
  //       const countList = (await axios.post(`http://localhost:8088/comment/commentCount`, counting)).data.countList
  //       const play = sortedPlays.map((obj, index) => ({
  //         ...obj,
  //         count: countList[index],
  //       }));
  //       setPlayList(play);
  //       setMaxPage(sortedPlays.length);
  //     })
  //     .catch((err) => {
  //       alert("통신에 실패했습니다.");
  //       console.log(err);
  //     });
  // };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    //  readPlayList();
     getList(); //-> 오늘 집가서 광영이가 올린거 합쳐서 활성화 시킬게요~~~
    // const nickname = playList[0]
    // console.log(nickname);
    // memberSearching(nickname);
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTimeAgoString = (dateString) => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const timeDifference = now - createdAt;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    if (minutesDifference === 0) {
      return "방금 전";
    } else if (minutesDifference < 60) {
      return `${minutesDifference}분 전`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}시간 전`;
    } else {
      return `${daysDifference}일 전`;
    }
  };

  const PlayItem = ({ props }) => (
    <div className={PlayBoard.Main_container_list_detail}>
      <div>
        <p className={PlayBoard.b_date}>{getTimeAgoString(props.createdAt)}</p>
        <Link to={`/playboardDetail/${props._id}?id=${props.id}`}>
          <h4>{props.title}</h4>
        </Link>
        {/* <p>글 내용 영역</p> */}
        <p>👁‍🗨{props.views} 💬{props.count}</p>
      </div>

      <div className={PlayBoard.Main_grid_profile}>
        <span className={PlayBoard.profile_text}>
          {/* <p>데이터 디자인</p> */}
          <p>{props.writerInfo.class}</p>
          <h4>{props.writer}</h4>
        </span>
        <span className={PlayBoard.profile_pic}>
          <Image src={props.writerInfo.profileImg} roundedCircle />
        </span>
      </div>
    </div>
  );


  // 페이징 부분
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log('페이지 확인', page);
  };

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 페이징 부분



  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.Main_container_banner}>
          <img src="https://i.ibb.co/0m6fT0n/play.png" alt="play" />
        </div>
        <div className={PlayBoard.right_container_button}>
          <h2>자유게시판⚽</h2>
          <a href="/playBoardWrite" onClick={checkSessionStorage}>
            작성하기
          </a>
        </div>

        <div className={PlayBoard.Main_container_list}>
          {/* 글 반복 시작 */}
          {playList.slice(startIndex, endIndex).map((item) => (
            <PlayItem key={item._id} props={item} />
          ))}
          {/* 글 반복 끝 */}
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={maxPage}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayBoardList;
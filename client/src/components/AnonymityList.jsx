import React, { useEffect, useState } from "react";
import PlayBoard from "../css/PlayBoardList.module.css";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Pagination from "react-js-pagination";

const AnonymityList = (props) => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // 장터리스트 담을 State
  const [anonyList, setAnonyList] = useState([]);

  // 회원만 작성 할 수 있도록 제한하는 함수-지홍
  const checkSessionStorage = (e) => {
    var value = sessionStorage.getItem("memberId");

    if (!value || value === "") {
      alert("로그인해야합니다");
      window.location.href = "/login";
      e.preventDefault();
    }
  };

  // 게시판 리스트 조회 함수
  const readAnonyList = async () => {
    await axios
      .get(`${baseUrl}/anony/anonyList`)
      .then(async (res) => {
        const sortedAnony = res.data.anony.sort((a, b) => {

          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAnonyList(sortedAnony);
        setMaxPage(sortedAnony.length);
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readAnonyList();
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
        <Link to={`/anonymityDetail/${props._id}?id=${props.id}`}>
          <h4>{props.title}</h4>
        </Link>
        <p>👁‍🗨{props.views} 💬{props.comments}</p>
      </div>

      <div className={PlayBoard.Main_grid_profile}>
        <span className={PlayBoard.profile_text}>
          <h4>익명</h4>
        </span>
        <span className={PlayBoard.profile_pic}>
          <Image
            src="https://i.ibb.co/G3ZBWXt/01.png"
            roundedCircle
          />
        </span>
      </div>
    </div>
  );


  // 페이징 부분
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
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
          <img src="https://i.ibb.co/QYbxpvT/private.png" alt="private" />
        </div>
        <div className={PlayBoard.right_container_button}>
          <h2>익명게시판 🕵️</h2>
          <a href="/anonymityWrite" onClick={checkSessionStorage}>
            작성하기
          </a>
        </div>

        <div className={PlayBoard.Main_container_list}>
          {/* 글 반복 시작 */}
          {anonyList.slice(startIndex, endIndex).map((item) => (
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

export default AnonymityList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import styles from "../css/Community.module.css";
import style from "../css/QnaList.module.css";
import Image from "react-bootstrap/Image";
import Pagination from "react-js-pagination";
const QnaList = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // QnA 리스트 담을 State
  const [qnaList, setQnAList] = useState([]);

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

  // 새로운 조회함수
  const getList = async () => {
    console.time('소요시간');
    await axios.get(`${baseUrl}/total/findMemberInfo?qna=qna`)
      .then(async (res) => {

        const sortedQnAs = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setQnAList(sortedQnAs);
        setMaxPage(sortedQnAs.length);

        console.timeEnd('소요시간');
      })
  }

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    getList();
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTime = (dateString) => {
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


  const QnaItem = ({ props }) => (
    <div className={style.Main_container_list_detail}>
      {/* 글 제목 및 내용 */}
      <div className={style.Qna_text}>
        {props.category === '1' && <Develope />}
        {props.category === '2' && <Study />}
        {props.category === '3' && <Job />}
        {props.category === '4' && <Life />}
        {props.category === '5' && <Others />}
        <Link to={`/QnaDetail/${props._id}?id=${props.id}`}>
          <h5> {props.title}</h5>
        </Link>
        <div className={style.Qna_title_box_space_2}>
          <p>{getTime(props.createdAt)}</p>
          <p>👁‍🗨 {props.views} 💬 {props.comments} </p>
        </div>
      </div>

      {/* 프로필*/}
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>{props.writerInfo.class}</p>
          <h4>{props.writer}</h4>
        </span>
        <span className={style.profile_pic}>
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
  };

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 페이징 부분

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={style.Main_container_banner}>
          <img src="https://i.ibb.co/VD0ryhf/QnA.png" alt="이미지"></img>
        </div>
        <div className={styles.right_container_button}>
          <div></div>
          <h2>Q & A 💡</h2>
          <Link to={"/QnaWrite"} onClick={checkSessionStorage}>
            <p>작성하기</p>
          </Link>
        </div>

        <div className={styles.Main_container_list}>
          {qnaList.slice(startIndex, endIndex).map((item) => (<QnaItem key={item._id} props={item} />))}
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

export default QnaList;

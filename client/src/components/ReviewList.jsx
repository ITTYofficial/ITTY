import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/ReviewList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

const ReviewList = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
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

  // 태그 컴포넌트들
  const RecommendTag = ({ keyWord }) => {
    let tagClassName = style.play_title;
    const tagMap = {
      '1': '강력추천 💛',
      '2': '추천 👍',
      '3': '비추천 👎',
    };
    const tagStyleMap = {
      '1': style.veryrecommend,
      '2': style.recommend,
      '3': style.notrecommend,
    };
    // keyWord에 따라 클래스 선택
    if (tagStyleMap[keyWord]) {
      tagClassName = `${tagClassName} ${tagStyleMap[keyWord]}`;
    }

    return (
      <span className={tagClassName}>
        {tagMap[keyWord] || ''}
      </span>
    );
  };

  const PositionTag = ({ position }) => {
    let tagClassName = style.play_title;
    const tagMap = {
      '1': '전공자 🎓',
      '2': '비전공자 📚',
    };
    const tagStyleMap = {
      '1': style.major,
      '2': style.nomajor,
    };

    // position에 따라 클래스 선택
    if (tagStyleMap[position]) {
      tagClassName = `${tagClassName} ${tagStyleMap[position]}`;
    }

    return (
      <span className={tagClassName}>
        {tagMap[position] || ''}
      </span>
    );
  };

  // 리뷰 리스트 담을 State
  const [reviewList, setReviewList] = useState([]);


  // 새로운 조회함수
  const getList = async () => {
    console.time('소요시간');
    await axios.get(`${baseUrl}/total/findMemberInfo?review=review`)
      .then(async (res) => {

        const sortedReviews = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setReviewList(sortedReviews);
        setMaxPage(sortedReviews.length);

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

  const ReviewItem = ({ props }) => (
    <div className={style.Main_container_list_detail}>
      <div>
        <span>
          <div className={style.cateBox}>
            <span className={`${style.play_title} ${style.star}`}>⭐{props.score / 2}</span>
            <RecommendTag keyWord={props.keyWord} />
            <PositionTag position={props.position} />
          </div>
          <Link to={`/reviewDetail/${props._id}?id=${props.id}`}>
            <h3>{props.title}</h3>
          </Link>
        </span>

        <span className={style.Review_list_profile}>
          <div>
            <p>{props.writerInfo.class}</p>
            <h4>{props.writer}</h4>
          </div>
          <div>
            <img src={props.writerInfo.profileImg} />
          </div>
        </span>
      </div>
      <span>
        <p>
          {getTime(props.createdAt)} 👁‍🗨{props.views} 💬{props.comments}
        </p>
      </span>
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
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.right_container_button}>
          <h2>수료생 후기👨‍🎓</h2>
          <Link to={"/reviewWrite"} onClick={checkSessionStorage}>
            <p>작성하기</p>
          </Link>
        </div>
        <div className={style.Review_container_list}>
          {reviewList.slice(startIndex, endIndex).map((item) => (
            <ReviewItem key={item._id} props={item} />
          ))}
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

export default ReviewList;

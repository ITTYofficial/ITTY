import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/Community.module.css";
import style from "../css/StudyDetail.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Pagination from "react-js-pagination";

const StudyList = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  //모집 컴포넌트
  const RecruitTag = ({ now }) => {
    let tagClassName = style.play_title;
    const tagMap = {
      '1': '모집중',
      '-1': '모집완료',
    };
    const tagStyleMap = {
      '1': style.findsomeone,
      '-1': style.completed,
    };

    if (tagStyleMap[now]) {
      tagClassName = `${tagClassName} ${tagStyleMap[now]}`;
    }

    return (
      <span className={tagClassName}>
        {tagMap[now] || ''}
      </span>
    );
  };

  // 태그 컴포넌트들
  const RecommendTag = ({ selected }) => {
    let tagClassName = style.play_title;
    const tagMap = {
      '1': '코딩테스트 대비 📖',
      '2': '취업 준비 😋',
      '3': '개발 공부 🔎',
      '4': '자격증 공부 📝',
      '5': '그룹 / 모임 🙋🏻‍♀️'
    };
    const tagStyleMap = {
      '1': style.purpose,
      '2': style.getajob,
      '3': style.develope,
      '4': style.certificate,
      '5': style.groupstudy
    };

    if (tagStyleMap[selected]) {
      tagClassName = `${tagClassName} ${tagStyleMap[selected]}`;
    }

    return (
      <span className={tagClassName}>
        {tagMap[selected] || ''}
      </span>
    );
  };

  // 장터리스트 담을 State
  const [studyList, setstudyList] = useState([]);

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
    await axios.get(`${baseUrl}/total/findMemberInfo?study=study`)
      .then(async (res) => {

        const sortedStudys = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setstudyList(res.data.lists);
        setMaxPage(sortedStudys.length);

        console.timeEnd('소요시간');
      })
  }



  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    getList();
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
        <div className={styles.Main_container_banner}>
          <img src="https://i.ibb.co/RHtHzR8/study.png" alt="study" />
        </div>
        <div className={styles.right_container_button}>
          <h2>스터디 구해요🐣</h2>
          <Link to={"/studyWrite"} onClick={checkSessionStorage}>작성하기</Link>
        </div>

        <div className={styles.Main_container_list}>
          {/* 글 반복 시작 */}
          {studyList.slice(startIndex, endIndex).map((item) => (
            <div className={styles.Main_container_list_detail}>
              <div>
                <p className={styles.b_date}>
                  {getTimeAgoString(item.createdAt)}
                </p>
                <Link to={`/studyDetail/${item._id}?id=${item.id}`}>
                  <h4>
                    <RecruitTag now={item.recruit} />
                    {item.recruit === 1 && <RecommendTag selected={item.selectedValues} />}
                    {item.title}
                  </h4>
                </Link>
                {/* <p>글 내용 영역</p> */}
                <p>👁‍🗨{item.views} 💬{item.comments}</p>
              </div>

              <div className={styles.Main_grid_profile}>
                <span className={styles.profile_text}>
                  <p>{item.writerInfo.class}</p>
                  <h4>{item.writer}</h4>
                </span>
                <span className={styles.profile_img}>
                  <Image
                    src={item.writerInfo.profileImg}
                    roundedCircle
                  />
                </span>
              </div>
            </div>
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

export default StudyList;

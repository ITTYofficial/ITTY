import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/Community.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";

const StudyList = () => {
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

  // 장터 리스트 조회 함수
  const readstudyList = async () => {
    await axios
      .get("http://localhost:8088/study/studyList")
      .then(async(res) => {
        console.log("1. writer :", res.data.study[0].writer);
        let memberPromises = res.data.study.map((study) => {
          const nickname = study.writer;
          return axios.get(
            `http://localhost:8088/member/memberSearching?nickname=${nickname}`
          );
        });

        let memberResponses = await Promise.all(memberPromises);
        let member = memberResponses.map((response) => ({
          member: response.data.member,
        }));

        console.log("member 내용물 : ", member.member);
        let fusion = member.map((item, index) => {
          return { ...item, ...res.data.study[index] };
        });
        console.log("퓨전", fusion);
        
        const sortedStudy = fusion.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setstudyList(sortedStudy);
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readstudyList();
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTimeAgoString = (dateString) => {
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
          {studyList.map((item) => (
            <div className={styles.Main_container_list_detail}>
              <div>
                <p className={styles.b_date}>
                  {getTimeAgoString(item.createdAt)}
                </p>
                <Link to={`/studyDetail/${item._id}`}>
                  <h4>{item.title}</h4>
                </Link>
                {/* <p>글 내용 영역</p> */}
              </div>

              <div className={styles.Main_grid_profile}>
                <span className={styles.profile_text}>
                  <p>데이터 디자인</p>
                  <h4>{item.writer}</h4>
                </span>
                <span className={styles.profile_img}>
                  <Image
                    src="https://yt3.googleusercontent.com/ytc/AOPolaRxpUD_H-QjwLO46YEWjrvap8RBzgOmsYCHex5m=s900-c-k-c0x00ffffff-no-rj"
                    roundedCircle
                  />
                </span>
              </div>
            </div>
          ))}
          {/* 글 반복 끝 */}
        </div>
      </div>
    </div>
  );
};

export default StudyList;

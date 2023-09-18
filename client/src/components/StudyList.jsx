import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/Community.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from 'react-bootstrap/Image';

const StudyList = () => {

  // 장터리스트 담을 State
  const [studyList, setstudyList] = useState([]);

  // 장터 리스트 조회 함수
  const readstudyList = async () => {
    await axios
      .get("http://localhost:8088/study/studyList")
      .then((res) => {
        console.log(res);
        setstudyList(res.data.study);
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

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={styles.Main_container_banner}></div>
        <div className={styles.right_container_button}>
          <h2>스터디 구해요🐣</h2>
          <Link to={'/studyWrite'}>
            작성하기
          </Link>
        </div>

        <div className={styles.Main_container_list}>
          {/* 글 반복 시작 */}
          {studyList.map((item) => (
            <div className={styles.Main_container_list_detail}>
              <div>
                <p className={styles.b_date}>{item.createdAt}</p>
                <Link to={"#"}>
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
                    src="https://yt3.googleusercontent.com/ytc/AOPolaRxpUD_H-QjwLO46YEWjrvap8RBzgOmsYCHex5m=s900-c-k-c0x00ffffff-no-rj" roundedCircle />
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

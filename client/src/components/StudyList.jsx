import React from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/Community.module.css";
import { Link } from "react-router-dom";

const StudyList = () => {
  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={styles.Main_container_banner}></div>
        <div className={styles.right_container_button}>
          <h2>스터디 구해요🐣</h2>
          <a href="#">작성하기</a>
        </div>

        <div className={styles.Main_container_list}>
          {/* 글 반복 시작 */}
          <div className={styles.Main_container_list_detail}>
            <div>
              <p className={styles.b_date}>1일 전</p>
              <Link to={"#"}>
                <h4>제목 영역</h4>
              </Link>
              <p>글 내용 영역</p>
            </div>

            <div className={styles.Main_grid_profile}>
              <span className={styles.profile_text}>
                <p>데이터 디자인</p>
                <h4>작성자 이름</h4>
              </span>
              <span className={styles.profile_pic}>
                <img src="#" />
              </span>
            </div>
          </div>
          {/* 글 반복 끝 */}
        </div>
      </div>
    </div>
  );
};

export default StudyList;

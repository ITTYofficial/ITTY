import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import styles from "../css/Community.module.css";
import style from "../css/QnaList.module.css";

const QnaList = () => {
  // 게시글 리스트 담을 State
  const [QnaList, setQnaList] = useState([]);

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    readQnaList();
  }, []);

  //게시글 조회 함수
  const readQnaList = async () => {
    /*    await axios
            .get("http://localhost:8088/QnaList")
            .then((res) => {
                console.log(res);
                setQnaList(res.data.Qna);
            })
            .catch((err) => {
                alert("통신에 실패했습니다.");
                console.log(err);
            }); */
  };





  const Job = () => (
    <span className={`${style.play_title} ${style.job}`}>취업 😎</span>
  );

  const QnaItem = () => (
    <div className={style.Main_container_list_detail}>
      {/* 글 제목 및 내용 */}
      <div className={style.Qna_text}>
        <Job />
        <Link to={"/QnaDetail"}>
          <h5> 리액트 useEffect 관련 질문입니다 😂</h5>
        </Link>
        <div className={style.Qna_title_box_space_2}>
          <p>5분전</p>
          <p>👁‍🗨 28 💬 4 </p>
        </div>
      </div>

      {/* 프로필*/}
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>데이터 디자인</p>
          <h4>수현쌤짱</h4>
        </span>
        <span className={style.profile_pic}></span>
      </div>
    </div>
  );

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={style.Main_container_banner}>
          <img src="https://i.ibb.co/VD0ryhf/QnA.png"></img>
        </div>
        <div className={styles.right_container_button}>
          <div></div>
          <h2>QnA 💡</h2>
          <Link to={"/QnaWrite"}>
            <p>작성하기</p>
          </Link>
        </div>

        <div className={styles.Main_container_list}>
          <QnaItem />
          <QnaItem />
          <QnaItem />
          <QnaItem />
          <QnaItem />
          <QnaItem />
          <QnaItem />
        </div>
        <div className={style.Qna_page_box}>1 2 3 4 5 6 7 8 9 10.....20</div>
      </div>
    </div>
  );
};

export default QnaList;

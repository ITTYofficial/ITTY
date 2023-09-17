import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import styles from "../css/Community.module.css";
import style from "../css/TipList.module.css";

const TipList = () => {
  // 게시글 리스트 담을 State
  const [tipList, setTipList] = useState([]);

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    readTipList();
  }, []);

  //게시글 조회 함수
  const readTipList = async () => {
    /*    await axios
            .get("http://localhost:8088/tipList")
            .then((res) => {
                console.log(res);
                setTipList(res.data.tip);
            })
            .catch((err) => {
                alert("통신에 실패했습니다.");
                console.log(err);
            }); */
  };

  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>개발 🙋🏻‍♀️</span>
  );

  const TipItem = () => (
    <div className={style.Main_container_list_detail}>
      {/* 글 제목 및 내용 */}
      <div className={style.tip_text}>
        <Develope />
        <Link to={"/tipDetail"}>
          <h5>자바 별찍기 문제 꿀팁입니다</h5>
        </Link>
        <div className={style.tip_title_box_space_2}>
          <span>5분전 </span>
          <span>👁‍🗨 28 💬 4 </span>
        </div>
      </div>

      {/* 프로필*/}
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>데이터 디자인</p>
          <h4>글쓴이짱</h4>
        </span>
        <span className={style.profile_pic}>
        </span>
      </div>
    </div>
  );

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={style.Main_container_banner}>
          <img src="img/banner01.png" style={{width:"1024px"}}></img>
        </div>
        <div className={styles.right_container_button}>
          <div></div>
          <h2>Tip 🥇</h2>
          <Link to={"/tipWrite"}>
            <p>작성하기</p>
          </Link>
        </div>

        <div className={styles.Main_container_list}>
          <TipItem />
          <TipItem />
          <TipItem />
          <TipItem />
          <TipItem />
          <TipItem />
          <TipItem />
        </div>
        <div className={style.tip_page_box}>1 2 3 4 5 6 7 8 9 10.....20</div>
      </div>
    </div>
  );
};

export default TipList;

import React from "react";
import style from "../css/LeftContainer.module.css";

const LeftContainer = () => {
  return (
    <div className={style.left_container}>
      <div className={style.left_container_box1}>
        <h3>반이름</h3>
        <h4>포트폴리오</h4>
        <div>
          <img src="img/portfolio.gif" alt="portfolio"></img>
        </div>
      </div>
      <div className={style.left_container_box2}>
        <h3>이달의 투표 👍</h3>
        <h4>스인재 주변 최고맛집은?</h4>
      </div>
      <div className={style.left_container_box3}>
        <h3>Best Ranking 👑</h3>
      </div>
    </div>
  );
};

export default LeftContainer;

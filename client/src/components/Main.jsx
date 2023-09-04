import React from "react";
// import "../css/Main.css";
import style from "../css/Main.module.css";

// import "../css/Community.css";

const Main = () => {
  return (
    <div className={style.Wrap_container}>
      {/* 메인 이미지슬라이드 시작 */}
      <div className={style.Wrap_main_imageSlide}>BANNER</div>
      {/* 메인 이미지슬라이드 끝 */}

      <div className={style.Main_container}>
        <div className={style.left_container}>
          <div className={style.left_container_box1}>
            <h3>반이름</h3>
            <h3>포트폴리오</h3>
            <div>
              <span>포트폴리오 이미지삽입</span>
            </div>
          </div>
          <div className={style.left_container_box2}>
            <h3>이달의 투표</h3>
            <h3>스인재 주변 최고맛집은</h3>
          </div>
          <div className={style.left_container_box3}>
            <h3>Best Ranking</h3>
          </div>
        </div>

        <div className={style.right_container}>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Main;

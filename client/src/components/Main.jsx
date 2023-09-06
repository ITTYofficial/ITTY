import React from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/Main.module.css";

// import "../css/Community.css";

const Main = () => {
  const Main_detail = () => (
    <div className={style.Main_grid_detail}>
      <h4>핵심끝나고 너무 힘들어요.. 다들 어떠세요</h4>
      <div>
        <p>1일전 </p>
        <p>👁28 </p>
        <p>💬4</p>
        <div className={style.Main_grid_profile}>
          <span className={style.profile_text}>
            <p>데이터디자인반</p>
            <h4>자바노잼</h4>
          </span>
          <span className={style.profile_pic}>{/* <img src="#" />/ */}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={style.Wrap_container}>
      {/* 메인 이미지슬라이드 시작 */}
      <div className={style.Wrap_main_imageSlide}></div>
      {/* 메인 이미지슬라이드 끝 */}

      <div className={style.Main_container}>
        <LeftContainer />

        <div className={style.right_container}>
          <div className={style.Main_grid_1}>
            <h3>자유게시판⚽</h3>

            {/* 자유게시판 목록 리스트 반복시작 */}
            <Main_detail />
            <Main_detail />
            <Main_detail />
            <Main_detail />
            <Main_detail />
            {/* 자유게시판 목록 리스트 반복 끝 */}
          </div>

          {/* ======오른쪽 메인컨텐츠 왼쪽 오른쪽 구분선====== */}

          <div className={style.Main_grid_2}>
            <h3>프로젝트/스터디 구해요🙋‍♂️</h3>

            {/* 프로젝트 / 스터디 목록 리스트 반복시작 */}
            <Main_detail />
            {/* 프로젝트 / 스터디 목록 리스트 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

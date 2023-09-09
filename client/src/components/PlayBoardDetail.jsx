import React from "react";
import LeftContainer from "./LeftContainer";
import PlayBoard from "../css/PlayBoardDetail.module.css";

const PlayBoardDetail = () => {
  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.right_container_banner}></div>
        <div className={PlayBoard.division_line}>
          <div>
            <a href="#">Community 🌐</a> / <a href="#">스터디 구해요🐣</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayBoardDetail;

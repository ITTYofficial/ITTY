import React from "react";
import PlayBoard from "../css/PlayBoardList.module.css";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";

const PlayBoardList = () => {
  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.Main_container_banner}></div>
        <div className={PlayBoard.right_container_button}>
          <h2>자유게시판⚽</h2>
          <a href="#">작성하기</a>
        </div>

        <div className={PlayBoard.Main_container_list}>
          {/* 글 반복 시작 */}
          <div className={PlayBoard.Main_container_list_detail}>
            <div>
              <p className={PlayBoard.b_date}>1일 전</p>
              <Link to={`/projectDetail`}>
                <h4>제목 영역</h4>
              </Link>
              <p>글 내용 영역</p>
            </div>

            <div>
              <div>
                <p className={PlayBoard.b_date}>데이터 디자인</p>
                <h4>{PlayBoard.writer}작성자 이름</h4>
              </div>
              <img src="#" />
            </div>
          </div>
          {/* 글 반복 끝 */}
        </div>
      </div>
    </div>
  );
};

export default PlayBoardList;

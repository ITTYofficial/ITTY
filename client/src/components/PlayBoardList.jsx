import React, { useEffect, useState } from "react";
import PlayBoard from "../css/PlayBoardList.module.css";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import axios from "axios";

const PlayBoardList = () => {

  // 장터리스트 담을 State
  const [playList, setPlayList] = useState([]);

  // 장터 리스트 조회 함수
  const readPlayList = async () => {
    await axios
      .get("http://localhost:8088/play/playList")
      .then((res) => {
        console.log(res);
        setPlayList(res.data.play);
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };


  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readPlayList();
  }, []);

  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.Main_container_banner}></div>
        <div className={PlayBoard.right_container_button}>
          <h2>자유게시판⚽</h2>
          <a href="/playBoardWrite">작성하기</a>
        </div>

        <div className={PlayBoard.Main_container_list}>
          {/* 글 반복 시작 */}
          {playList.map((item) => (
            <div className={PlayBoard.Main_container_list_detail}>
              <div>
                <p className={PlayBoard.b_date}>{item.createdAt}</p>
                <Link to={`/playboardDetail/${item._id}`}>
                  <h4>{item.title}</h4>
                </Link>
                <p>조회수 : {item.views}</p>
              </div>

              <div className={PlayBoard.Main_grid_profile}>
                <span className={PlayBoard.profile_text}>
                  <p>데이터 디자인</p>
                  <h4>{item.writer}</h4>
                </span>
                <span className={PlayBoard.profile_pic}>
                  <img src="#" />
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

export default PlayBoardList;

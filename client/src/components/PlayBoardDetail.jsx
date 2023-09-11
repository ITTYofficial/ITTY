import React from "react";
import LeftContainer from "./LeftContainer";
import PlayBoard from "../css/PlayBoardDetail.module.css";

const PlayBoardDetail = () => {
  const Frontend = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.frontend}`}>
      프론트엔드✨
    </span>
  );
  const Backend = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.backend}`}>
      백엔드👻
    </span>
  );
  const Db = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.db}`}>
      DataBase🎓
    </span>
  );
  const Uxui = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.uxui}`}>UX/UI🎨</span>
  );
  const Fullstack = () => (
    <span className={`${PlayBoard.play_title} ${PlayBoard.fullstack}`}>
      풀스택💼
    </span>
  );

  return (
    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.division_line}>
          <div>
            <a href="#">Community🌐</a> /{" "}
            <a href="/playboardList">자유게시판⚽</a>
          </div>
        </div>

        <div className={PlayBoard.play_wrap_content}>
          {/* 자유게시판 상세페이지 상단 제목부분 START!!!!! */}
          <div className={PlayBoard.play_wrap_top}>
            <div className={PlayBoard.play_top_title}>
              <Frontend />
              <Backend />
              <Db />
              <Uxui />
              <Fullstack />
            </div>

            <div className={PlayBoard.play_profile}>
              <span>
                <h4>
                  공공기관 프로젝트 함께할 사람 모집!!! 나랑같이 대기업가자~!!
                </h4>
                <p>📆 기간 2023-09-11 ~ 2023-10-21</p>
                <p>🙍‍♂️ 인원 5명</p>
                <p>📝 활용언어 Java, JavaScript, HTML, CSS, React</p>
              </span>

              <div>
                <span className={PlayBoard.play_detail_profile}>
                  <span className={PlayBoard.profile_text}>
                    <p>데이터 디자인</p>
                    <h4>전설이 될 개발자</h4>
                  </span>
                  <span className={PlayBoard.profile_pic}>
                    <img src="#" />
                  </span>
                </span>
                <span>
                  <p>👁‍🗨 28 💬 4</p>
                </span>
              </div>
            </div>
          </div>
          {/* 자유게시판 상세페이지 상단 제목부분 END!!!!! */}

          <div className={PlayBoard.play_content}>
            <span>
              공공기관 프로젝트 함께할 사람 모집!!! 나랑같이 대기업가자~!! 사람
              구합니다 프론트엔드 4명 백엔드 2명 데 이터베이스 1명 랑 같이
              멋진작품 한번 만들어보죠
            </span>
          </div>

          <div className={PlayBoard.division_line_commant}>
            <div>
              <h4>댓글 2</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayBoardDetail;

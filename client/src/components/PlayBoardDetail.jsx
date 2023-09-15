import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import PlayBoard from "../css/PlayBoardDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from "react-router-dom";
import axios from "axios";

const PlayBoardDetail = () => {

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  // 게시글정보 저장할 State
  const [playDetail, setplayDetail] = useState([]);

  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것
  const getPlay = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios.get(`http://localhost:8088/play/playboardDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        setplayDetail(res.data.detailPlay[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getPlay();
  }, []);

  // 수정 페이지 이동
  const moveUpdate = () => {
    window.location.href = `/playBoardWrite?id=${id}`
  }

  // 게시글 삭제
  const deletePlay = async () => {
    await axios.post(`http://localhost:8088/play/delete/${id}`)
    .then((res)=>{
      alert("삭제 완료")
      window.location.href = '/playBoardList'
    })
    .catch((err)=>{
      alert("삭제 실패")
      console.log(err);
    })
  }

  // 내부 컴포넌트
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

  const CommantItem = () => (
    <div className={PlayBoard.commant_list}>
      <div className={PlayBoard.play_commant_profile}>
        <span>
          <Image
            src="https://i.pinimg.com/736x/24/d2/97/24d2974e5cd0468587422e38c8aab210.jpg"
            roundedCircle
          />
        </span>
        <span>
          <p>빅데이터분석</p>
          <h4>수업시간에롤</h4>
        </span>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
      <div>
        <p>
          데이터디자인반 프론트엔드 희망하는 26살입니다.
          <br />
          같이하면 재밋게 열심히 잘 할수 있을것같아요. 연락처는 쪽지로
          보내드렸습니다.
          <br />
          확인하시고 연락부탁드려요~!
        </p>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

      <div>
        <p>3시간 전</p>
      </div>
    </div>
  );

  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={PlayBoard.meat_dropdown}>
      <li onClick={moveUpdate}>수정</li>
      <li onClick={deletePlay}>삭제</li>
    </div>
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
                    <h4>수업중몰래롤</h4>
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

          {/* 게시글 content 시작 */}
          <div className={PlayBoard.meatball}>
            <ul>
              <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
              {meat && <Dropdown />}
            </ul>
          </div>

          <div className={PlayBoard.play_content}>
            <span>
              안녕하세요 데이터디자인반 김초롱입니다.
              <br />
              <br />
              이번 공공기관 프로젝트 함께할 사람을 찾고 있는데
              <br />
              <br />
              혹시 생각 있으시면
              <br />
              <br />
              댓글 달아주시면 감사하겠습니다.
              <br />
              <br />
              현재 프론트 1명만 구한 상황이구요
              <br />
              <br />
              백/프론트/DB 쪽 담당해줄 사람을 찾고있습니다.
              <br />
              <br />
              같이 배우면서 하는거니까 부담갖지말고 편하게 연락주세요.
              <br />
              <br />
            </span>
          </div>
          {/* 게시글 content 끝 */}

          {/* 댓글달기 시작 */}
          <div className={PlayBoard.division_line_commant}>
            <div>
              <h4>댓글 3</h4>
            </div>
          </div>

          <div className={PlayBoard.commant_write}>
            <div>
              <div>
                <img src="#" />
              </div>
              <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
            </div>
            <button type="button">댓글쓰기</button>
          </div>
          {/* 댓글달기 끝 */}

          <CommantItem />
          <CommantItem />
          <CommantItem />
        </div>
      </div>
    </div >
  );
};

export default PlayBoardDetail;

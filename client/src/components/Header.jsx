import React, { useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [hoverCate, setHoverCate] = useState(false);
  const [hoverShare, setHoverShare] = useState(false);
  const [hoverJob, setHoverJob] = useState(false);

  const cateHoverIn = () => {
    setHoverCate(true);
    console.log("Mouse In");
  };
  const cateHoverOut = () => {
    setHoverCate(false);
    console.log("Mouse Out");
  };
  const shareHoverIn = () => {
    setHoverShare(true);
    console.log("Mouse In");
  };
  const shareHoverOut = () => {
    setHoverShare(false);
    console.log("Mouse Out");
  };
  const jobHoverIn = () => {
    setHoverJob(true);
    console.log("Mouse In");
  };
  const jobHoverOut = () => {
    setHoverJob(false);
    console.log("Mouse Out");
  };

  return (
    <div className={Nav.Navigation}>
      <div className={Nav.logo_image}>
        <Link to={"/"}>
          <img src="img/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={Nav.Category}>
        <ul>
          <li className={Nav.nav_hover} onMouseEnter={cateHoverIn}>
            <a href="#">Community 🌐</a>
            {/* 카테고리(소) */}
            <ul
              className={
                hoverCate
                  ? `${Nav.sub_Community} ${Nav.active}`
                  : Nav.sub_Community
              }
              onMouseLeave={cateHoverOut}
            >
              <li>
                <a href="#">스터디 구해요🐣</a>
              </li>
              <li>
                <a href="/projectList">프로젝트 같이해요🛵</a>
              </li>
              <li>
                <a href="/MarketList">교환 장터🥕</a>
              </li>
              <li>
                <a href="#">자유게시판⚽</a>
              </li>
            </ul>
          </li>

          {/* 카테고리(소) */}

          <li className={Nav.nav_hover} onMouseEnter={shareHoverIn}>
            <a href="#">지식공유 💭</a>
            {/* 카테고리(소) */}

            <ul
              className={
                hoverShare ? `${Nav.sub_share} ${Nav.active}` : Nav.sub_share
              }
              onMouseLeave={shareHoverOut}
            >
              <li>
                <a href="#">Development Tip🧷</a>
              </li>
              <li>
                <a href="#">Knowledge Drop⛅</a>
              </li>
            </ul>
            {/* 카테고리(소) */}
          </li>

          {/* 카테고리(소) */}
          <li className={Nav.nav_hover} onMouseEnter={jobHoverIn}>
            <a href="#">Job 👩‍💻</a>
          </li>
          <ul
            className={hoverJob ? `${Nav.sub_job} ${Nav.active}` : Nav.sub_job}
            onMouseLeave={jobHoverOut}
          >
            <li>
              <a href="#">포트폴리오🔍</a>
            </li>
            <li>
              <a href="#">수료생 후기👨‍🎓</a>
            </li>
          </ul>
        </ul>
        <button className={Nav.Category_mobile}>&#128100;</button>
      </div>
      <div className={Nav.Member}>
        <ul>
          <li>
            <Link to={"/login"}>로그인</Link>
          </li>
          <li>
            <Link to={"/join"}>회원가입</Link>
          </li>
        </ul>
        <button className={Nav.Member_mobile}>&#128100;</button>
      </div>
    </div>
  );
};

export default Header;

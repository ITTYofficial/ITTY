import React, { useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className={Nav.Navigation}>
      <div className={Nav.logo_image}>
        <Link to={"/"}>
          <img src="img/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={Nav.Category}>
        <ul>


          <li
            className={Nav.nav_hover}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <a href="projectList">Community 🌐</a>
          </li>

          {/* 카테고리(소) */}
          <ul
            className={hover ? Nav.sub_Community : Nav.sub_Community_hide}
          >
            <li>
              <a href="#">스터디 구해요🐣</a>
            </li>
            <li>
              <a href="#">프로젝트 같이해요🛵</a>
            </li>
            <li>
              <a href="#">교환 장터🥕</a>
            </li>
            <li>
              <a href="#">자유게시판⚽</a>
            </li>
          </ul>

          {/* 카테고리(소) */}
          <li className={Nav.nav_hover}>
            <a href="#">지식공유 💭</a>
          </li>
          <ul className={Nav.sub_share}>
            <li>
              <a href="#">Development Tip🧷</a>
            </li>
            <li>
              <a href="#">Knowledge Drop⛅</a>
            </li>
          </ul>

          {/* 카테고리(소) */}
          <li className={Nav.nav_hover}>
            <a href="#">Job 👩‍💻</a>
          </li>
          <ul className={Nav.sub_job}>
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

import React from "react";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="Navigation">
      <div className="logo_image">
        <img src="img/logo.png" alt="Logo" />
      </div>
      <div className="Category">
        <ul>
          <li>
            <a href="projectList">Community🕹</a>
          </li>
          <li>
            <a href="#">QnA👋</a>
          </li>
          <li>
            <a href="#">Share</a>
          </li>
          <li>
            <a href="#">Private</a>
          </li>
        </ul>
        <button className="Category_mobile">&#128100;</button>
      </div>
      <div className="Member">
        <ul>
          <li>
            <a href="#">로그인</a>
          </li>
          <li>
            <a href="#">회원가입</a>
          </li>
        </ul>
        <button className="Member_mobile">&#128100;</button>
      </div>
    </div>
  );
};

export default Header;

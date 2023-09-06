import React from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={Nav.Navigation}>
      <div className={Nav.logo_image}>
        <Link to={"/"}>
          <img src="img/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={Nav.Category}>
        <ul>
          <li>
            <Link to={'/projectList'}>Community &#127758;</Link>
          </li>
          <li>
            <a href="#">지식공유 &#128173;</a>
          </li>
          <li>
            <a href="#">Job 👩‍💻</a>
          </li>
        </ul>
        <button className={Nav.Category_mobile}>&#128100;</button>
      </div>
      <div className={Nav.Member}>
        <ul>
          <li>
          <Link to={'/login'}>로그인</Link>
          </li>
          <li>
          <Link to={'/join'}>회원가입</Link>
          </li>
        </ul>
        <button className={Nav.Member_mobile}>&#128100;</button>
      </div>
    </div>
  );
};

export default Header;

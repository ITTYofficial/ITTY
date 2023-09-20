import React, { useEffect, useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  /* 세션스토리지에서 id값을 불러옴 */

  const [loginOk, setLoginOk] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    cate: false,
    share: false,
    job: false,
  });

  useEffect(() => {
    const id = sessionStorage.getItem("memberId");
    if (id) {
      setLoginOk(true);
    }
  }, []);

  const goLogout = () => {
    sessionStorage.removeItem("memberId");
    console.log(sessionStorage.getItem("memberId"));
    setLoginOk(false);
  };

  let cateHoverTimer;

  const handleHoverIn = (target) => {
    clearTimeout(cateHoverTimer);
    setHoverStates({
      cate: target === "cate",
      share: target === "share",
      job: target === "job",
    });
  };

  const handleHoverOut = (target) => {
    cateHoverTimer = setTimeout(() => {
      setHoverStates((prev) => ({ ...prev, [target]: false }));
    }, 300);
  };

  const handleHoverOut_im = (target) => {
    setHoverStates((prev) => ({ ...prev, [target]: false }));
  };

  return (
    <div className={Nav.Navigation}>
      <div className={Nav.logo_image}>
        <Link to={"/"}>
          <img src="https://i.ibb.co/YbFJpm1/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={Nav.Category}>
        <ul>
          <li
            className={`${Nav.nav_hover} ${hoverStates.cate ? Nav.active : ""}`}
            onMouseEnter={() => handleHoverIn("cate")}
            onMouseLeave={() => handleHoverOut("cate")}
          >
            <a href="#">Community 🌐</a>
            <ul
              className={`${Nav.sub_Community} ${
                hoverStates.cate ? Nav.active : ""
              }`}
              onMouseLeave={() => handleHoverOut_im("cate")}
            >
              <li>
                <Link to={"/studyList"}>스터디 구해요🐣</Link>
              </li>
              <li>
                <Link to={"/projectList"}>프로젝트 같이해요🛵</Link>
              </li>
              <li>
                <Link to={"/MarketList"}>교환 장터🥕</Link>
              </li>
              <li>
                <Link to={"/playboardList"}>자유게시판⚽</Link>
              </li>
            </ul>
          </li>

          <li
            className={`${Nav.nav_hover} ${
              hoverStates.share ? Nav.active : ""
            }`}
            onMouseEnter={() => handleHoverIn("share")}
            onMouseLeave={() => handleHoverOut("share")}
          >
            <a href="#">지식공유 💭</a>
            <ul
              className={`${Nav.sub_share} ${
                hoverStates.share ? Nav.active : ""
              }`}
              onMouseLeave={() => handleHoverOut("share")}
            >
              <li>
                <Link to={"/tipList"}>Development Tip🧷</Link>
              </li>
              <li>
                <Link to={"/qnaList"}>Knowledge QnA💡</Link>
              </li>
            </ul>
          </li>

          <li
            className={`${Nav.nav_hover} ${hoverStates.job ? Nav.active : ""}`}
            onMouseEnter={() => handleHoverIn("job")}
            onMouseLeave={() => handleHoverOut("job")}
          >
            <a href="#">Job 👩‍💻</a>
            <ul
              className={`${Nav.sub_job} ${hoverStates.job ? Nav.active : ""}`}
              onMouseLeave={() => handleHoverOut("job")}
            >
              <li>
                <Link to={"/portList"}>포트폴리오🔍</Link>
              </li>
              <li>
                <Link to={"/reviewList"}>수료생 후기👨‍🎓</Link>
              </li>
            </ul>
          </li>
        </ul>
        <button className={Nav.Category_mobile}>&#128100;</button>
      </div>
      <div className={Nav.Member}>
        <ul>
          <li>
            {loginOk ? (
              <button onClick={goLogout}>로그아웃</button>
            ) : (
              <Link to={"/login"}>로그인</Link>
            )}
          </li>
          <li>
            {loginOk ? (
              <Link to={"/mypage"}>마이페이지</Link>
            ) : (
              <Link to={"/join"}>회원가입</Link>
            )}
          </li>
        </ul>
        <button className={Nav.Member_mobile}>&#128100;</button>
      </div>
      <div className={Nav.hamburger_content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;

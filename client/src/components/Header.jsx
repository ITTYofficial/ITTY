import React, { useEffect, useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  /* 세션스토리지에서 id값을 불러옴 */
 
  const [loginOk,setLoginOk] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    cate: false,
    share: false,
    job: false,
  });

useEffect(()=>{

  const id =sessionStorage.getItem("memberId");
  if(id){
    setLoginOk(true);
  }
},[])

const goLogout = () =>{
  sessionStorage.removeItem("memberId");
  console.log(sessionStorage.getItem("memberId"));
  setLoginOk(false)
}

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
          <img src="img/logo.png" alt="Logo" />
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
                <a href="/studyList">스터디 구해요🐣</a>
              </li>
              <li>
                <a href="/projectList">프로젝트 같이해요🛵</a>
              </li>
              <li>
                <a href="/MarketList">교환 장터🥕</a>
              </li>
              <li>
                <a href="/playboardList">자유게시판⚽</a>
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
                <a href="/tipList">Development Tip🧷</a>
              </li>
              <li>
                <a href="#">Knowledge Drop⛅</a>
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
                <Link to={'/portDetail'}>
                포트폴리오🔍
                </Link>
              </li>
              <li>
                <a href="#">수료생 후기👨‍🎓</a>
              </li>
            </ul>
          </li>
        </ul>
        <button className={Nav.Category_mobile}>&#128100;</button>
      </div>
      <div className={Nav.Member}>
        <ul>
          <li>
            {loginOk?(
              <button onClick={goLogout}>로그아웃</button>
              ) :(
              <Link to={"/login"}>로그인</Link>
            ) }
          </li>
          <li>
            {loginOk?(
              <Link to={"/mypage"}>마이페이지</Link>
              ):(
                <Link to={"/join"}>회원가입</Link>
              )
            }
          </li>
        </ul>
        <button className={Nav.Member_mobile}>&#128100;</button>
      </div>
    </div>
  );
};

export default Header;

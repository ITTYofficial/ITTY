import React, { useEffect, useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  /* 세션스토리지에서 id값을 불러옴 */

  const [loginOk, setLoginOk] = useState(false);
  // const [hoverStates, setHoverStates] = useState({
  //   cate: false,
  //   share: false,
  //   job: false,
  // });

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

  // const handleHoverIn = (target) => {
  //   clearTimeout(cateHoverTimer);
  //   setHoverStates({
  //     cate: target === "cate",
  //     share: target === "share",
  //     job: target === "job",
  //   });
  // };

  // const handleHoverOut = (target) => {
  //   cateHoverTimer = setTimeout(() => {
  //     setHoverStates((prev) => ({ ...prev, [target]: false }));
  //   }, 300);
  // };

  // const handleHoverOut_im = (target) => {
  //   setHoverStates((prev) => ({ ...prev, [target]: false }));
  // };

  // sideBar를 위해 필요
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  // 네비게이션 hover시
  const [mouseEnter, setMouseEnter] = useState(false);

  const navDropdownEnter = () => {
    setMouseEnter(true);
  };
  const navDropdownLeave = () => {
    setMouseEnter(false);
  };

  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div
      className={`${Nav.Navigation} ${mouseEnter ? Nav.NavDropdown : ""}`}
      onMouseEnter={navDropdownEnter}
      onMouseLeave={navDropdownLeave}
    >
      <div className={Nav.logo_image}>
        <Link to={"/"}>
          <img src="https://i.ibb.co/YbFJpm1/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* className={`${Nav.aside} ${sidebar ? Nav.button_transform : ""}`} */}
      <div className={Nav.Category}>
        <ul>
          <li className={Nav.nav_hover}>
            <a href="#"><span>Community</span> <span className={Nav.emoji_container}>🌐</span></a>
            <ul className={Nav.sub_Community}>
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

          <li className={Nav.nav_hover}>
            <a href="#"><span>지식공유</span> <span className={Nav.emoji_container}>💭</span></a>
            <ul className={Nav.sub_share}>
              <li>
                <Link to={"/tipList"}>팁 공유 📢</Link>
              </li>
              <li>
                <Link to={"/qnaList"}>Q & A 💡</Link>
              </li>
            </ul>
          </li>

          <li className={Nav.nav_hover}>
            <a href="#"><span>Job</span> <span className={Nav.emoji_container}>👩‍💻</span></a>
            <ul className={Nav.sub_job}>
              <li>
                <Link to={"/portList"}>포트폴리오🔍</Link>
              </li>
              <li>
                <Link to={"/reviewList"}>수료생 후기👨‍🎓</Link>
              </li>
            </ul>
          </li>

          <li className={Nav.nav_hover}>
            <a href="#"><span>Private</span> <span className={Nav.emoji_container}>🔒</span></a>
            <ul className={Nav.sub_job}>
              <li>
                <Link to={"/anonymityList"}>익명게시판🤐</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={Nav.Member}>
        <ul>
          <li>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("엔터누름");
                  // 엔터 키를 눌렀을 때 searchingList 페이지로 이동
                  {
                    /* <Link to={`/searchResult/${searchTerm}`} />; */
                  }
                  window.location.href = `/searchResult/${searchTerm}`;
                }
              }}
            />
          </li>

          <li>
            {loginOk ? (
              <button onClick={goLogout}>로그아웃</button>
            ) : (
              <Link to={"/login"} style={{ backgroundColor: "gray" }}>
                로그인
              </Link>
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

        <button className={Nav.Member_mobile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </button>
        <button className={Nav.hamburger_content} onClick={showSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <div
            className={`${Nav.aside} ${sidebar ? Nav.button_transform : ""}`}
          >
            <div className={Nav.aside_button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>
            <ul>
              <li>
                <a href="#">Community 🌐</a>
                <ul>
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

              <li>
                <a href="#">지식공유 💭</a>
                <ul>
                  <li>
                    <Link to={"/tipList"}>팁 공유 📢</Link>
                  </li>
                  <li>
                    <Link to={"/qnaList"}>Q & A 💡</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Job 👩‍💻</a>
                <ul>
                  <li>
                    <Link to={"/portList"}>포트폴리오🔍</Link>
                  </li>
                  <li>
                    <Link to={"/reviewList"}>수료생 후기👨‍🎓</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </button>
      </div>
      {/* <div className={Nav.hamburger_content}>
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
      </div> */}
    </div>
  );
};

export default Header;

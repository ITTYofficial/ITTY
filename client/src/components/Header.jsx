import React, { useEffect, useState } from "react";
import Nav from "../css/Header.module.css";
import { Link } from "react-router-dom";
import axios from 'axios'

const Header = () => {
  /* 세션스토리지에서 id값을 불러옴 */

  const [loginOk, setLoginOk] = useState(false);
  // const [hoverStates, setHoverStates] = useState({
  //   cate: false,
  //   share: false,
  //   job: false,
  // });

  // 프로필 이미지 클릭시 세부정보 On/Off
  const [profile, setProfile] = useState(false);

  const profileOn = () => {
    // console.log("profile Clicke");
    setProfile(!profile);
  };

  const Member_profile = () => (
    <div className={Nav.Member_profile} onClick={profileOn}>
      <div>
        <img
          src="https://i.pinimg.com/564x/97/d2/ba/97d2ba25c8f81f47f0f4ca49cd3e7995.jpg"
          alt="profile"
        />
      </div>
      <ul
        className={`${Nav.Member_profile_dropdown} ${profile ? Nav.profile_active : ""
          }`}
      >
        <li>프로필</li>
        <li>받은쪽지함</li>
        <li className={Nav.profile_logout} onClick={goLogout}>
          로그아웃
        </li>
      </ul>
    </div>
  );
  // 프로필 이미지 클릭시 세부정보 On/Off 끝!

  useEffect(() => {
    const id = sessionStorage.getItem("memberId");
    if (id) {
      setLoginOk(true);
    }
    showMessageListDetail();
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

  const [countMessage, setCountMessage] = useState(0);

  // 안읽은 쪽지 카운팅
  const showMessageListDetail = async (e) => {
    const getUserId = sessionStorage.getItem('memberId');
    const sendUserId = e;
    await axios
      .get(`http://localhost:8088/message/countMessage?getUserId=${sessionStorage.getItem("memberId")}`)
      .then((res) => {
        console.log('res확인', res.data);
        setCountMessage(res.data.messageCount)
      })
  }

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
            <a href="#">
              <span>Community</span>{" "}
              <span className={Nav.emoji_container}>🌐</span>
            </a>
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
            <a href="#">
              <span>지식공유</span>{" "}
              <span className={Nav.emoji_container}>💭</span>
            </a>
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
            <a href="#">
              <span>Job</span> <span className={Nav.emoji_container}>👩‍💻</span>
            </a>
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
            <a href="#">
              <span>Private</span>{" "}
              <span className={Nav.emoji_container}>🔒</span>
            </a>
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
              // <button>로그아웃</button>
              <div className={Nav.massenger_wrapper}>
                <div className={Nav.messenger}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-messenger" viewBox="0 0 16 16" >
                    <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
                  </svg>
                </div>
                {countMessage > 0 &&
                  <div className={Nav.count_message_box}>
                    {countMessage}
                  </div>
                }
              </div>
            ) : (
              <Link to={"/login"} style={{ backgroundColor: "gray" }}>
                로그인
              </Link>
            )}
          </li>
          <li>
            {loginOk ? <Member_profile /> : <Link to={"/join"}>회원가입</Link>}
          </li>
        </ul>

        <button className={Nav.Member_mobile}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
        </button>
        <button className={Nav.hamburger_content} onClick={showSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-list" viewBox="0 0 16 16" >
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          <div className={`${Nav.aside} ${sidebar ? Nav.button_transform : ""}`} >
            <div className={Nav.aside_button}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
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

import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import PlayBoardList from "./components/PlayBoardList";
import PlayBoardDetail from "./components/PlayBoardDetail";
import "./css/reset.css";
import MarketList from "./components/MarketList";
import MarketDetail from "./components/MarketDetail";
import StudyList from "./components/StudyList";
import Join from "./components/Join";
import Login from "./components/Login";
import QuillTest from "./components/QuillTest";
import PlayBoardWrite from "./components/PlayBoardWrite";
import { PlayBoardContext } from "./context/PlayBoardContext";
import { useState } from "react";

function App() {
  // 회원가입과 로그인부분 헤더/푸터 렌더링 유무 함수

  const location = useLocation();

  const RenderHeaderAndFooter = () => {
    return location.pathname !== "/join" && location.pathname !== "/login";
  };

  // playBoardContext로 게시판 작성 데이터를 전역적 사용하기 위한, 작성된 글 데이터를 담을 state
  // 나중에 게시판 별로 새로 만들든, 통합하든해서 사용 할 필요가 있음
  const [value, setValue] = useState('');

  return (
    <div className="Container">
      <PlayBoardContext.Provider value={{value, setValue}}>
        {RenderHeaderAndFooter() && <Header />}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/playboardList" element={<PlayBoardList />}></Route>
          <Route path="/playboardDetail/:id" element={<PlayBoardDetail />}></Route>
          <Route path="/studyList" element={<StudyList />}></Route>
          <Route path="/projectList" element={<ProjectList />}></Route>
          <Route path="/projectDetail/:id" element={<ProjectDetail />}></Route>
          <Route path="/marketList" element={<MarketList />}></Route>
          <Route path="/marketDetail" element={<MarketDetail />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/quillTest" element={<QuillTest />}></Route>
          <Route path="/playBoardWrite" element={<PlayBoardWrite />}></Route>

        </Routes>
        {RenderHeaderAndFooter() && <Footer />}
      </PlayBoardContext.Provider>
    </div>
  );
}

export default App;

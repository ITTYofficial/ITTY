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
import TestPage from "./components/TestPage";
import ProjectWrite from "./components/ProjectWrite";
import MarketWrite from "./components/MarketWrite";
import StudyWrite from "./components/StudyWrite";

import ReviewList from "./components/ReviewList";
import TipList from "./components/TipList";
import TipDetail from "./components/TipDetail";
import TipWrite from "./components/TipWrite";
import StudyDetail from "./components/StudyDetail";
import PortDetail from "./components/PortDetail";
import PortList from "./components/PortList";
import ReviewDetail from "./components/ReviewDetail";
import ReviewWrite from "./components/ReviewWrite";

import QnaDetail from "./components/QnaDetail";
import QnaList from "./components/QnaList";
import QnaWrite from "./components/QnaWrite";
import PortWrite from "./components/PortWrite";

function App() {
  // 회원가입과 로그인부분 헤더/푸터 렌더링 유무 함수

  const location = useLocation();

  const RenderHeaderAndFooter = () => {
    return location.pathname !== "/join" && location.pathname !== "/login";
  };

  // playBoardContext로 게시판 작성 데이터를 전역적 사용하기 위한, 작성된 글 데이터를 담을 state
  // 나중에 게시판 별로 새로 만들든, 통합하든해서 사용 할 필요가 있음
  const [value, setValue] = useState("");

  return (
    <div className="Container">
      <PlayBoardContext.Provider value={{ value, setValue }}>
        {RenderHeaderAndFooter() && <Header />}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/playboardList" element={<PlayBoardList />}></Route>
          <Route path="/playBoardWrite" element={<PlayBoardWrite />}></Route>
          <Route
            path="/playboardDetail/:id"
            element={<PlayBoardDetail />}
          ></Route>
          <Route path="/studyList" element={<StudyList />}></Route>
          <Route path="/studyWrite" element={<StudyWrite />}></Route>
          <Route path="/studyDetail/:id" element={<StudyDetail />}></Route>
          <Route path="/projectList" element={<ProjectList />}></Route>
          <Route path="/projectWrite" element={<ProjectWrite />}></Route>
          <Route path="/projectDetail/:id" element={<ProjectDetail />}></Route>
          <Route path="/marketList" element={<MarketList />}></Route>
          <Route path="/marketWrite" element={<MarketWrite />}></Route>
          <Route path="/marketDetail/:id" element={<MarketDetail />}></Route>
          <Route path="/quillTest" element={<QuillTest />}></Route>
          <Route path="/testPage" element={<TestPage />}></Route>
          <Route path="/tipList" element={<TipList />}></Route>
          <Route path="/tipDetail" element={<TipDetail />}></Route>
          <Route path="/portDetail" element={<PortDetail />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/portList" element={<PortList />}></Route>
          <Route path="/tipWrite" element={<TipWrite />}></Route>
          <Route path="/reviewList" element={<ReviewList />}></Route>
          <Route path="/reviewDetail" element={<ReviewDetail />}></Route>
          <Route path="/reviewWrite" element={<ReviewWrite />}></Route>
          <Route path="/portWrite" element={<PortWrite />}></Route>
          

          <Route path="/qnaWrite" element={<QnaWrite />}></Route>
          <Route path="/qnaDetail" element={<QnaDetail />}></Route>
          <Route path="/qnaList" element={<QnaList />}></Route>
          

        </Routes>
        {RenderHeaderAndFooter() && <Footer />}
      </PlayBoardContext.Provider>
    </div>
  );
}

export default App;

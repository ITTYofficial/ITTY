import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import "./css/reset.css";
import MarketList from "./components/MarketList";
import MarketDetail from "./components/MarketDetail";
import Join from "./components/Join";
import Login from "./components/Login";
import QuillTest from "./components/QuillTest";



function App() {
   // 회원가입과 로그인부분 헤더/푸터 렌더링 유무 함수

   const location = useLocation();

   const RenderHeaderAndFooter = () => {
    return location.pathname !== "/join" && location.pathname !== "/login";
  };

  return (
    <div className="Container">
      {RenderHeaderAndFooter() && <Header />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/projectList" element={<ProjectList />}></Route>
        <Route path="/projectDetail/:id" element={<ProjectDetail />}></Route>
        <Route path="/marketList" element={<MarketList />}></Route>
        <Route path="/marketDetail/:id" element={<MarketDetail />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/quillTest" element={<QuillTest />}></Route>
        
      </Routes>
      {RenderHeaderAndFooter() && <Footer />}
    </div>
  );
}

export default App;

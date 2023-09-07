import { Route, Routes } from "react-router-dom";
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


function App() {
  return (
    <div className="Container">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/projectList" element={<ProjectList />}></Route>
        <Route path="/projectDetail/:id" element={<ProjectDetail />}></Route>
        <Route path="/marketList" element={<MarketList />}></Route>
        <Route path="/marketDetail" element={<MarketDetail />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

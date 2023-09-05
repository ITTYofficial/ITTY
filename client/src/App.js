import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import "./css/reset.css";
import MarketList from "./components/MarketList";
import MarketDetail from "./components/MarketDetail";


function App() {
  return (
    <div className="Container">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/projectList" element={<ProjectList />}></Route>
        <Route path="/projectDetail" element={<ProjectDetail />}></Route>
        <Route path="/marketList" element={<MarketList />}></Route>
        <Route path="/marketDetail" element={<MarketDetail />}></Route>
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div className="Container">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/projectList" element={<ProjectList />}></Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

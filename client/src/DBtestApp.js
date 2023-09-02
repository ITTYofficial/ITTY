import { Route, Routes } from "react-router-dom";
import DBtestMain from "./components/DBtestMain";
import DBtestWrite from "./components/DBtestWrite";
import DBtestDetail from "./components/DBtestDetail";

function DBtestApp() {
  return (
    <div className="Container">

      <Routes>
        <Route path="/" element={<DBtestMain />}></Route>
        <Route path="/write" element={<DBtestWrite />}></Route>
        <Route path="/detail/:id" element={<DBtestDetail />}></Route>

      </Routes>

    </div>
  );
}

export default DBtestApp;

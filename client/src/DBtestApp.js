import { Route, Routes } from "react-router-dom";
import DBtestMain from "./components/DBtestMain";
import DBtestWrite from "./components/DBtestWrite";

function DBtestApp() {
  return (
    <div className="Container">

      <Routes>
        <Route path="/" element={<DBtestMain />}></Route>
        <Route path="/write" element={<DBtestWrite />}></Route>

      </Routes>

    </div>
  );
}

export default DBtestApp;

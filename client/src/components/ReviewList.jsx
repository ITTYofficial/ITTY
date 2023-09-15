import React from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/ReviewList.module.css";
import { Link } from "react-router-dom";

const ReviewList = () => {
  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.right_container_button}>
          <h2>수료생 후기👨‍🎓</h2>
          <Link to={"#"}>
            <p>작성하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;

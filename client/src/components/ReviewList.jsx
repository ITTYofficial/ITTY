import React from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/ReviewList.module.css";
import { Link } from "react-router-dom";

const ReviewList = () => {
  const ReviewItem = () => (
    <div className={style.Main_container_list_detail}>
      <div>
        <span>
          <div className={style.cateBox}>
            <span className={`${style.play_title} ${style.star}`}>⭐4.5</span>
            <span className={`${style.play_title} ${style.recommend}`}>
              추천 👍
            </span>
            <span className={`${style.play_title} ${style.nomajor}`}>
              비전공자💎
            </span>
            <span className={`${style.play_title} ${style.major}`}>
              전공자 🚩
            </span>
            <span className={`${style.play_title} ${style.veryrecommend}`}>
              강력추천 😁
            </span>
            <span className={`${style.play_title} ${style.notrecommend}`}>
              비추천 👎🏻
            </span>

          </div>
          <h3>스인재 3개월차 솔직후기입니다.</h3>
        </span>

        <span className={style.Review_list_profile}>
          <div>
            <p>빅데이터분석반</p>
            <h4>언제취뽀</h4>
          </div>
          <div>
            <img src="#" alt="" />
          </div>
        </span>
      </div>
      <span>
        <p>1 시간 전 👁‍🗨12 💬4</p>
      </span>
    </div>
  );

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.right_container_button}>
          <h2>수료생 후기👨‍🎓</h2>
          <Link to={"/reviewWrite"}>
            <p>작성하기</p>
          </Link>
        </div>
        <div className={style.Review_container_list}>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </div>
    </div>
  );
};

export default ReviewList;

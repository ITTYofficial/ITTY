import React from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/MarketList.module.css";
import { Link } from "react-router-dom";

const MarketList = () => {
  const MarketItem = () => (
    <div className={style.Market_content}>
      <div className={style.Market_content_img}>
        <Link to={"/marketDetail"}>
          <img src="https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDZfMjM4/MDAxNjQ0MTMyMjY5NTE5.9QiJKAEWRxcFEPApSkt2s2jpl_ptooODuxaGYSrcJs0g.2Rb0qjSn6xzCYYOGzaeg2dtCA3f2YdhpEApxSdGjpBQg.JPEG.hformula/SE-ba9ade28-f21a-4e39-a0b7-4aca0c9acc65.jpg?type=w800"></img>
        </Link>
        <div className={style.text1}>
          <Link to={"/marketDetail"}>
            <p>정보처리기사 실기책</p>
          </Link>
          <p>8,000원</p>
        </div>
        <div className={style.text2}>
          <p>2시간전</p>
          <p>조회수 30 댓글 2</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.right_container_button}>
          <h2>교환 장터🥕</h2>
          <a href="#">작성하기</a>
        </div>
        <div className={style.Market_list}>
          <MarketItem />
          <MarketItem />
          <MarketItem />
          <MarketItem />
          <MarketItem />
          <MarketItem />
        </div>
      </div>
    </div>
  );
};

export default MarketList;

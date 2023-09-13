import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/MarketList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const MarketList = () => {
  // 장터리스트 담을 State
  const [marketList, setMarketList] = useState([]);

  // 장터 리스트 조회 함수
  const readMarketList = async () => {
    await axios
      .get("http://localhost:8088/market/marketList")
      .then((res) => {
        console.log(res);
        setMarketList(res.data.market);
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };

  // 임시 게시글 등록 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8088/market/write");
    } catch (error) {}
  };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readMarketList();
  }, []);

  // 각 장터 게시글 정보를 담을 내부 컴포넌트
  // 날짜 바꾸기
  const MarketItem = ({ props }) => (
    <div className={style.Market_content}>
      <div className={style.Market_content_img}>
        <Link to={`/marketDetail/${props._id}`}>
          <img src={props.imgPath}></img>
        </Link>
        <div className={style.text1}>
          <Link to={`/marketDetail/${props._id}`}>
            <p>{props.title}</p>
          </Link>
          <p>{props.price}원</p>
        </div>
        <div className={style.text2}>
          <p>{props.createdAt}</p>
          <p>조회수 {props.views} 댓글 2</p>
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
          <a href="/marketWrite">작성하기</a>
        </div>
        <div className={style.Market_list}>
          {marketList.map((item) => (
            <MarketItem key={item._id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketList;

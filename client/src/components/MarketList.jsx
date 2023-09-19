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
        const sortedProjects = res.data.market.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMarketList(sortedProjects);
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
    } catch (error) { }
  };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readMarketList();
  }, []);



  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTimeAgoString = (dateString) => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const timeDifference = now - createdAt;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference === 0) {
      if (hoursDifference === 0) {
        return "방금 전";
      } else {
        return `${hoursDifference}시간 전`;
      }
    } else {
      return `${daysDifference}일 전`;
    }
  };

  

  // 각 장터 게시글 정보를 담을 내부 컴포넌트
  // 날짜 바꾸기
  const MarketItem = ({ props }) => (
    <Link
      to={`/marketDetail/${props._id}`}
      className={style.Market_content_item}
    >
      <div className={style.Market_content_img} style={{width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover'}}>

        {/* <img src={props.imgPath[0]}></img> */}
      </div>
      <div className={style.Market_content_text}>
        <h4>{props.title}</h4>
        <div className={style.Market_content_text2}>
          <p className={style.market_content_price}>{props.price} 원</p>
          <p className={style.market_content_date}>{getTimeAgoString(props.createdAt)}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className={style.Main_container}>
      <LeftContainer/>
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

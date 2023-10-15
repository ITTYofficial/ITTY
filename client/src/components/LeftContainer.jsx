import React, { useEffect, useState } from "react";
import style from "../css/LeftContainer.module.css";
import axios from 'axios'

const LeftContainer = () => {
  const [top5Members, setTop5Members] = useState([]);
  // top5 조회함수
  const top5List = async () => {
    await axios.get("http://localhost:8088/member/top5Members")
      .then((res) => {
        setTop5Members(res.data.topMembers);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const rankImages = ['https://i.ibb.co/X5FvYfz/rank1-01.png', 'https://i.ibb.co/tPtrC8F/rank-2-01.png', 'https://i.ibb.co/wpJ66M7/rank3-01.png', 'https://i.ibb.co/wSJKtTg/rank4-01.png', 'https://i.ibb.co/6WNR0PY/rank5-01.png'];

  useEffect(() => {
    top5List();
  }, []);

  console.log('탑5확인', top5Members);

  return (
    <div className={style.left_container}>
      <div className={style.left_container_box1}>
        <h3>반이름</h3>
        <h4>포트폴리오</h4>
        <div>
          <img src="https://i.ibb.co/Gtdf6bt/portfolio.gif" alt="portfolio"></img>
        </div>
      </div>
      <div className={style.left_container_box2}>
        <h3>이달의 투표 👍</h3>
        <h4>스인재 주변 최고맛집은?</h4>
      </div>
      <div className={style.left_container_box3}>
        <h3> 👑 Best Ranking </h3>
        {top5Members.map((item, index) =>
          <div key={item._id}>
 <img src={rankImages[index]} alt={`Rank ${index + 1}`} />     <h2>{item.nickname}</h2>
    <h4>{item.point} P</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftContainer;

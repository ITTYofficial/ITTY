import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import styles from "../css/Community.module.css";
import style from "../css/TipList.module.css";

const TipList = () => {

  // 팁 리스트 담을 State
  const [tipList, setTipList] = useState([]);

  // 팁 리스트 조회 함수
  const readTipList = async () => {
    await axios
      .get("http://localhost:8088/tip/tipList")
      .then(async(res) => {
                // 회원정보조회-지홍
                // console.log("1. writer :", res.data.tip[0].writer);
                let memberPromises = res.data.tip.map((tip) => {
                  // const nickname = tip.writer;
                  const id = tip.id
        
                  return axios.get(
                    `http://localhost:8088/member/memberSearching?id=${id}`
                  );
                });
        
                let memberResponses = await Promise.all(memberPromises);
                let member = memberResponses.map((response) => ({
                  member: response.data.member,
                }));
        
                console.log("member 내용물 : ", member.member);
                let fusion = member.map((item, index) => {
                  return { ...item, ...res.data.tip[index] };
                });
                console.log("퓨전", fusion);
        const sortedTip =  fusion.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setTipList(sortedTip);
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
  };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readTipList();
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTime = (dateString) => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const timeDifference = now - createdAt;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    if (minutesDifference === 0) {
      return "방금 전";
    } else if (minutesDifference < 60) {
      return `${minutesDifference}분 전`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}시간 전`;
    } else {
      return `${daysDifference}일 전`;
    }
  };


  const Develope = () => (
    <span className={`${style.play_title} ${style.develope}`}>개발 🙋🏻‍♀️</span>
  );

  const TipItem = ({props}) => (
    <div className={style.Main_container_list_detail}>
      {/* 글 제목 및 내용 */}
      <div className={style.tip_text}>
        <Develope />
        <Link to={`/tipDetail/${props._id}`}>
          <h5>{props.title}</h5>
        </Link>
        <div className={style.tip_title_box_space_2}>
          <p>{getTime(props.createdAt)}</p>
          <p>👁‍🗨 {props.views} 💬 4</p>
        </div>
      </div>

      {/* 프로필*/}
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>데이터 디자인</p>
          <h4>글쓴이짱</h4>
        </span>
        <span className={style.profile_pic}></span>
      </div>
    </div>
  );

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div className={style.Main_container_banner}>
          <img src="https://i.ibb.co/Stt16Jf/tip.png"></img>
        </div>
        <div className={styles.right_container_button}>
          <div></div>
          <h2>Tip 🥇</h2>
          <Link to={"/tipWrite"}>
            <p>작성하기</p>
          </Link>
        </div>

        <div className={styles.Main_container_list}>
          {tipList.map((item) => (<TipItem key={item._id} props={item}/>))}
        </div>
        <div className={style.tip_page_box}>1 2 3 4 5 6 7 8 9 10.....20</div>
      </div>
    </div>
  );
};

export default TipList;

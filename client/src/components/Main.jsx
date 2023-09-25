import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/Main.module.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

// import "../css/Community.css";

const Main = () => {
  // console.log(sessionStorage.getItem("memberId"));
  // console.log(sessionStorage.getItem("memberNickname"));

  // 게시물 담을 State
  const [playList, setPlayList] = useState([]);
  const [proStuList, setProStuList] = useState([]);
  // 메인 페이지 게시물 리스트 조회함수
  const mainList = async () => {
    await axios.get("http://localhost:8088/main/mainList")
    .then((res)=>{
      setPlayList(res.data.main.play);
      setProStuList(res.data.main.proStu);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

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

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    mainList();
  }, []);

  const Main_detail_play = ({ props }) => (
    <div className={style.Main_grid_detail}>
      <div className={style.Main_grid_right_container}>
        <div className={style.Main_grid_subcontent}>
          <p>{getTimeAgoString(props.createdAt)} 👁‍🗨{props.views} 💬4</p>
        </div>
        <h4>{props.title}</h4>
      </div>
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>데이터디자인반</p>
          <h4>자바노잼</h4>
        </span>
        <div className={style.profile_pic}>
          <Image
            src="https://yt3.googleusercontent.com/ytc/AOPolaRxpUD_H-QjwLO46YEWjrvap8RBzgOmsYCHex5m=s900-c-k-c0x00ffffff-no-rj"
            roundedCircle
          />
        </div>
      </div>
    </div>
  );

  const Main_detail_project = ({ props }) => (
    <div className={style.Main_grid_detail}>
      <div className={style.Main_grid_right_container}>
        <div className={style.Main_grid_subcontent}>
          <p>{getTimeAgoString(props.createdAt)} 👁‍🗨{props.views} 💬4</p>
        </div>
        <h4>{props.title}</h4>
      </div>
      <div className={style.Main_grid_profile}>
        <span className={style.profile_text}>
          <p>데이터디자인반</p>
          <h4>자바노잼</h4>
        </span>
        <div className={style.profile_pic}>
          <Image
            src="https://yt3.googleusercontent.com/ytc/AOPolaRxpUD_H-QjwLO46YEWjrvap8RBzgOmsYCHex5m=s900-c-k-c0x00ffffff-no-rj"
            roundedCircle
          />
        </div>
      </div>
    </div>
  );

  const [marketList, setMarketList] = useState([]);

  // 장터 리스트 조회 함수
  const readMarketList = async () => {
    await axios
      .get("http://localhost:8088/market/marketList")
      .then(async (res) => {
        // 회원정보조회-지홍
        console.log("1. writer :", res.data.market[0].writer);
        let memberPromises = res.data.market.map((market) => {
          const nickname = market.writer;
          const id = market.id

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
          return { ...item, ...res.data.market[index] };
        });
        console.log("퓨전", fusion);
        const sortedProjects = fusion.sort((a, b) => {
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

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readMarketList();
  }, []);


  const MarketItem = ({ props }) => (
    <Link
      to={`/marketDetail/${props._id}?nickname=${props.writer}`}
      className={style.Market_content_item}
    >
      {/* <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover' }}> */}
      <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url('https://files.itworld.co.kr/2021/09_01/annepro-100900624-orig.jpgautowebp.jpeg') no-repeat center`, backgroundSize: 'cover' }}>

        {/* <img src={props.imgPath[0]}></img> */}
      </div>
      <div className={style.Market_content_text}>
        <h4>{props.title}</h4>
        <div className={style.Market_content_text2}>
          <p className={style.market_content_price}>{parseInt(props.price).toLocaleString()} 원</p>
          {/* <p className={style.market_content_date}>{getTimeAgoString(props.createdAt)}</p> */}
        </div>
      </div>
    </Link>
  );

  return (
    <div className={style.Wrap_container}>
      {/* 메인 이미지슬라이드 시작 */}
      <div className={style.Wrap_main_imageSlide}>
        <Slider autoplay={true} autoplaySpeed={3000}>
          <img src="https://i.ibb.co/Y0CrVh6/Imageslide1.jpg" alt="Slide" />
          <img src="https://i.ibb.co/SwyKj0J/Imageslide2.jpg" alt="Slide" />
        </Slider>
      </div>
      {/* 메인 이미지슬라이드 끝 */}

      <div className={style.Main_container}>
        <LeftContainer />

        <div className={style.right_container}>
          <div className={style.Main_grid_1}>
            <h3>자유게시판⚽</h3>

            {/* 자유게시판 목록 리스트 반복시작 */}
            {playList.slice(0, 5).map((item) => <Main_detail_play key={item._id} props={item} />)}
            {/* 자유게시판 목록 리스트 반복 끝 */}
          </div>

          {/* ======오른쪽 메인컨텐츠 왼쪽 오른쪽 구분선====== */}

          <div className={style.Main_grid_2}>
            <h3>프로젝트/스터디 구해요🙋‍♂️</h3>

            {/* 프로젝트 / 스터디 목록 리스트 반복시작 */}
            {proStuList.map((item) => <Main_detail_project key={item._id} props={item} />)}
            {/* 프로젝트 / 스터디 목록 리스트 끝 */}
          </div>
          <div className={style.Main_grid_3}>
            <h3>교환 장터🥕</h3>
            <div className={style.Market_list}>
              {marketList.slice(0,5).map((item) => (
                <MarketItem key={item._id} props={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

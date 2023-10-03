import React, { useEffect, useRef, useState } from "react";
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
  const [marketList, setMarketList] = useState([]);
  const [portList, setPortList] = useState([]);
  // 메인 페이지 게시물 리스트 조회함수
  const mainList = async () => {
    await axios.get("http://localhost:8088/main/mainList")
      .then((res) => {
        console.log(res.data.main);
        setPlayList(res.data.main.play);
        setProStuList(res.data.main.proStu);
        setMarketList(res.data.main.market);
        setPortList(res.data.main.port);
      })
      .catch((err) => {
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
          <p>{props.writerInfo.class}</p>
          <h4>{props.writerInfo.nickname}</h4>
        </span>
        <div className={style.profile_pic}>
          <Image
            src={props.writerInfo.profileImg}
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
        <p>{props.writerInfo.class}</p>
          <h4>{props.writer}</h4>
        </span>
        <div className={style.profile_pic}>
          <Image
            src={props.writerInfo.profileImg}
            roundedCircle
          />
        </div>
      </div>
    </div>
  );


  const MarketItem = ({ props }) => (
    <Link
      to={`/marketDetail/${props._id}??id=${props.id}`}
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


  const PortItem = ({ props }) => (
    <div className={style.port_content}>
      <div className={style.port_content_img}>
        <Link to={`/portDetail/${props._id}?id=${props.id}`}>
          <img src='https://media.vlpt.us/images/junh0328/post/2dc006ff-938d-46c6-bed3-cf45f6c3267e/KakaoTalk_Photo_2021-11-15-22-34-01%20001.png' alt="Portfolio" />
        </Link>
      </div>
      <div className={style.port_content_bottom}>
        <div>
          <h4>{props.title}</h4>
        </div>
        <div>
          <div className={style.port_content_bottom2}>
            <div className={style.profile_img}>
              <Image src={props.writerInfo.profileImg} roundedCircle />
            </div>
            <div>
              <p className={style.little_p}>{props.writerInfo.class}</p>
              <p className={style.large_p}>{props.writer}</p>
            </div>
          </div>
          <div>
            <p className={style.little_p}>{getTimeAgoString(props.createdAt)} 👁‍🗨 {props.views} 💬 4</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 스크롤기능
  const scrollRef_port = useRef(null);
  const scrollRef_market = useRef(null);
  const [isDrag, setIsDrag] = useState(false); //드레그 중인지의 상태확인
  const [startX, setStartX] = useState(); //처음 클릭한 x좌표 
  const onDragStart_port = e => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef_port.current.scrollLeft);
  };
  const onDragStart_market = e => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef_market.current.scrollLeft);
  };


  const onDragEnd_port = () => {
    setIsDrag(false);
  };
  const onDragEnd_market = () => {
    setIsDrag(false);
  };
  const onDragMove_port = e => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef_port.current;

      scrollRef_port.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX); //가장 왼쪽일 때, 움직이고 있는 마우스의 x좌표가 곧 startX로 설정.
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft); //가장 오른쪽일 때, 움직이고 있는 마우스의 x좌표에 현재 스크롤된 길이 scrollLeft의 합으로 설정
      }
    }
  };
  const onDragMove_market = e => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef_market.current;

      scrollRef_market.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX); //가장 왼쪽일 때, 움직이고 있는 마우스의 x좌표가 곧 startX로 설정.
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft); //가장 오른쪽일 때, 움직이고 있는 마우스의 x좌표에 현재 스크롤된 길이 scrollLeft의 합으로 설정
      }
    }
  };
  // 쓰로틀 
  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 50;
  const onThrottleDragMove_port = throttle(onDragMove_port, delay);
  const onThrottleDragMove_market = throttle(onDragMove_market, delay);
  // 스크롤기능


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
            {playList.map((item) => <Main_detail_play key={item._id} props={item} />)}
            {/* 자유게시판 목록 리스트 반복 끝 */}
          </div>

          {/* ======오른쪽 메인컨텐츠 왼쪽 오른쪽 구분선====== */}

          <div className={style.Main_grid_2}>
            <h3>프로젝트/스터디 구해요🙋‍♂️</h3>

            {/* 프로젝트 / 스터디 목록 리스트 반복시작 */}
            {proStuList.map((item) => <Main_detail_project key={item._id} props={item} />)}
            {/* 프로젝트 / 스터디 목록 리스트 끝 */}
          </div>

          {/* 포폴리스트 */}
          <div className={style.Main_grid_4}>
            <h3>포트폴리오 🔎</h3>
            <div className={style.port_list}
              onMouseDown={onDragStart_port}
              onMouseMove={isDrag ? onThrottleDragMove_port : null}
              onMouseUp={onDragEnd_port}
              onMouseLeave={onDragEnd_port}
              ref={scrollRef_port}>
              {portList.map((item) => <PortItem key={item._id} props={item} />)}
            </div>
          </div>


          {/* 마켓리스트 */}
          <div className={style.Main_grid_3}>
            <h3>교환 장터🥕</h3>
            <div className={style.Market_list}
              onMouseDown={onDragStart_market}
              onMouseMove={isDrag ? onThrottleDragMove_market : null}
              onMouseUp={onDragEnd_market}
              onMouseLeave={onDragEnd_market}
              ref={scrollRef_market}>
              {marketList.map((item) => (
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

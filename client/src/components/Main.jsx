import React, { useEffect, useRef, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/Main.module.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';

// import "../css/Community.css";

const Main = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // 슬라이더 관련
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [marketpreview, setMarketpreview] = useState(4.6);
  const [portpreview, setPortpreview] = useState(3.5);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      setMarketpreview(3);
      setPortpreview(2.2);
    } else {
      setMarketpreview(4.6);
      setPortpreview(3.5);
    }
  }, [windowWidth]);
  // 슬라이더 관련

  // 게시물 담을 State
  const [playList, setPlayList] = useState([]);
  const [proStuList, setProStuList] = useState([]);
  const [marketList, setMarketList] = useState([]);
  const [portList, setPortList] = useState([]);
  // 메인 페이지 게시물 리스트 조회함수
  const mainList = async () => {
    console.time('시간체크')
    await axios.get(`${baseUrl}/main/mainList`)
      .then((res) => {
        console.log('데이터 확인', res.data.main);
        setPlayList(res.data.main.play);
        setProStuList(res.data.main.proStu);
        setMarketList(res.data.main.market);
        setPortList(res.data.main.port);
        console.timeEnd('시간체크')
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
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (minutesDifference < 1) {
      return "방금 전";
    } else if (minutesDifference < 60) {
      return `${minutesDifference}분 전`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}시간 전`;
    } else {
      const daysDifference = Math.floor(hoursDifference / 24);
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
          <p>{getTimeAgoString(props.createdAt)} 👁‍🗨{props.views} 💬{props.comments}</p>
        </div>
        <Link to={`/playboardDetail/${props._id}?id=${props.id}`}>
          <h4>{props.title}</h4>
        </Link>
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
    <div className={style.Main_grid_detail2}>
      <div className={style.Main_grid_right_container}>
        <div className={style.Main_grid_subcontent}>
          <p>{getTimeAgoString(props.createdAt)} 👁‍🗨{props.views} 💬{props.comments}</p>
        </div>
        <Link to={props.type === 'project' ? `/projectDetail/${props._id}?id=${props.id}` : `/studyDetail/${props._id}?id=${props.id}`}>
          <div style={{ display: 'flex' }}>
            <RecommendTag selected={props.type} />
            <h4>{props.title}</h4>
          </div>
        </Link>

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
    <div className={style.market_content}>
      <Link
        to={`/marketDetail/${props._id}??id=${props.id}`}
        className={style.Market_content_item}
      >
        {/* <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover' }}>
        <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url('https://files.itworld.co.kr/2021/09_01/annepro-100900624-orig.jpgautowebp.jpeg') no-repeat center`, backgroundSize: 'cover' }}>
          <img src={props.imgPath[0]}></img>
        </div> */}
        {props.sold !== 1 ?
          <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover', position: 'relative', filter: 'grayscale(1)' }}>
            <div>
              <h4>판매완료</h4>
            </div>
          </div>
          :
          <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover' }}></div>
        }
        <div className={style.Market_content_text}>
          <h4>{props.title}</h4>
          <div className={style.Market_content_text2}>
            <p className={style.market_content_price}>{parseInt(props.price).toLocaleString()} 원</p>
            {/* <p className={style.market_content_date}>{getTimeAgoString(props.createdAt)}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );


  const PortItem = ({ props }) => (
    <div className={style.port_content}>
      <Link to={`/portDetail/${props._id}?id=${props.writerInfo.id}`}>
        <div className={style.port_content_img}>
          <img src={props.imgPath}></img>
          {/* <img src='https://media.vlpt.us/images/junh0328/post/2dc006ff-938d-46c6-bed3-cf45f6c3267e/KakaoTalk_Photo_2021-11-15-22-34-01%20001.png'></img> */}
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
              <p className={style.little_p}>{getTimeAgoString(props.createdAt)} 👁‍🗨 {props.views} 💬{props.comments}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );



  // 태그 컴포넌트들
  const RecommendTag = ({ selected }) => {
    let tagClassName = style.play_title;
    const tagMap = {
      'project': '프로젝트 📖',
      'study': '스터디 😋'
    };
    const tagStyleMap = {
      'project': style.purpose,
      'study': style.getajob
    };

    if (tagStyleMap[selected]) {
      tagClassName = `${tagClassName} ${tagStyleMap[selected]}`;
    }

    return (
      <span className={tagClassName}>
        {tagMap[selected] || ''}
      </span>
    );
  };


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
            {/* 로딩바 */}
            {playList.length === 0 && (
              <div className={style.spinner_container}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {playList.map((item) => <Main_detail_play key={item._id} props={item} />)}
            {/* 자유게시판 목록 리스트 반복 끝 */}
          </div>

          {/* ======오른쪽 메인컨텐츠 왼쪽 오른쪽 구분선====== */}

          <div className={style.Main_grid_2}>
            <h3>프로젝트/스터디 구해요🙋‍♂️</h3>

            {/* 로딩바 */}
            {proStuList.length === 0 && (
              <div className={style.spinner_container}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {/* 프로젝트 / 스터디 목록 리스트 반복시작 */}
            {proStuList.map((item) => <Main_detail_project key={item._id} props={item} />)}
            {/* 프로젝트 / 스터디 목록 리스트 끝 */}
          </div>

          {/* 포폴리스트 */}
          <div className={style.Main_grid_4}>
            <h3>포트폴리오 🔎</h3>

            {portList.length === 0 && (
              <div className={style.spinner_container_port}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            <Swiper
              slidesPerView={portpreview}
              spaceBetween={15}
              freeMode={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              {portList.map((item) =>
                <SwiperSlide>
                  <PortItem key={item._id} props={item} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>


          {/* 마켓리스트 */}
          <div className={style.Main_grid_3}>
            <h3>교환 장터🥕</h3>
            <Swiper
              slidesPerView={marketpreview}
              spaceBetween={15}
              freeMode={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              {marketList.map((item) =>
                <SwiperSlide>
                  <MarketItem key={item._id} props={item} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import style from "../css/MarketList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

const MarketList = () => {
  // 장터리스트 담을 State
  const [marketList, setMarketList] = useState([]);

  // 회원만 작성 할 수 있도록 제한하는 함수-지홍
  const checkSessionStorage = (e) => {
    // sessionStorage에서 값을 가져옴
    var value = sessionStorage.getItem("memberId");

    // 값이 없으면 alert 창을 표시하고 /login 페이지로 이동
    if (!value || value === "") {
      alert("로그인해야합니다");
      window.location.href = "/login";
      e.preventDefault();
    }
  };

 // 새로운 게시판 리스트 함수
 const getList = async() => {
  console.log('조회함수 진입');
  console.time('소요시간');
 await axios.get(`http://localhost:8088/total/findMemberInfo?market=market`)
    .then(async(res) => {
      console.log('확인!', res.data);
      
      const sortedMarkets = res.data.lists.sort((a, b) => {
        // 게시글 데이터 작성 일자별 내림차순 정렬
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      // 댓글 개수 카운팅
/*       const counting = sortedMarkets.map((item) => (item._id))
      const countList = (await axios.post(`http://localhost:8088/comment/commentCount`, counting)).data.countList
      const market = sortedMarkets.map((obj, index) => ({
        ...obj,
        count: countList[index],
      })); */
      setMarketList(sortedMarkets);
      setMaxPage(sortedMarkets.length);

      // setPlayList(res.data.lists);
      // setMaxPage(res.data.lists.length)

      console.timeEnd('소요시간');
    })
}

  // 장터 리스트 조회 함수
  // const readMarketList = async () => {
  //   await axios
  //     .get("http://localhost:8088/market/marketList")
  //     .then(async (res) => {
  //       // 회원정보조회-지홍
  //       console.log("1. writer :", res.data.market[0].writer);
  //       let memberPromises = res.data.market.map((market) => {
  //         const nickname = market.writer;
  //         const id = market.id

  //         return axios.get(
  //           `http://localhost:8088/member/memberSearching?id=${id}`
  //         );
  //       });

  //       let memberResponses = await Promise.all(memberPromises);
  //       let member = memberResponses.map((response) => ({
  //         member: response.data.member,
  //       }));

  //       console.log("member 내용물 : ", member.member);
  //       let fusion = member.map((item, index) => {
  //         return { ...item, ...res.data.market[index] };
  //       });
  //       console.log("퓨전", fusion);
  //       const sortedMarkets = fusion.sort((a, b) => {
  //         // 게시글 데이터 작성 일자별 내림차순 정렬
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       });

  //       // 댓글 개수 카운팅
  //       const counting = sortedMarkets.map((item) => (item._id))
  //       const countList = (await axios.post(`http://localhost:8088/comment/commentCount`, counting)).data.countList
  //       const market = sortedMarkets.map((obj, index) => ({
  //         ...obj,
  //         count: countList[index],
  //       }));

  //       setMarketList(sortedMarkets);
  //       setMaxPage(sortedMarkets.length);
  //     })
  //     .catch((err) => {
  //       alert("통신에 실패했습니다.");
  //       console.log(err);
  //     });
  // };
  console.log('마켓리스트 검사', marketList);

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    // readMarketList();
    getList();
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTimeAgoString = (dateString) => {
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



  // 각 장터 게시글 정보를 담을 내부 컴포넌트
  // 날짜 바꾸기
  const MarketItem = ({ props }) => {
    console.log('프롭스 확인', props.sold);
    return (
      <Link
        to={`/marketDetail/${props._id}?id=${props.id}`}
        className={style.Market_content_item}
      >
        {/* <div className={style.Market_content_img} style={{width: '100%', height: '75%', paddingTop: '110%', background: `url(${props.imgPath[0]}) no-repeat center`, backgroundSize: 'cover'}}> */}

        {/*       <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url("https://files.itworld.co.kr/2021/09_01/annepro-100900624-orig.jpgautowebp.jpeg") no-repeat center`, backgroundSize: 'cover', position: 'relative', filter: 'grayscale(1)' }}>
        <div>
          <h4>판매완료</h4>
        </div>
      </div> */}

        {props.sold == 1 ?
          <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url("https://files.itworld.co.kr/2021/09_01/annepro-100900624-orig.jpgautowebp.jpeg") no-repeat center`, backgroundSize: 'cover', position: 'relative', filter: 'grayscale(1)' }}>
            <div>
              <h4>판매완료</h4>
            </div>
          </div>
          :
          <div className={style.Market_content_img} style={{ width: '100%', height: '75%', paddingTop: '110%', background: `url("https://files.itworld.co.kr/2021/09_01/annepro-100900624-orig.jpgautowebp.jpeg") no-repeat center`, backgroundSize: 'cover' }}></div>
        }


        <div className={style.Market_content_text}>
          <h4>{props.title}</h4>
          <div className={style.Market_content_text2}>
            <p className={style.market_content_price}>{parseInt(props.price).toLocaleString()} 원</p>
            <p className={style.market_content_date}>{getTimeAgoString(props.createdAt)}</p>
          </div>
        </div>
      </Link>
    )
  };

  // 페이징 부분
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log('페이지 확인', page);
  };

  const itemsPerPage = 15;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 페이징 부분



  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
        <div className={style.right_container_button}>
          <h2>교환 장터🥕</h2>
          <a href="/marketWrite" onClick={checkSessionStorage}>작성하기</a>
        </div>

        <div className={style.Market_list}>
          {marketList.slice(startIndex, endIndex).map((item) => (
            <MarketItem key={item._id} props={item} />
          ))}

        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={maxPage}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MarketList;

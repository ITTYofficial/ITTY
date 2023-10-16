import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/PortList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

const PortList = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // 포트폴리오 리스트 담을 State
  const [portList, setPortList] = useState([]);

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

  // 새로운 게시판 리스트 함수 -> 페이징 적용 안되어있네요
  const getList = async () => {
    console.log('조회함수 진입');
    console.time('소요시간');
    await axios.get(`${baseUrl}/total/findMemberInfo?port=port`)
      .then(async (res) => {
        console.log('확인!', res.data);

        const sortedPorts = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // 댓글 개수 카운팅
        /*         const counting = sortedPorts.map((item) => (item._id))
                const countList = (await axios.post(`${baseUrl}/comment/commentCount`, counting)).data.countList
                const port = sortedPorts.map((obj, index) => ({
                  ...obj,
                  count: countList[index],
                })); */
        setPortList(sortedPorts);
        setMaxPage(sortedPorts.length);

        // setPlayList(res.data.lists);
        // setMaxPage(res.data.lists.length)

        console.timeEnd('소요시간');
      })
  }


  // 포트폴리오 리스트 조회 함수
  // const readPortList = async () => {
  //   await axios
  //     .get("${baseUrl}/port/portList")
  //     .then(async (res) => {
  //       // 회원정보조회-지홍
  //       console.log("1. writer :", res.data.port[0].writer);
  //       let memberPromises = res.data.port.map((port) => {
  //         const nickname = port.writer;
  //         const id = port.id;

  //         return axios.get(
  //           `${baseUrl}/member/memberSearching?id=${id}`
  //         );
  //       });

  //       let memberResponses = await Promise.all(memberPromises);
  //       let member = memberResponses.map((response) => ({
  //         member: response.data.member,
  //       }));

  //       console.log("member 내용물 : ", member.member);
  //       let fusion = member.map((item, index) => {
  //         return { ...item, ...res.data.port[index] };
  //       });
  //       console.log("퓨전", fusion);
  //       const sortedPort = fusion.sort((a, b) => {
  //         // 게시글 데이터 작성 일자별 내림차순 정렬
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       });

  //       // 댓글 개수 카운팅
  //       const counting = sortedPort.map((item) => (item._id))
  //       const countList = (await axios.post(`${baseUrl}/comment/commentCount`, counting)).data.countList
  //       const port = sortedPort.map((obj, index) => ({
  //         ...obj,
  //         count: countList[index],
  //       }));

  //       setPortList(port);
  //     })
  //     .catch((err) => {
  //       alert("통신에 실패했습니다.");
  //       console.log(err);
  //     });
  // };

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    // readPortList();
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

  const PortItem = ({ props }) => (
    <div className={styles.port_content}>
      <div className={styles.port_content_img}>
        <Link to={`/portDetail/${props._id}?id=${props.writerInfo.id}`}>
          <img src={props.imgPath}></img>
        </Link>
      </div>
      <div className={styles.port_content_bottom}>
        <div>
          <h4>{props.title}</h4>
        </div>
        <div>
          <div className={styles.port_content_bottom2}>
            <div className={styles.profile_img}>
              <Image src={props.writerInfo.profileImg} roundedCircle />
            </div>
            <div>
              <p className={styles.little_p}>{props.writerInfo.class}</p>
              <p className={styles.large_p}>{props.writer}</p>
            </div>
          </div>
          <div>
            <p className={styles.little_p}>
              {getTimeAgoString(props.createdAt)} 👁‍🗨 {props.views} 💬 {props.comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );



  // 페이징 부분
  const [maxPage, setMaxPage] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log('페이지 확인', page);
  };

  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 페이징 부분


  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <dvi className={styles.little_title}>
          <h2>포트폴리오🔍</h2>
          <Link to={"/portWrite"} onClick={checkSessionStorage}>
            <p>작성하기</p>
          </Link>
        </dvi>

        <div className={styles.port_list}>
          {portList.slice(startIndex, endIndex).map((item) => (
            <PortItem key={item._id} props={item} />
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

export default PortList;

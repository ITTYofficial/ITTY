import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftContainer from "./LeftContainer";
// import style from "../css/MarketDetail.module.css";
import style from "../css/MarketRemake.module.css";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { QuillContext } from "../context/QuillContext";
import CommentItem from "./CommentItem";
import QuillComment from './QuillComment'

const MarketDetail = () => {

  // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
  const { commentList, setCommentList, getComment, coValue, setCoValue, myInfo, setMyInfo  } = useContext(QuillContext);

  // 댓글 작성 시 호출되는 함수
  function commentSubmit(event) {
    event.preventDefault();

    // 회원만 작성가능하게 수정 - 지홍
    if (!sessionStorage.getItem("memberId")) {
      alert("로그인해야합니다");
      window.location.href = "/login";
      event.preventDefault();
    } else {
      const obj = {
        id: sessionStorage.getItem('memberId'),
        writer: sessionStorage.getItem("memberNickname"),
        postid: id,
        content: coValue,
        boardType: 'market'
      };
      console.log(obj);

      axios
        .post("http://localhost:8088/comment/write", obj)
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          console.log(res);
          setCoValue("");
          getComment(id);
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 작성 실패");
        });
    }
  }

  // 페이지 빠져나갈 때 댓글 리스트 초기화
  useEffect(() => {
    return () => {
      setCommentList([]);
    };
  }, []);

  // 특정 게시글 조회하기 위한 id값 가져오기
  const { id } = useParams();

  // 특정 게시글의 작성자 정보를 조회하기 위한 nickname값 가져오기-지홍
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nickname = params.get("id");

  // 현재 로그인 회원 정보 조회
  const nowUser = sessionStorage.getItem("memberId")

  // 게시글정보 저장할 State
  const [marketDetail, setmarketDetail] = useState([]);

  // 회원정보 저장할 state-지홍
  const [memberInfo, setMemberInfo] = useState([]);
  // 게시글 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것 => 지홍 추가함 (member.nickname활용)
  const getMarket = async () => {
    // projectRouter랑 통신해서 response에 결과값 저장
    await axios
      .get(`http://localhost:8088/market/marketDetail/${id}`)
      .then((res) => {
        // respnse에서 데이터 꺼내서 State에 저장
        console.log(res.data);
        setmarketDetail(res.data.detailMarket[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("확인!!", marketDetail.imgPath);
  // 회원 정보 조회 함수
  const memberSearching = async () => {
    await axios
      .get(`http://localhost:8088/member/memberSearching?id=${nickname}`)
      .then((res) => {
        console.log("axios다음 니크네임", res.data.member.nickname);
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    getMarket();
    getComment(id);
    memberSearching();
    console.log(marketDetail.imgPath);
  }, []);

  // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
  const getTime = (dateString) => {
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

  // 수정 페이지 이동
  const nav = useNavigate();
  const moveUpdate = () => {
    nav(`/marketWrite?id=${id}`);
  };

  // 게시글 삭제
  const deleteMarket = async () => {
    await axios
      .post(`http://localhost:8088/market/delete/${id}`)
      .then((res) => {
        alert("삭제 완료");
        window.location.href = "/MarketList";
      })
      .catch((err) => {
        alert("삭제 실패");
        console.log(err);
      });
  };

  // 판매 완료 전환
  const soldMarket = async () => {
    await axios
      .get(`http://localhost:8088/market/sold/${id}`)
      .then((res) => {
        alert("전환 완료");
      })
      .catch((err) => {
        alert("전환 실패");
        console.log(err);
      })
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 세션 스토리지에서 저장된 닉네임 가져오기
  const storedNickname = sessionStorage.getItem("memberNickname");

  // 작성자와 세션 스토리지의 닉네임 비교
  const isOwner = storedNickname === marketDetail.writer;

  // 수정 버튼 클릭 시 동작할 함수
  const handleModifyClick = () => {
    if (isOwner) {
      // 작성자와 세션 스토리지의 닉네임이 일치하는 경우에만 수정 가능
      moveUpdate();
    } else {
      alert("작성자만 수정할 수 있습니다."); //  안보이게 하려면 다른 코드 추가해야함
    }
  };

  // 삭제 버튼 클릭 시 동작할 함수
  const handleDeleteClick = () => {
    if (isOwner) {
      // 작성자와 세션 스토리지의 닉네임이 일치하는 경우에만 삭제 가능
      deleteMarket();
    } else {
      alert("작성자만 삭제할 수 있습니다."); //  안보이게 하려면 다른 코드 추가해야함
    }
    // 신고 버튼도 추가하는 게 어떨런지..?
  };

  // 판매 완료 버튼 클릭 시 동작할 함수
  const handleSoldClick = () => {
    if (isOwner) {
      soldMarket();
    } else {
      alert("작성자만 바꿀 수 있습니다."); //  안보이게 하려면 다른 코드 추가해야함
    }
  }

  return (
    <div className={style.Main_container}>
      <LeftContainer />

      <div className={style.right_container}>
        <div className={style.division_line}>
          <div>
            <Link>Community🌐</Link> /{" "}
            <Link to={"/MarketList"}>교환 장터🥕</Link>
          </div>
        </div>

        {/* 사진 및 정보 제공 section */}
        <div className={style.right_main_content}>
          <div className={style.Img_slide}>
            {marketDetail.imgPath && marketDetail.imgPath.length > 0 && (
              <Slider {...settings}>
                {marketDetail.imgPath.map((item) => (
                  <div key={item}>
                    <img src={item} alt="Slide" />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          <div className={style.market_right_buttonFlex}>
            <div>
              <div className={style.market_title}>
                <h2>{marketDetail.title}</h2>
                <p>{getTime(marketDetail.createdAt)}</p>
              </div>

              <h2>
                {parseInt(marketDetail.price).toLocaleString()} <span>원</span>
              </h2>

              <div className={style.market_profile}>
                <div>
                  <div className={style.profile_img}>
                    <Image src={memberInfo.profileImg} roundedCircle />
                  </div>
                  <div>
                    <p className={style.member_class}>{memberInfo.class}</p>
                    <h5>{marketDetail.writer}</h5>
                  </div>
                </div>
                <div>
                  <p>👁‍🗨 {marketDetail.views} 💬 {marketDetail.comments}</p>
                </div>
              </div>
            </div>
            <div className={style.market_buttons}>
              {(nowUser === marketDetail.id ?
                <>
                  <button onClick={handleModifyClick}>수정</button>
                  <button onClick={handleDeleteClick}>삭제</button>
                  <button onClick={handleSoldClick}>판매 완료</button>
                </>
                :
                null)}
            </div>
          </div>
        </div>

        {/* 내용부분 */}
        <div className={style.market_content}>
          <h3>상품 정보</h3>
          <div className="quill_content_font_style">
            <p dangerouslySetInnerHTML={{ __html: marketDetail.content }}></p>
          </div>
        </div>

        {/* 댓글부분 */}
        {/* <div className={style.division_line}>
          <div>
            <p>댓글 3</p>
          </div>
        </div>
        <form onSubmit={commentSubmit}>
          <div className={style.comment_write}>
            <div>
              <div>
                <Image
                  src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png"
                  roundedCircle
                />
              </div>
              <textarea
                onChange={commnetChange}
                placeholder="댓글을 쓰려면 로그인이 필요합니다."
                value={comment}
              ></textarea>
            </div>
            <Button type="submit" variant="outline-primary">
              댓글쓰기
            </Button>{" "}
          </div>
        </form> */}
        {/* 댓글부분 */}
        {/* {commentList.map((item) => (
          <CommentItem key={item._id} props={item} postId={id} />
        ))} */}
        {/* 댓글부분 */}
        {/* 댓글달기 시작 */}
        <div className={style.division_line_comment}>
          <div>
            <h4>댓글 {marketDetail.comments}</h4>
          </div>
        </div>
        <form onSubmit={commentSubmit}>
          <div className={style.comment_write}>
            <div>
              <div className={style.comment_write_profile}>
                <Image src={myInfo.profileImg} roundedCircle />
              </div>
              <div className={style.quillComment_container}>
                <QuillComment />
              </div>
            </div>
            <div className={style.submit_btn_group}>
              <button type="submit">댓글쓰기</button>
            </div>
          </div>
        </form>
        {/* 댓글달기 끝 */}

        {commentList.map((item) => (
          <CommentItem key={item._id} props={item} postId={id} boardType='market' />
        ))}
      </div>
    </div>
  );
};

export default MarketDetail;

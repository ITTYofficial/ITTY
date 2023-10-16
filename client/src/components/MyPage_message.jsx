import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../css/MyPage.module.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Link, useLocation } from "react-router-dom";
import CropperTest from "./CropperTest";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { QuillContext } from "../context/QuillContext";

const MyPage_message = () => {
  const { messageInfo, setMessageInfo } = useContext(QuillContext);

  const loginId = sessionStorage.getItem("memberId");

  // 정보 조회 데이터 관리
  const [memberInfo, setMemberInfo] = useState({});

  const messageContentRef = useRef();

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 messageElement를 설정
    // message 요소를 찾아서 설정
    memberSearching();
    showMessageList();
  }, []);

  // 회원정보 조회
  const memberSearching = async () => {
    const id = sessionStorage.getItem("memberId");
    await axios
      .get(`http://localhost:8088/member/memberSearching?id=${id}`)
      .then((res) => {
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  /* 쪽지 컴포넌트 */
  const [messageList, setMessageList] = useState([]);
  const [messageListDetail, setMessageListDetail] = useState([]);

  const showMessageList = async (e) => {
    const getUserId = sessionStorage.getItem("memberId");
    await axios
      .get(
        `http://localhost:8088/message/showMessageList?getUserId=${getUserId}`
      )
      .then((res) => {
        /* console.log("메세지 리스트 데이터", res.data.lists); */
        const sortedMessages = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setMessageList(sortedMessages);
        // setMaxPage(sortedPlays.length);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const showMessageListDetail = async (e) => {
    setMessageListDetail("");
    const getUserId = sessionStorage.getItem("memberId");
    const sendUserId = e; // MessageCompo에 Link에 넣은 쿼리 스트링
    console.log("센드유저아이디?", sendUserId);
    await axios
      .get(
        `http://localhost:8088/message/showMessageListDetail?getUserId=${getUserId}&sendUserId=${sendUserId}`
      )
      .then((res) => {
        const sortedMessage = res.data.lists.sort((a, b) => {
          // 게시글 데이터 작성 일자별 내림차순 정렬
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        setMessageListDetail(sortedMessage);
      });
  };

  console.log("머머 들어있음?", messageListDetail);

  // 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messageContentRef.current) {
      messageContentRef.current.scrollTop =
        messageContentRef.current.scrollHeight;
    }
  }, [messageListDetail]);

  /* 쪽지 컴포넌트 */
  const MessageCompo = ({ props }) => {
    // 여기서 Link 걸때 쿼리스트링으로 sendUserId 보내면 되겠슴돠
    const messageDetailInfo = () => {
      setMessageInfo(props.writerInfo);
      showMessageListDetail(props.writerInfo.id);
    };
    const isUnreadMessage = props.read === 0; // 수정된 부분

    return (
      <div className={styles.message_profile_box} onClick={messageDetailInfo}>
        {isUnreadMessage && <div className={styles.unread_indicator}></div>}{" "}
        <div className={styles.message_img}>
          <Image src={props.writerInfo.profileImg} roundedCircle />
        </div>
        <div>
          <h5>{props.writerInfo.nickname}</h5>

          {/* 수정된 부분 */}
        </div>
      </div>
    );
  };

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

  // 쪽지 작성함수

  const messageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("sendUserId", sessionStorage.getItem("memberId"));
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    console.log("obj 확인", obj.getUserId);
    await axios
      .post("http://localhost:8088/message/write", obj)
      .then((res) => {
        alert("쪽지 작성 완료");
        showMessageListDetail(obj.getUserId);
        e.target.reset();
      })
      .catch((err) => {
        alert("작성에 실패했습니다.");
      });
  };

  // 쪽지 작성함수

  const MessageDetailCompo = () => {
    return (
      <div className={styles.message_content_wrapper}>
        <div className={styles.message_content_top_box}>
          <div>
            <Image src={messageInfo.profileImg} roundedCircle />
          </div>
          <div>
            <h5>{messageInfo.nickname}</h5>
          </div>
        </div>
        <div
          className={styles.message_content_bottom_box}
          ref={messageContentRef}
        >
          {messageListDetail.map((message, index) => (
            <div
              className={
                message.sendUserId === loginId
                  ? styles.sent_message
                  : styles.received_message
              }
              key={index}
            >
              {message.sendUserId === loginId && (
                <div className={styles.message_time}>
                  <p>{getTimeAgoString(message.createdAt)}</p>
                </div>
              )}
              <div>
                <Image
                  src={
                    message.sendUserId === loginId
                      ? memberInfo.profileImg
                      : messageInfo.profileImg
                  }
                  roundedCircle
                />
              </div>
              <div>
                <p>{message.content}</p>
              </div>
              {message.sendUserId !== loginId && (
                <div className={styles.message_time}>
                  <p>{getTimeAgoString(message.createdAt)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.Main_container}>
      <div className={styles.left_container}>
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi bi-person-square"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
            </svg>
            <Link to={"/myPage/profile"}>
              <h4>프로필</h4>
            </Link>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-chat-left-heart"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" />
              <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
            </svg>
            <Link to={"/myPage/message"}>
              <h4>받은 쪽지함</h4>
            </Link>
          </div>
        </div>
        <div className={styles.point_box}>
          <h4>보유 포인트 : {memberInfo.point}</h4>
        </div>
      </div>

      <div className={styles.right_container}>
        <div className={styles.message_container}>
          <h2>받은 쪽지</h2>
          <div className={styles.message_wrapper}>
            <div>
              <h4>메시지</h4>
              {/* 글 반복 시작 */}
              {messageList.map((item) => (
                <MessageCompo
                  key={item.sendUserId}
                  props={item}
                  onClick={showMessageListDetail}
                />
              ))}
            </div>
            {messageListDetail.length > 0 ? (
              <div>
                <MessageDetailCompo />
                <div className={styles.message_send_box}>
                  <form onSubmit={messageSubmit}>
                    <input
                      type="hidden"
                      name="getUserId"
                      value={messageInfo.id}
                    ></input>
                    <input
                      type="text"
                      name="content"
                      className="form-control"
                      placeholder="메시지 입력..."
                    ></input>
                    <button className={styles.sendMessage_button}>전송</button>
                  </form>
                </div>
              </div>
            ) : (
              <div className={styles.message_default_box}>
                <h2>받은 쪽지함</h2>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage_message;

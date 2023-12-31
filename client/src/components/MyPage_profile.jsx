import React, { useEffect, useRef, useState } from "react";
import styles from "../css/MyPage.module.css";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase";

const MyPage_profile = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  /* 이미지 크롭 스크립트 */
  const [inputPicDisplay, setInputPicDisplay] = useState(true);

  /* 크로퍼 */
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // 정보 조회 데이터 관리
  const [memberInfo, setMemberInfo] = useState({});
  // 정보수정 데이터관리
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  // 중복 등 파악
  const [pwCheckResult, setPwCheckResult] = useState(true);
  const [nicknameCheckResult, setNicknameCheckResult] = useState(false);

  // 경고문이 뜰 자리
  const messageElement2 = useRef(null);
  const messageElement3 = useRef(null);
  const messageElement4 = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 messageElement를 설정
    // message 요소를 찾아서 설정
    memberSearching();
    messageElement2.current = document.getElementById("pWmessage");
    messageElement3.current = document.getElementById("pWCheckmessage");
    messageElement4.current = document.getElementById("nickNameCheckmessage");
  }, []);

  const onPwHandler = (e) => {
    setPw(e.target.value);
  };
  const onCheckPwHandler = (e) => {
    setCheckPw(e.target.value);
  };

  // 회원정보 조회
  const memberSearching = async () => {
    const id = sessionStorage.getItem("memberId");
    await axios
      .get(`${baseUrl}/member/memberSearching?id=${id}`)
      .then((res) => {
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  // 비밀번호는 영문과 숫자 필수
  const engNumPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const engNumPwCheck = (e) => {
    if (messageElement2.current) {
      const inputValue = e.target.value;
      if (engNumPw.test(inputValue)) {
        messageElement2.current.textContent = "";
        //      messageElement.current.style.color = "blue";
        setPwCheckResult(true);
      } else {
        messageElement2.current.textContent =
          "비밀번호에는 문자와 숫자를 모두 포함해야 합니다.";
        messageElement2.current.style.color = "red";
        setPwCheckResult(false);
      }
    }
  };

  // 닉네임 중복 체크 -> 본래 닉네임 치면 true 반환하게
  const nicknameCheck = async (e) => {
    e.preventDefault();
    const newNickname = e.target.value;
    setNickname(newNickname);
    // 텍스트가 1글자인 경우
    if (newNickname.length === 1) {
      messageElement4.current.textContent =
        "닉네임은 최소 2글자 이상이어야 합니다.";
      messageElement4.current.style.color = "red";
      setNicknameCheckResult(false);
      return; // 함수 종료
    }
    const nicknameChecking = { nickname: newNickname };

    try {
      const response = await axios.post(
        `${baseUrl}/member/nicknameCheck`,
        nicknameChecking
      );
      if (response.data.nicknameCheckingSuccess) {
        messageElement4.current.textContent = response.data.message;
        messageElement4.current.style.color = "blue";
        setNicknameCheckResult(true);
      } else {
        messageElement4.current.textContent = response.data.message;
        messageElement4.current.style.color = "red";
        setNicknameCheckResult(false);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 비밀번호 확인 (-> 이러면 한번 인풋창을 건드리면 비밀번호를 맞춰야한다는 단점이있음)
  const pwCheck = (e) => {

    if (pw !== checkPw) {
      messageElement3.current.textContent = "비밀번호가 일치하지 않습니다.";
      messageElement3.current.style.color = "red";
      setPwCheckResult(false);
    } else {
      messageElement3.current.textContent = "비밀번호 일치 확인";
      messageElement3.current.style.color = "blue";
      setPwCheckResult(true);
    }
  };

  /* 크로퍼 */
  const handleCropperClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // input 요소 초기화
      inputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files) return;
    handleShow();
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setInputPicDisplay(false);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCroppedImage(croppedDataUrl);
      setImage(null);
    }
    setShow(false);
  };

  /* 크로퍼 */

  useEffect(() => {
    if (croppedImage !== null) {
      const fakeUpload = document.querySelector(`.${styles.fake_upload}`);
      setInputPicDisplay(true);
      fakeUpload.style.display = "none";
    }
  }, [croppedImage]);

  /* 모달 */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImage(null);
    setInputPicDisplay(true);
  };
  const handleShow = () => {
    /* setCroppedImage(null); */
    setShow(true);
    /* handleCropperClick(); */
  };

  /* 모달 */

  //************************************ */

  // base64 -> formdata
  const handlingDataForm = async (dataURI) => {
    if (dataURI !== null) {
      // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
      const byteString = atob(dataURI.split(",")[1]);
      // const nickname = sessionStorage.getItem("memberNickname");
      // Blob를 구성하기 위한 준비, 잘은 모르겠음.. 코드존나어려워
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: "image/jpeg",
      });
      const file = new File([blob], "image.jpg");
      // 위 과정을 통해 만든 image폼을 FormData에
      // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야함
      const formData = new FormData();
      formData.append("img", file);
      // formData.append("writer",nickname)
      try {
        const result = await axios.post(
          `${baseUrl}/save/save`,
          formData
        );
        const url = result.data.url;
        return url;
      } catch (error) {
        console.log(error);
      }
    } else {
      return dataURI;
    }
  };
  //===== div클릭시 이미지 업로드 대리 클릭 및 업로드한 이미지 미리보기를 위한 문법 =====


  /* 파이어베이스 시작 */
  const handleSaveCroppedImage = async (croppedImageDataUrl) => {
    const imageDataBlob = await fetch(croppedImageDataUrl).then((res) =>
      res.blob()
    );

    try {
      const storageRef = ref(storage, `image/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, imageDataBlob);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error(
        "Firebase에 이미지를 업로드하는 동안 오류가 발생했습니다.",
        error
      );
      return null;
    }
  };
  /* 파이어베이스 끝 */

  const updateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", sessionStorage.getItem("memberId"));

    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    const url = await handleSaveCroppedImage(croppedImage);
    if (!url) {
      obj["imgPath"] = memberInfo.profileImg;
    } else {
      obj["imgPath"] = url;
    }
    axios
      .post(`${baseUrl}/member/update`, obj)
      .then((res) => {
        alert("회원정보가 수정되었습니다.");
        window.location.href = `/`
      })
      .catch((err) => {
        alert("회원정보 수정 실패");
        window.location.href = `/myPage`
      });
  };

  // **************닉네임 변경 메소드
  const updateNickname = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    // 사용자에게 확인 메시지 표시
    if (!window.confirm("닉네임을 수정하시겠습니까?")) {
      return; // 사용자가 취소를 클릭하면 함수를 종료합니다.
    }

    if (nicknameCheckResult) {
      // 폼 요소를 이름으로 가져오기
      const nickname = document.querySelector('input[name="nickname"]').value;
      const obj = {};
      obj["nickname"] = nickname;
      obj["id"] = sessionStorage.getItem("memberId");

      try {
        const response = await axios.post(
          `${baseUrl}/member/updateNick`,
          obj
        );
        if (response.data.message === "회원정보수정이 완료되었습니다.") {
          sessionStorage.removeItem("memberNickname");
          sessionStorage.setItem("memberNickname", response.data.nickname);
          alert("닉네임이 수정되었습니다");
          window.location.reload();
        } else {
          console.error("회원정보수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    }
  };

  const [nicknameVisable, setNicknameVisable] = useState(false);

  const toggleNick = () => {
    setNicknameVisable(true);
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
        <div className={styles.profile_container}>
          <h2>회원정보</h2>
          <form onSubmit={updateSubmit}>
            <div className={styles.top_container}>
              <div className={styles.top_container_left}>
                <div>
                  <h4>닉네임</h4>
                  <div
                    className={styles.nickname_wrapper}
                    style={{ display: nicknameVisable ? "none" : "flex" }}
                  >
                    <h5>{memberInfo.nickname}</h5>
                    <div onClick={toggleNick}>닉네임 변경</div>
                  </div>

                  {nicknameVisable && (
                    <div className={styles.nickname_modify_wrapper}>
                      <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        name="nickname"
                        value={nickname}
                        onChange={nicknameCheck}
                        placeholder={sessionStorage.getItem("memberNickname")}
                      />
                      <button onClick={updateNickname}>수정완료</button>
                      <button
                        onClick={() => {
                          setNicknameVisable(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  )}

                  <div id="nickNameCheckmessage"></div>
                </div>

                <div>
                  <h4>비밀번호</h4>
                  <input
                    type="password"
                    placeholder="변경할 비밀번호를 입력해 주세요."
                    className="form-control"
                    name="pw"
                    id="pw"
                    Value={pw}
                    onChange={onPwHandler}
                    onInput={engNumPwCheck}
                  />
                  <div id="pWmessage" className={styles.warning_text}></div>
                </div>
                <div>
                  <h4>비밀번호 확인</h4>
                  <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해 주세요"
                    className="form-control"
                    name="pw_check"
                    id="pw_check"
                    Value={checkPw}
                    onChange={onCheckPwHandler}
                    onBlur={pwCheck}
                  />
                  <div
                    id="pWCheckmessage"
                    className={styles.warning_text}
                  ></div>
                </div>
              </div>
              <div className={styles.top_container_right}>
                <h4>프로필 사진 등록</h4>

                {/* 크로퍼 */}

                <div className="cropper_content">
                  <input
                    type="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                {/* 크로퍼 */}

                {/* 모달 */}

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>이미지 사이즈 조절</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {image && (
                      <div className="container">
                        <Cropper
                          ref={cropperRef}
                          aspectRatio={1} // 크롭 영역을 정사각형으로 제한
                          src={image}
                          viewMode={1}
                          width={800}
                          height={500}
                          background={false}
                          responsive
                          autoCropArea={1}
                          checkOrientation={false}
                          guides
                        />
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      취소
                    </Button>
                    <Button variant="primary" onClick={getCropData}>
                      이미지 저장
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* 모달 */}

                {/* 프사 부분 */}
                <div
                  className={styles.input_pic}
                  style={{ display: inputPicDisplay ? "block" : "none" }}
                >
                  <div className={styles.fake_upload}>
                    <Image
                      src={memberInfo.profileImg}
                      alt="프로필 미리보기"
                      roundedCircle
                    />
                  </div>
                  <div
                    className={styles.img_uploads_btn}
                    onClick={handleCropperClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-camera"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                  </div>
                  <div className={styles.preview_img}>
                    {croppedImage && (
                      <Image
                        src={croppedImage}
                        alt="프로필 미리보기"
                        roundedCircle
                      />
                    )}
                  </div>
                </div>
                {/* 프사 부분 */}
              </div>
            </div>
            <div className={styles.bottom_content}>
              <h4>소속 인증 상태</h4>
              <button className={styles.right_container_button}>
                {memberInfo.class == "미인증 회원"
                  ? "미인증"
                  : memberInfo.class}
              </button>
              <h4>학원생 인증</h4>
              <p>
                ITTY의 특정 서비스를 이용하기 위해서는 스마트인재개발원 소속
                인증이 필요합니다.
              </p>
              <div className={styles.certification_box}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shield-fill-exclamation"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4>소속 인증하기</h4>
                  <p>
                    수강 중인 강의실 본인 컴퓨터 상단의 부착된 이름표를 찍어서
                    첨부파일에 업로드해 주시면 담당자가 본인 여부를 확인 후
                    학원생으로 전환해 드립니다.
                  </p>
                </div>
              </div>
              {/* p태그로 이메일 주소남겨두기 */}
              <div className={styles.bottom_btn_group}>
                <button type="submit">
                  <p>수정 완료</p>
                </button>
                {/* 
                            <Link to="/">
                                <p>취소</p>
                            </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPage_profile;

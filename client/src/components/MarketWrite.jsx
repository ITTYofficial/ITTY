import React, { useContext, useEffect } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/MarketWrite.module.css";
import QuillTest from "./QuillTest";
import { useState } from "react";
import { useRef } from "react";
import { QuillContext } from "../context/QuillContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../css/Cropper.css";
import Button from 'react-bootstrap/Button';

const MarketWrite = () => {
  const [imgFiles, setImgFiles] = useState([]);
  const writer = sessionStorage.getItem("nickname");
  const imgRef = useRef();
  // 특정 게시글 조회하기 위한 id값 가져오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");


  // base64 -> formdata
  const handlingDataForm = async (dataURI) => {
    if (dataURI.length > 200) {
      console.log(dataURI.length);
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
      console.log(blob);
      const file = new File([blob], "image.jpg");
      console.log(file);
      // 위 과정을 통해 만든 image폼을 FormData에
      // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야함
      const formData = new FormData();
      formData.append("img", file);
      // formData.append("writer",nickname)
      try {
        const result = await axios.post(
          "http://localhost:8088/save/save",
          formData
        );
        console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);
        return result.data.url;
      } catch (error) {
        console.log("실패했어요ㅠ");
        console.log(error);
      }
    } else {
      return dataURI;
    }
  };


  //===== div클릭시 이미지 업로드 대리 클릭 및 업로드한 이미지 미리보기를 위한 문법 =====

  const { value, setValue } = useContext(QuillContext);

  // 경고메세지 출력을 위한 Ref
  const titleRef = useRef(null)
  const imgPathRef = useRef(null)
  const priceRef = useRef(null)
  const contentRef = useRef(null)
  const refList = {
    market_title: titleRef,
    imgPath: imgPathRef,
    market_price: priceRef,
    content: contentRef
  }
  let refVisible = false

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    formData.append("id", sessionStorage.getItem("memberId"));

    const obj = {};
    formData.forEach((value, key) => {
      console.log(`폼 요소 이름: ${key}, 값: ${value}`);
      obj[key] = value;
    });
    obj["content"] = value;
    obj["writer"] = sessionStorage.getItem("memberNickname");
    if (id) {
      obj["_id"] = id;
    }

    // 이미지를 서버에 업로드하고 URL을 받아오는 부분
    const imgPaths = await Promise.all(
      croppedImage.map(async (base64data) => {
        const result = await handlingDataForm(base64data);
        console.log("화기이이", result);
        return result;
      })
    );

    console.log("임패쓰", imgPaths);

    obj["imgPath"] = imgPaths;

    // 입력값 확인
    const inputRule = {
      market_title: /^.{2,255}$/,
      imgPath: /^.{1,65535}$/,
      market_price: /^.{1,255}$/,
      content: /^.{12,65535}$/
    };

    for (const key in refList) {
      const check = obj[key];
      if (!check || !inputRule[key].test(check)) {
        refList[key].current.textContent = "글자수 및 이미지 첨부를 확인해주세요."
        refList[key].current.style.color = "red";
        refVisible = true;
        if (!check) {
          if (key === "market_title") {
              refList[key].current.textContent = "제목을 입력해주세요.";
          } else if (key === "imgPath") {
              refList[key].current.textContent = "이미지를 첨부해주세요.";
          }else if (key === "market_price") {
            refList[key].current.textContent = "상품 가격을 입력해주세요.";
        }else if (key === "content") {
          refList[key].current.textContent = "상품 설명을 입력해주세요.";
      }
        }

        
      } else {
        refList[key].current.textContent = null;
      }
    }
    console.log(obj);

    if (refVisible) {
      alert('필수 입력 항목을 확인해주세요.')
      return;
    }

    axios
      .post("http://localhost:8088/market/write", obj)
      .then((res) => {
        alert("게시글이 등록되었습니다.");
        console.log(res);
        window.location.href = `/marketDetail/${res.data._id}`;
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성을 실패했습니다.");
        window.location.href = "/marketList";
      });
  };

  // 게시글정보 저장할 State
  const [marketDetail, setmarketDetail] = useState([]);

  // 수정 요청시 기존 게시글 데이터 가져올 함수
  const getMarket = async () => {
    if (id) {
      // projectRouter랑 통신해서 response에 결과값 저장
      await axios
        .get(`http://localhost:8088/market/marketDetail/${id}`)
        .then((res) => {
          console.log(res);
          setmarketDetail(res.data.detailMarket[0]);
          setValue(res.data.detailMarket[0].content);
          setCroppedImage(res.data.detailMarket[0].imgPath)
        });
      // respnse에서 데이터 꺼내서 State에 저장
    }
  };

  useEffect(() => {
    // const writer = sessionStorage.getItem('nickname');
    setValue(null);
    getMarket();
  }, []);

  const handleRemoveImage = (index) => {
    const updatedImgFiles = [...croppedImage];
    updatedImgFiles.splice(index, 1);
    setCroppedImage(updatedImgFiles);
  };

  /* 크로퍼 */
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState([]);

  /* 크로퍼 */
  const handleCropperClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // input 요소 초기화
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
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedImage((prev) => [...prev, croppedDataUrl]);
      setImage(null);
    }
    setShow(false);
  };


  console.log('크롭이미지 배열 확인', croppedImage);
  /* 크로퍼 */

  /* 모달 */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImage(null);
  }
  const handleShow = () => {
    /* setCroppedImage(null); */
    setShow(true);
    /* handleCropperClick(); */
  }

  /* 모달 */




  return (
    <div className={styles.right_container}>
      <h2>교환 장터🥕</h2>
      <form onSubmit={handleSubmit}>
        {/* 상품명 */}
        <div>
          <h4>상품명</h4>
          <div ref={titleRef}></div>
          <input
            className="form-control"
            type="text"
            name="market_title"
            style={{ marginTop: '2%' }}
            {...(id
              ? { defaultValue: marketDetail.title }
              : { placeholder: "상품명을 입력해주세요." })}
          />
        </div>

        {/* 상품 이미지 */}
        <div className={styles.market_pic}>
          <h4>상품 이미지</h4>
          <div ref={imgPathRef}></div>
          <div className={styles.input_pic}>
            {croppedImage.length < 3 && (
              <div className={styles.fake_upload} onClick={handleCropperClick}>
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
                <span>이미지 등록</span>
              </div>
            )}

            {/* 크로퍼 */}
            <input
              type="file"
              multiple
              ref={inputRef}
              style={{ display: "none" }}
              {...(croppedImage ? null : { required: true })}
              onChange={handleFileChange}
            />
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

            {croppedImage.map((img, index) => (
              <div className={styles.show_preview_img}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRemoveImage(index)}
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-dash-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
                <img key={index} src={img} alt={`이미지 ${index}`} />
              </div>
            ))}

          </div>
          <p>상품의 이미지는 1:1 비율로 보여집니다.</p>
        </div>

        <div>
          <h4>상품 가격</h4>
          <div ref={priceRef}></div>
          <input
            type="number"
            name="market_price"
            style={{ marginTop: '2%' }}
            {...(id
              ? { defaultValue: marketDetail.price }
              : { placeholder: "상품 가격을 입력해주세요." })}
            className="form-control"
          />
        </div>
        {/*           <div>
            <h4>판매 상태</h4>
            <select className='form-control' name="market_condition">
              <option value={0}>판매중</option>
              <option value={1}>판매완료</option>
            </select>
          </div>
 */}

        <div className={styles.market_content}>
          <h4 >상품 설명</h4>
          <div ref={contentRef} style={{ marginBottom: '2%' }} ></div>
          <QuillTest />
        </div>
        <input
          type="hidden"
          name={writer}
          value={sessionStorage.getItem("nickname")}
        />

        <div className={styles.button_group}>
          <button className={styles.cancel_btn} type="submit">
            취소
          </button>
          <button className={styles.submit_btn} type="submit">
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarketWrite;

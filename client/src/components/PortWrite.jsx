import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../css/PortWrite.module.css'
import axios from 'axios'
import QuillTest from './QuillTest';
import Button from 'react-bootstrap/Button';
import { PlayBoardContext } from '../context/PlayBoardContext';
import { useLocation } from 'react-router-dom';
import "cropperjs/dist/cropper.css";
import Modal from 'react-bootstrap/Modal';
import Cropper from "react-cropper";
import "../css/Cropper.css";

const PortWrite = () => {

  const [imgFiles, setImgFiles] = useState([]);

  // Quill value
  const { value, setValue } = useContext(PlayBoardContext);

  // 특정 게시글 조회하기 위한 id값 가져오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // 게시글 작성 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = {};
    formData.forEach((value, key) => {
      console.log(`폼 요소 이름: ${key}, 값: ${value}`);
      obj[key] = value;
    });
    obj["content"] = value;
    if (id) {
      obj["_id"] = id;
    }
    setImgFiles([imgFiles.join(';')]);
    obj["imgPath"] = imgFiles;
    console.log(obj);
    axios
      .post("http://localhost:8088/port/write", obj)
      .then((res) => {
        alert("게시글이 등록되었습니다.");
        console.log(res);
        window.location.href = `/portDetail/${res.data._id}`
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패");
        window.location.href = `/portList`
      });
  };

  // 게시글정보 저장할 State
  const [portDetail, setPortDetail] = useState([]);

  // 수정 요청시 기존 게시글 데이터 가져올 함수
  const getPort = async () => {
    if (id) {
      // projectRouter랑 통신해서 response에 결과값 저장
      await axios
        .get(`http://localhost:8088/port/portDetail/${id}`)
        .then((res) => {
          console.log(res);
          setPortDetail(res.data.detailPort[0]);
          setValue(res.data.detailPort[0].content);
        });
      // respnse에서 데이터 꺼내서 State에 저장
    }
  };

  useEffect(() => {
    setValue(null);
    getPort();
  }, []);

  /* 이미지 크롭 스크립트 */
  const [inputPicDisplay, setInputPicDisplay] = useState(true);

  /* 크로퍼 */
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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
      setInputPicDisplay(false);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      setImage(null);
    }
    setShow(false);
  };

  const handleCancelCrop = () => {
    setImage(null);
    setInputPicDisplay(true); // 이미지 입력을 취소하면 display를 다시 block으로 변경
  };

  /* 크로퍼 */

  useEffect(() => {
    if (croppedImage !== null) {
      const fakeUpload = document.querySelector(`.${styles.fake_upload}`);
      setInputPicDisplay(true);
      fakeUpload.style.display = 'none';
    }
  }, [croppedImage]);

  /* 모달 */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImage(null);
    setInputPicDisplay(true);

  }
  const handleShow = () => {
    /* setCroppedImage(null); */
    setShow(true);
    /* handleCropperClick(); */
  }

  /* 모달 */


  return (

    <div className={styles.Main_container}>
      <h2>포트폴리오 🎨</h2>
      <form onSubmit={handleSubmit}>
        <h4>제목</h4>
        <input className="form-control" type="text" name='title' placeholder='제목을 입력해주세요' />
        <h4>포트폴리오 대표 이미지</h4>
        <div className={styles.market_pic}>
          <div className={styles.input_pic}>
            <div
              className={styles.fake_upload}
              onClick={handleCropperClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
              </svg>
              <span>이미지 등록</span>
            </div>
            {/* 크로퍼 */}

            <div className='cropper_content'>
              <form>
                <input
                  type="file"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </form>
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
                      aspectRatio={1.86} // 크롭 영역을 정사각형으로 제한
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
            <div className={styles.preview_img}>
              {croppedImage && (
                <img src={croppedImage} alt="" />
              )}
            </div>

          </div>
        </div>

        <h4>내용</h4>
        <div className={styles.quill_div}>
          <QuillTest />
        </div>

        {/* 전송 버튼 */}
        <div className={styles.button_group}>
          <button className={styles.cancel_btn} type='submit'>
            취소
          </button>
          <button className={styles.submit_btn} type='submit'>
            작성
          </button>
        </div>
      </form>
    </div>

  )
}

export default PortWrite
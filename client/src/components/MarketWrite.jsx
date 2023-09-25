import React, { useContext, useEffect } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/MarketWrite.module.css";
import QuillTest from "./QuillTest";
import { useState } from "react";
import { useRef } from "react";
import { QuillContext } from "../context/QuillContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const MarketWrite = () => {
  const [imgFiles, setImgFiles] = useState([]);
  const imgRef = useRef();
  const writer = sessionStorage.getItem('nickname');
  // 특정 게시글 조회하기 위한 id값 가져오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const handleFakeUploadClick = () => {
    // 파일 입력 엘리먼트에서 클릭 이벤트를 트리거합니다.
    if (imgRef.current) {
      imgRef.current.click();
      console.log("Click check");
    }
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files.length > 0) {
      let file = imgRef.current.files[0];
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png"
      ) {
        alert("jpg, jpeg, png 이미지 파일만 업로드가 가능합니다.");
        file = null;
      } else {
        console.log(file.type);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          if (imgFiles.length >= 3) {
            alert("최대 3개의 이미지 등록이 가능합니다.");
            console.log(imgFiles); // 3개 이상 등록시 alert 메세지
          } else {
            const base64data = reader.result;
            // formData 만드는 함수
            handlingDataForm(base64data);
          }
        };
      }
    }
  };

  // base64 -> formdata
  const handlingDataForm = async (dataURI) => {
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
      setImgFiles([...imgFiles, result.data.url]); // 새 이미지를 배열에 추가
    } catch (error) {
      console.log("실패했어요ㅠ");
      console.log(error);
    }
  };

  //===== div클릭시 이미지 업로드 대리 클릭 및 업로드한 이미지 미리보기를 위한 문법 =====

  const { value, setValue } = useContext(QuillContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    formData.append('id', sessionStorage.getItem('memberId'));

    const obj = {};
    formData.forEach((value, key) => {
      console.log(`폼 요소 이름: ${key}, 값: ${value}`);
      obj[key] = value;
    });
    obj["content"] = value;
    obj["writer"] = sessionStorage.getItem('memberNickname');
    if (id) {
      obj["_id"] = id;
    }
    setImgFiles([imgFiles.join(';')]);
    obj["imgPath"] = imgFiles;
    console.log(obj);
    axios
      .post("http://localhost:8088/market/write", obj)
      .then((res) => {
        alert("게시글이 등록되었습니다.");
        console.log(res);
        window.location.href = `/marketDetail/${res.data._id}`
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패");
        window.location.href = "/marketList"
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
        });
      // respnse에서 데이터 꺼내서 State에 저장
    }
  };

  useEffect(() => {
    // const writer = sessionStorage.getItem('nickname');
    setValue(null);
    getMarket();
  }, []);

  // 수정 요청시 데이터 가져오는거 까지 완료했고 이제 반영만 해주면 된다

  return (
    <div className={styles.right_container}>
      <h2>교환 장터🥕</h2>
      <form onSubmit={handleSubmit}>
        {/* 상품명 */}
        <div>
          <h4>상품명</h4>
          <input
            className="form-control"
            type="text"
            name="market_title"
            {...(id ? { defaultValue: marketDetail.title } : { placeholder: "상품명을 입력해주세요." })}
          />
        </div>

        {/* 상품 이미지 */}
        <div className={styles.market_pic}>
          <h4>상품 이미지</h4>
          <div className={styles.input_pic}>
            <div
              className={styles.fake_upload}
              onClick={handleFakeUploadClick}
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
              <span>이미지 등록</span>
            </div>
            <input
              type="file"
              className={styles.real_upload}
              accept="image/*"
              required
              multiple
              onChange={saveImgFile}
              ref={imgRef}
            />

            {imgFiles.map((img, index) => (
              <img key={index} src={img} alt={`이미지 ${index}`} />
            ))}
          </div>
          <p>상품의 이미지는 1:1 비율로 보여집니다.</p>
        </div>


        <div>
          <h4>상품 가격</h4>
          <input
            type="number"
            name="market_price"
            {...(id ? { defaultValue: marketDetail.price } : { placeholder: "상품 가격을 입력해주세요." })}
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
          <h4>상품 설명</h4>
          <QuillTest />
        </div>
        <input type="hidden" name={writer} value={sessionStorage.getItem('nickname')} />

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



  );
};

export default MarketWrite;

import React, { useContext } from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/MarketWrite.module.css";
import QuillTest from "./QuillTest";
import { useState } from "react";
import { useRef } from "react";
import { PlayBoardContext } from "../context/PlayBoardContext";
import axios from "axios";

const MarketWrite = () => {
  const fileInputRef = useRef(null);
  const [imgFiles, setImgFiles] = useState([]);
  const imgRef = useRef();

  const handleFakeUploadClick = () => {
    // 파일 입력 엘리먼트에서 클릭 이벤트를 트리거합니다.
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("Click check");
    }
  };

  /*   const saveImgFile = (fileBlob) => {
      // let file = e.target.files[0];
  
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImgFile(reader.result);
          console.log("확인 ", imgFile);
          resolve();
        };
      });
    }; */

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFiles([...imgFiles, reader.result]); // 새 이미지를 배열에 추가
    };
  };

  const { value, setValue } = useContext(PlayBoardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = {};
    formData.forEach((value, key) => {
      console.log(`폼 요소 이름: ${key}, 값: ${value}`);
      obj[key] = value;
    });
    obj['content'] = value;

    axios.post('http://localhost:8088/market/write', obj)
      .then((res) => {
        alert("게시글이 등록되었습니다.")
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 작성 실패")
      })

  }

  return (
    <div className={styles.Main_container}>
      <LeftContainer />

      <div className={styles.right_container}>
        <h2>교환 장터🛒</h2>
        <form onSubmit={handleSubmit}>
          {/* 상품명 */}
          <div>
            <h4>상품명</h4>
            <input
              type="text"
              name="market_title"
              placeholder="상품명을 입력해주세요."
            />
          </div>

          {/* 상품 이미지 */}
          <div className={styles.market_pic}>
            <h4>상품 이미지</h4>
            <div className={styles.input_pic}>
              <input
                type="file"
                className={styles.real_upload}
                accept="image/*"
                required
                multiple
                ref={fileInputRef}
                onChange={(e) => {
                  saveImgFile(e.target.files[0]);
                }}
              />
              <div
                className={styles.fake_upload}
                onClick={handleFakeUploadClick}
                style={{ backgroundImage: `${imgFiles}` }}
              ></div>
            </div>
            <p>상품의 이미지는 1:1 비율로 보여집니다.</p>
          </div>

          <div lassName={styles.market_pic}>
            <input
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={saveImgFile}
              ref={imgRef}
            />

            {imgFiles.map((img, index) => (
              <img key={index} src={img} alt={`이미지 ${index}`} />
            ))}


          </div>

          <div className={styles.market_sale}>
            <div>
              <h4>상품 가격</h4>
              <input
                type="number"
                name="market_price"
                placeholder="상품 가격을 입력해주세요."
              />
            </div>
            <div>
              <h4>판매 상태</h4>
              <select name="market_condition">
                <option value={0}>판매중</option>
                <option value={1}>판매완료</option>
              </select>
            </div>
          </div>

          <div className={styles.market_content}>
            <h4>상품 설명</h4>
            <QuillTest />
          </div>

          <button className={styles.market_button} type="submit">
            작성 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketWrite;

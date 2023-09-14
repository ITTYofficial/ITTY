import React from "react";
import LeftContainer from "./LeftContainer";
import styles from "../css/MarketWrite.module.css";
import QuillTest from "./QuillTest";
import { useState } from "react";
import { useRef } from "react";

const MarketWrite = () => {
  const fileInputRef = useRef(null);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handleFakeUploadClick = () => {
    // 파일 입력 엘리먼트에서 클릭 이벤트를 트리거합니다.
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("Click check");
    }
  };

  const saveImgFile = (fileBlob) => {
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
  };

  return (
    <div className={styles.Main_container}>
      <LeftContainer />

      <div className={styles.right_container}>
        <h2>교환 장터🛒</h2>
        <form>
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
                style={{ backgroundImage: `${imgFile}` }}
              ></div>
            </div>
            <p>상품의 이미지는 1:1 비율로 보여집니다.</p>
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
                <option value="ing">판매중</option>
                <option value="end">판매완료</option>
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

import React, { useRef, useState } from 'react'
import styles from '../css/PortWrite.module.css'
import axios from 'axios'
import QuillTest from './QuillTest';
import 'bootstrap/dist/css/bootstrap.min.css';

const PortWrite = () => {

  const [imgFiles, setImgFiles] = useState([]);
  const imgRef = useRef();

  const handleFakeUploadClick = () => {
    // 파일 입력 엘리먼트에서 클릭 이벤트를 트리거합니다.
    if (imgRef.current) {
      imgRef.current.click();
      console.log("Click check");
    }
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {

    let file = imgRef.current.files[0];

    console.log(file.type);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

      const base64data = reader.result;
      // formData 만드는 함수
      handlingDataForm(base64data);
      setImgFiles([...imgFiles, reader.result]); // 새 이미지를 배열에 추가

    };



    // 이미지를 업로드한 후에 fake 업로드 버튼을 숨기기 위해 아래 코드 추가
    if (imgRef.current && imgRef.current.files.length > 0) {
      const fakeUpload = document.querySelector(`.${styles.fake_upload}`);
      fakeUpload.style.display = 'none';
    }
  };

  // base64 -> formdata
  const handlingDataForm = async dataURI => {
    // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
    const byteString = atob(dataURI.split(",")[1]);

    // Blob를 구성하기 위한 준비, 잘은 모르겠음.. 코드존나어려워
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg"
    });
    const file = new File([blob], "image.jpg");

    // 위 과정을 통해 만든 image폼을 FormData에
    // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야함
    const formData = new FormData();
    formData.append("img", file);

    try {
      const result = await axios.post(
        "http://localhost:8088/play/save",
        formData
      );
      console.log("성공 시, 백엔드가 보내주는 데이터", result.data.url);

    } catch (error) {
      console.log("실패했어요ㅠ");
      console.log(error);
    }
  };


  return (
    <div className={styles.Main_container}>
      <h2>포트폴리오</h2>
      <form action="">
        <p>제목</p>
        <input className="form-control" type="text"placeholder='제목을 입력해주세요' />
        <p>포트폴리오 대표 이미지</p>
        <div className={styles.market_pic}>
          <div className={styles.input_pic}>
            <div
              className={styles.fake_upload}
              onClick={handleFakeUploadClick}
            >
              <img
                src="https://i.ibb.co/CPgb566/image.png"
                alt="upload"
              />
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
        </div>

        <p>내용</p>
        <QuillTest />

      </form>

    </div>
  )
}

export default PortWrite
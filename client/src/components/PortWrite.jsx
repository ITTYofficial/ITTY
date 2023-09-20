import React, { useRef, useState } from 'react'
import styles from '../css/PortWrite.module.css'
import axios from 'axios'
import QuillTest from './QuillTest';
import Button from 'react-bootstrap/Button';

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
        "http://localhost:8088/save/save",
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
        <input className="form-control" type="text" placeholder='제목을 입력해주세요' />
        <p>포트폴리오 대표 이미지</p>
        <div className={styles.market_pic}>
          <div className={styles.input_pic}>
            <div
              className={styles.fake_upload}
              onClick={handleFakeUploadClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
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
        </div>

        <p>내용</p>
        <QuillTest />

        {/* 전송 버튼 */}
        <button className={styles.submit_btn} type='submit'>
          작성완료
        </button>

      </form>

    </div>
  )
}

export default PortWrite
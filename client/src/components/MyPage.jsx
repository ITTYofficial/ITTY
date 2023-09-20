import React, { useRef, useState } from 'react'
import styles from '../css/MyPage.module.css'
import axios from 'axios'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

const MyPage = () => {

    /* 프사 스크립트 */
    const [imgFiles, setImgFiles] = useState(null);
    const imgRef = useRef();


    const handleFakeUploadClick = () => {
        // 파일 입력 엘리먼트에서 클릭 이벤트를 트리거합니다.
        if (imgRef.current) {
            imgRef.current.click();
        }
    };

    // 이미지 업로드 input의 onChange
    const saveImgFile = () => {

        let file = imgRef.current.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64data = reader.result;
            // formData 만드는 함수
            handlingDataForm(base64data);
            setImgFiles(reader.result); // 새 이미지를 배열에 추가


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
            console.log(error);
        }
    };

    /* 프사 스크립트 */

    return (
        <div className={styles.Main_container}>
            <h2>마이페이지</h2>
            <div className={styles.top_container}>
                <div className={styles.top_container_left}>
                    <form action="">
                        <h4>닉네임</h4>
                        <input type="text" className="form-control" />
                        <h4>비밀번호</h4>
                        <input type="text" placeholder='변경할 비밀번호를 입력해 주세요.' className="form-control" />
                        <h4>비밀번호 확인</h4>
                        <input type="text" placeholder='비밀번호를 한번 더 입력해 주세요' className="form-control" />
                    </form>
                </div>
                <div className={styles.top_container_right}>
                    <h4>프로필 등록</h4>

                    {/* 프사 부분 */}
                    <div className={styles.input_pic}>
                        <div className={styles.fake_upload}>
                            <Image src='https://i.ibb.co/XsypSbQ/profile-01.png' alt='프로필 미리보기' roundedCircle />
                        </div>
                        <div className={styles.img_uploads_btn}
                            onClick={handleFakeUploadClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg>
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
                        <div className={styles.preview_img}>
                            {imgFiles && (
                                <Image src={imgFiles} alt='프로필 미리보기' roundedCircle />
                            )}
                        </div>
                    </div>
                    {/* 프사 부분 */}
                </div>
            </div>
            <div className={styles.bottom_content}>
                <h4>소속 인증 상태</h4>
                <button className={styles.right_container_button}>미인증</button>
                <h4>학원생 인증</h4>
                <p>ITTY의 특정 서비스를 이용하기 위해서는 스마트인재개발원 소속 인증이 필요합니다.</p>
                <form>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-exclamation" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                        <div>
                            <h4>소속 인증하기</h4>
                            <p>수강 중인 강의실 본인 컴퓨터 상단의 부착된 이름표를 찍어서 첨부파일에 업로드해 주시면 담당자가 본인 여부를 확인 후 학원생으로 전환해 드립니다.</p>
                        </div>
                    </div>
                    <input type="file" className="form-control" />
                </form>
            </div>
            <div className={styles.bottom_btn_group}>
                <Link >
                    <p>수정</p>
                </Link>
                <Link >
                    <p>취소</p>
                </Link>
            </div>
        </div>
    )
}

export default MyPage
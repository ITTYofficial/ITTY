import React, { useContext, useEffect, useState } from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { QuillContext } from '../context/QuillContext';

const PlayBoardWrite = () => {

    // 특정 게시글 조회하기 위한 id값 가져오기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const nickname = sessionStorage.getItem("memberNickname");
    const { value, setValue } = useContext(QuillContext);
    console.log("id :", id);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('writer', nickname);
        formData.append('id', sessionStorage.getItem('memberId'));
        console.log(e.target);

        const obj = {};
        formData.forEach((value, key) => {
            console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['content'] = value;
        if (id) {
            obj['_id'] = id
        }

        await axios.post('http://localhost:8088/play/write', obj)
            .then((res) => {
                alert("글 작성 완료")
                window.location.href = `/playboardDetail/${res.data._id}`
            }).catch((err) => {
                alert("작성에 실패했습니다.")
                window.location.href = "/playboardList"
            })
    }

    // 게시글정보 저장할 State
    const [playDetail, setPlayDetail] = useState([]);

    // 수정 요청시 기존 게시글 데이터 가져올 함수
    const getPlay = async () => {
        if (id) {
            // projectRouter랑 통신해서 response에 결과값 저장
            await axios.get(`http://localhost:8088/play/playboardDetail/${id}`)
                .then((res) => {
                    console.log(res);
                    setPlayDetail(res.data.detailPlay[0]);
                    setValue(res.data.detailPlay[0].content)
                });
            // respnse에서 데이터 꺼내서 State에 저장
        }
    };

    useEffect(() => {
        setValue(null);
        getPlay();
    }, []);


    return (
            <div className={style.Main_container}>
                <h2>자유게시판 ⚽</h2>
                <div className={style.right_container}>
                    <form onSubmit={handleSubmit}>
                        <h4>제목</h4>
                        <input
                            className="form-control"
                            type="text"
                            name='title'
                            {...(id ? { defaultValue: playDetail.title } : { placeholder: '제목을 입력해주세요' })} />
                        <h4>본문</h4>
                        <div className={style.quill_div}>
                            <QuillTest />
                        </div>
                        {/* 전송 버튼 */}
                        <div className={style.button_group}>
                            <button className={style.cancel_btn} type='submit'>
                                취소
                            </button>
                            <button className={style.submit_btn} type='submit'>
                                작성
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default PlayBoardWrite
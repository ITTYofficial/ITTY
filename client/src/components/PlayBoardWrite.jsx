import React, { useContext, useEffect, useState } from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';
import { PlayBoardContext } from '../context/PlayBoardContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PlayBoardWrite = () => {

        // // 특정 게시글 조회하기 위한 id값 가져오기
    // const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const { value, setValue } = useContext(PlayBoardContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const obj = {};
        formData.forEach((value, key) => {
            // console.log(`폼 요소 이름: ${key}, 값: ${value}`);
            obj[key] = value;
        });
        obj['content'] = value;
        if(id){
            obj['_id'] = id
        }

        await axios.post('http://localhost:8088/play/write', obj)
            .then((res) => {
                alert("글 작성 완료")
                window.location.href = "/playboardList"
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
            getPlay();
        }, []);
    

    return (
        <div className={style.Main_container}>
            <LeftContainer />
            <div className={style.right_container}>
                <form onSubmit={handleSubmit}>
                    <p>제목</p>
                    {id? <input type="text" name='title' defaultValue={playDetail.title}/> : <input type="text" name='title' />}
                    <p>본문</p>
                    <QuillTest />
                    <input type="submit" value="전송" />
                </form>
            </div>
        </div>
    )
}

export default PlayBoardWrite
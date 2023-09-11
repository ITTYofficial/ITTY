import React, { useContext } from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';
import { PlayBoardContext } from '../context/PlayBoardContext';
import axios from 'axios';

const PlayBoardWrite = () => {

    const { value } = useContext(PlayBoardContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8088/play/write', {
            title: e.target[0].value,
            content: value
        })
        console.log(response);
        if(response.data.message) {
            alert("글 작성 완료")
            window.location.href = "/playboardList"
        }else{
            alert("작성에 실패했습니다.")
            window.location.href = "/playboardList"
        }
    }

    return (
        <div className={style.Main_container}>
            <LeftContainer />
            <div className={style.right_container}>
                <form onSubmit={handleSubmit}>
                    <p>제목</p>
                    <input type="text" name='title' />
                    <p>본문</p>
                    <QuillTest />
                    <input type="submit" value="전송" />
                </form>
            </div>
        </div>
    )
}

export default PlayBoardWrite
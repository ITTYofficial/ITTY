import React from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';

const PlayBoardWrite = () => {
    return (
        <div className={style.Main_container}>
            <LeftContainer />
            <div className={style.right_container}>
                <form>
                    <p>제목</p>
                    <input type="text" />
                    <p>본문</p>
                    <QuillTest />
                </form>
            </div>
        </div>
    )
}

export default PlayBoardWrite
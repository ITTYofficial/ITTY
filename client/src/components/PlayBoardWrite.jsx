import React, { useContext } from 'react'
import QuillTest from './QuillTest'
import style from "../css/PlayBoardWrite.module.css";
import LeftContainer from './LeftContainer';
import { PlayBoardContext } from '../context/PlayBoardContext';

const PlayBoardWrite = () => {

    const {value} = useContext(PlayBoardContext)

    return (
        <div className={style.Main_container}>
            <LeftContainer />
            <div className={style.right_container}>
                <form action='http://localhost:8088/project/write' method='post'>
                    <p>제목</p>
                    <input type="text" name='title'/>
                    <p>본문</p>
                    <QuillTest />
                    <input type="hidden" name="value" value={value}/>
                    <input type="submit" value="전송" />
                </form>
            </div>
        </div>
    )
}

export default PlayBoardWrite
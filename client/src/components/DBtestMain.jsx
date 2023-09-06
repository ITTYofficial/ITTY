import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DBtestMain = () => {

    const [studyList, setStudyList] = useState([]);

    // 게시글 리스트 조회함수
    const updateData = async () => {
        const response = await axios.get("http://localhost:8088/study/studylist");
        console.log('response 어떻게오는지 확인', response);
        setStudyList(response.data.study);
    };


    // 삭제 하고나서 다시 조회하기 위해 useEffect 분리했음
    useEffect(() => {
        updateData();
    }, []);

    // 게시글 삭제 함수
    const deleteData = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8088/study/delete/${id}`);
            if (response.data.message) {
                // 삭제가 성공하면 게시글 목록을 다시 불러옴
                updateData();
            } else {
                console.log('삭제 실패');
            }
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
        }
    };




    return (
        <div>
            <h1>게시글조회</h1>
            {studyList.map((item) => (
                <div key={item._id}>
                    <div>작성자 : {item.writer}</div>
                    <div>제목 : <Link to={`/detail/${item._id}`}> {item.title}</Link></div>
                    <div>작성일자 : {item.createdAt}</div>
                    <button onClick={() => deleteData(item._id)}>삭제</button>
                </div>

            ))};


            <a href='./write'>게시글 업로드</a>

        </div>
    )
}

export default DBtestMain
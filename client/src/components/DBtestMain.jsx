import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DBtestMain = () => {

    const [boardList, setBoardList] = useState([]);

    const updateData = async () => {
        const response = await axios.get("http://localhost:8088/board/detail");
        console.log('response 어떻게오는지 확인', response);
        setBoardList(response.data.board);
    };

    useEffect(() => {
        updateData();
    }, []);




    return (
        <div>
            <h1>게시글조회</h1>
            {boardList.map((item) => (
                <div key={item.createdAt}>
                    <div>{item.writer}</div>
                    <div>{item.title}</div>
                    <div>{item.contet}</div>
                    <div>{item.createdAt}</div>
                </div>

            ))};


            <a href='./write'>게시글 업로드</a>

        </div>
    )
}

export default DBtestMain
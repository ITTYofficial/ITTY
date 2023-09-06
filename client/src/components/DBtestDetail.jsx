import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DBtestDetail = () => {
    const [detailBoard, setDetailBoard] = useState([]);
    
    // 받아온 id값 저장
    const { id } = useParams();

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 토글 상태 변수
    const [editedContent, setEditedContent] = useState(""); // 수정한 내용을 저장하는 상태 변수

    const updateData = async () => {
        console.log('id확인', id);
        const response = await axios.get(`http://localhost:8088/study/detail/${id}`);
        console.log('response 데이터 형태 확인 ', response);
        setDetailBoard(response.data.detailBoard[0])
        console.log(detailBoard);
    };

    useEffect(() => {
        updateData();
    }, []);

    
    const handleEditClick = () => {
        setIsEditing(true); // 수정 버튼 클릭 시 수정 모드로 변경
        setEditedContent(detailBoard.content); // 수정할 내용을 현재 내용으로 초기화
    };

    const handleSaveClick = async () => {
        try {
            // 수정 내용을 서버에 전송하고 저장
            console.log('editedContent 확인', editedContent);
            const response = await axios.post(`http://localhost:8088/study/update/${id}`, {
                content: editedContent
            });

            if (response.data.message) {
                // 수정이 성공하면 수정 모드 종료
                setIsEditing(false);
                updateData();
            } else {
                console.log('수정 실패');
            }
        } catch (error) {
            console.error('수정 중 오류 발생:', error);
        }
    };


    return (
        <div>
            <h1>게시글 상세조회</h1>

            <div>작성자 : {detailBoard.writer}</div>
            <div>제목 : {detailBoard.title}</div>
            {isEditing ? (
                <div>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>수정 완료</button>
                </div>
            ) : (
                <div>내용 : {detailBoard.content}</div>
            )}

            {isEditing ? (
                <button onClick={() => setIsEditing(false)}>취소</button>
            ) : (
                <button onClick={handleEditClick}>수정</button>
            )}
        </div>
    )
}

export default DBtestDetail
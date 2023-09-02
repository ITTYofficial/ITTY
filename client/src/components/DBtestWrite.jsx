import React, { useState } from 'react';
import axios from 'axios';

const DBtestWrite = () => {
  const [board, setBoard] = useState({
    writer: '',
    title: '',
    content: '',
  });

  const { writer, title, content } = board; // 변수를 추출하여 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoard({ ...board, [name]: value });
  };


  // 게시글 업로드 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('보드 잘 찍혔나 확인'. board);
      const response = await axios.post("http://localhost:8088/board/write", board);
      if (response.data.message === "게시글이 업로드 되었습니다.") {
        // 성공적으로 삽입되면 리다이렉트 또는 다른 작업 수행
      } else {
        // 오류 처리
        console.error("삽입에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }

  };

  return (
    <div>
      <h1>글 작성</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="writer">작성자</label>
          <input
            type="text"
            id="writer"
            name="writer"
            value={writer}
            onChange={handleChange} // 입력값이 변경될 때 상태 업데이트
          />
        </div>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default DBtestWrite;

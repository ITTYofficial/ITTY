import React, { useState } from 'react'
import style from "../css/PortDetail.module.css";
import LeftContainer from './LeftContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

const PortDetail = () => {

  const CommentItem = () => (
    <div className={style.comment_list}>
      <div className={style.play_comment_profile}>
        <span>
          <Image
            src="https://i.pinimg.com/736x/24/d2/97/24d2974e5cd0468587422e38c8aab210.jpg"
            roundedCircle
          />
        </span>
        <span>
          <p>빅데이터분석</p>
          <h4>수업시간에롤</h4>
        </span>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
      <div>
        <p>
          데이터디자인반 프론트엔드 희망하는 26살입니다.
          <br />
          같이하면 재밋게 열심히 잘 할수 있을것같아요. 연락처는 쪽지로
          보내드렸습니다.
          <br />
          확인하시고 연락부탁드려요~!
        </p>
      </div>
      {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

      <div>
        <p>3시간 전</p>
      </div>
    </div>
  );

  /* 수정삭제 버튼 */

  const [meat, setMeat] = useState(false);

  const Dropdown = () => (
    <div className={style.meat_dropdown}>
      <li >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
        <span>수정</span>
      </li>
      <li >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
        <span>삭제</span>
      </li>
    </div>
  );

  const toggleMeat = () => {
    setMeat(!meat);
  }

  /* 수정삭제 버튼 */

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container} onClick={toggleMeat}>
        <h4>여행을 만들다 Travel Maker</h4>
        <div className={style.top_container}>
          <div className={style.top_container_sub}>
            <div className={style.profile_img}>
              <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
            </div>
            <div>
              <p>빅데이터분석반</p>
              <p>언제취뽀</p>
            </div>
          </div>
          <div>
            <p>1시간 전 👁‍🗨 28 💬 4</p>
          </div>
        </div>

        <div className={style.middle_container}>
          <img src='https://user-images.githubusercontent.com/134493617/258963418-f73bb436-ca06-457d-b728-ad3673d5f0fe.png'></img>

        </div>

        {/* 글 내용 부분 */}
        <div className={style.meatball}>
          <ul>
            <svg onClick={() => { setMeat(!meat) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
            {meat && <Dropdown />}
          </ul>
        </div>


        <div>
          <p>내용들어갈 부분입니다</p>
          <p>내용들어갈 부분입니다</p>
          <p>내용들어갈 부분입니다</p>
          <p>내용들어갈 부분입니다</p>
          <p>내용들어갈 부분입니다</p>

        </div>

        <div className={style.division_line_comment}>
          <div>
            <h4>댓글 3</h4>
          </div>
        </div>

        <div className={style.comment_write}>
          <div>
            <div>
              <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
            </div>
            <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
          </div>
          <button type="button">댓글쓰기</button>
        </div>

        <CommentItem />
        <CommentItem />
        <CommentItem />

      </div>
    </div>
  )
}

export default PortDetail
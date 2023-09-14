import React from 'react'
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

  return (
    <div className={style.Main_container}>
      <LeftContainer />
      <div className={style.right_container}>
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
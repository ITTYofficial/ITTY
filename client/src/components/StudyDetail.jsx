import React from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/StudyDetail.module.css";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";

const StudyDetail = () => {

    /* 키워드 컴포넌트 */
    const Type = () => (
        <span className={`${style.play_title} ${style.type}`}>
            스터디✍️
        </span>
    );
    const Purpose = () => (
        <span className={`${style.play_title} ${style.purpose}`}>
            코딩테스트 대비📖
        </span>
    );
    const Deadline = () => (
        <span className={`${style.play_title} ${style.deadline}`}>
            마감❌
        </span>
    );
    /* 키워드 컴포넌트 */


    /* 댓글 컴포넌트 */
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
    /* 댓글 컴포넌트 */



    return (
        <div className={style.Main_container}>
            <LeftContainer />
            {/* 아래 쪽에 projectDetail에서 꺼내쓰는 부분은 위 State에서 꺼내는 부분입니당 */}
            <div className={style.right_container}>
                <div className={style.division_line}>
                    <div className={style.division_top_line}>
                        <Link>Community🌐</Link>
                        <Link to={'/studyList'}>스터디 구해요🐣</Link>
                    </div>
                </div>
                <div>
                    <div className={style.keyworld_buttons}>
                        <Type />
                        <Purpose />
                        <Deadline />
                    </div>
                    <div className={style.Top_container}>

                        <div>
                            <h3>코딩테스트 같이 공부하실분</h3>
                            <p>모집기간 : 💌</p>
                            <p>모집인원 : 명</p>
                        </div>

                        <div className={style.Top_right_container}>
                            <p>데이터디자인</p>
                            <p>수업중몰래롤</p>
                        </div>
                        <div className={style.Profile_img}>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                    </div>
                    <p>조회수 : 25 댓글수 : 10</p>

                    <hr />
                    <div className={style.Detail_content}>
                        <p>내용들어갈부분</p>
                    </div>

                    <div className={style.division_line}>
                        <div>
                            <p>댓글 3</p>
                        </div>
                    </div>
                    <div className={style.comment_write}>
                        <div>
                            <div>
                                <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                            </div>
                            <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
                        </div>
                        <Button variant="outline-primary">댓글쓰기</Button>{' '}
                    </div>

                    {/* 댓글부분 */}
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    {/* 댓글부분 */}



                </div>
            </div>
        </div>
    )
}

export default StudyDetail
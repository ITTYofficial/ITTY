import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styles from "../css/QnaCommentItem.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { QuillContext } from '../context/QuillContext';

const QnaCommentItem = ({ props, postId, boardType }) => {

    /* QnaCommentItem입니다. 채택 버튼으로 따로 관리합니다! */

    // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
    const { getComment, deleteComment, deleteReComment, reCoValue, setReCoValue } =
        useContext(QuillContext);

    // 좋아요 기능
    const [like, setLike] = useState(props.liker.length)
    const handleLike = async () => {
        let obj = {
            commentId: props._id,
            userId: sessionStorage.getItem('memberId'),
        }
        await axios.post('http://localhost:8088/comment/commentLike', obj)
            .then((res) => {
                console.log(res);
                setLike(res.data.liker.length)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // 채택 기능
    const handleSelection = async () => {
        let obj = {
            commentId: props._id,
            postId: postId
        }
        await axios.post('http://localhost:8088/comment/commentSelection', obj)
            .then((res) => {
                console.log(res);
            })
    }

    // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
    const getTime = (dateString) => {
        const createdAt = new Date(dateString);
        const now = new Date();
        const timeDifference = now - createdAt;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(hoursDifference / 24);

        if (daysDifference === 0) {
            if (hoursDifference === 0) {
                return "방금 전";
            } else {
                return `${hoursDifference}시간 전`;
            }
        } else {
            return `${daysDifference}일 전`;
        }
    };

    // 대댓글 작성완료 시 호출되는 함수
    function reCommentSubmit(event, _id) {
        event.preventDefault();
        console.log(_id);
        const createdAt = new Date().toISOString();
        const obj = {
            id: sessionStorage.getItem("memberId"),
            writer: sessionStorage.getItem("memberNickname"),
            content: reCoValue,
            commentId: _id,
            createdAt: createdAt,
            boardType: boardType
        };
        console.log(obj);

        axios.post('http://localhost:8088/comment/reWrite', obj)
            .then((res) => {
                alert("댓글이 등록되었습니다.")
                console.log(res);
                getComment(postId);
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성 실패")
            })
    }

    // 대댓글 내용 담을 State
    const [reComment, setReComment] = useState();

    // 대댓글 내용 가져오는 함수
    const reCommentChange = (e) => {
        setReComment(e.target.value);
        console.log(e.target.value);
    }

    // 대댓글 작성 칸 출력 조절 State
    const [recommentVisible, setRecommentVisible] = useState(false);

    // 대댓글 작성 칸 함수
    const showRecommentWrite = () => {
        setRecommentVisible(!recommentVisible);
    }



    // 대댓글 컴포넌트
    const ReComment = ({ commentId, props, index }) => {

        return (
            <div className={styles.recomment_list_box}>
                <div className={styles.play_recomment_profile}>
                    <span>
                        <Image src={props.writerInfo.profileImg} roundedCircle />
                    </span>
                    <span>
                        <p>{props.writerInfo.class}</p>
                        <h4>{props.writer}</h4>
                    </span>
                    <div className={styles.recomment_cancel} style={{ display: props.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
                        <svg onClick={() => deleteReComment(commentId, postId, index, boardType)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </div>

                </div>
                {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
                <div>
                    <p>
                        {props.content}
                    </p>
                </div>
                {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

                <div className={styles.comment_time_box_2}>
                    <p>{getTime(props.createdAt)}</p>
                </div>

            </div>
        )
    };

    return (
        <div className={styles.comment_list}>
            <div className={styles.play_comment_profile}>
                <span>
                    <Image src={props.writerInfo.profileImg} roundedCircle />
                </span>
                <span>
                    <p>{props.writerInfo.class}</p>
                    <h4>{props.writer}</h4>
                    <div className={styles.comment_cancel}  style={{ display: props.id === sessionStorage.getItem("memberId") ? 'block' : 'none' }}>
                        <svg onClick={() => deleteComment(props._id, postId, boardType)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </div>
                </span>
                <span className={styles.comment_choice}>
                    <button onClick={handleLike}>👍  {like} </button>
                </span>
                <span className={styles.comment_choice_2}>
                    <button onClick={handleSelection}> 질문자 채택 🏆 </button>
                </span>
            </div>
            {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
            <div className="quill_comment_font_style">

                <p dangerouslySetInnerHTML={{ __html: props.content }}></p>

            </div>
            {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}
            <span className={styles.comment_choice_button}> 채택하기 ✔</span>
            <div>
                <p className={styles.comment_time_box}>{getTime(props.createdAt)}</p>
            </div>
           
            {/*             <div className={styles.recomment_button_box} onClick={showRecommentWrite}>
                <p className={styles.recomment_button_box_2}>댓글쓰기</p>
            </div> */}
            {/* 
            {recommentVisible &&
                <form onSubmit={(event) => reCommentSubmit(event, props._id)}>
                    <div className={styles.recomment_write}>
                        <div>
                            <div>
                                <img src="#" />
                            </div>``
                            <textarea onBlur={reCommentChange} placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
                        </div>
                        <button type="submit">댓글쓰기</button>
                    </div>
                </form>
            } */}
            {props.reComment.map((item, index) => <ReComment key={index} commentId={props._id} props={item} index={index} />)}
        </div>
    );
}

export default QnaCommentItem
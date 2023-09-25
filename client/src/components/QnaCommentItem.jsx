import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import PlayBoard from "../css/PlayBoardDetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { QuillContext } from '../context/QuillContext';

const QnaCommentItem = ({ props, postId }) => {

    /* QnaCommentItem입니다. 채택 버튼으로 따로 관리합니다! */

    /* 댓글 컴포넌트 작업하러 오신 분에게 남기는 말

    프론트 작업자에게
    PlayBoardDetail에서 떼어온 CommentItem 컴포넌트를 사용해서 이전 작업을 진행 했기때문에
    이 컴포넌트는 css를 PlayBoardDetail.module.css를 사용하고 있는 상태입니다
    문제가 없다면 이대로 사용해도 무방할 듯 하지만
    혹여 댓글 css를 따로 만들 필요가 있을듯 하여 편지를 적어놓습니다
    ======================================================================
    ======================================================================
    백엔드 작업자에게
    통합 하면서 새로 생긴 문제인데
    현재 한 게시글에 들어간 후에 다른 게시글에 들어갈 경우
    댓글 정보가 이전 게시글의 정보로 순간적으로 출력되는 문제가 있습니다
    Detail 페이지를 빠져나갈떄 commentList를 초기화 시키는 구문을 적어주면 해결될듯하지만
    현재 시각 03:04분으로 매우 피곤한 상태이므로 이 편지를 남기고 자러갑니다
    
    사실 제가 정신없어서 다음에 작업할떄 까먹을까봐 적어놓는겁니다
    지금 약간 의식의 흐름대로 적고있어서 횡설수설하는거같애요
    
    여튼 이만 갑니다
    
    -허허-
    */


    // 댓글 리스트 저장할 State, 댓글 조회, 삭제 함수
    const { commentList, setCommentList, getComment, deleteComment } = useContext(QuillContext);

    // 대댓글 작성완료 시 호출되는 함수
    function reCommentSubmit(event, _id) {
        event.preventDefault();
        console.log(_id);
        const createdAt = new Date().toISOString();
        const obj = {
            writer: sessionStorage.getItem("memberNickname"),
            content: reComment,
            commentID: _id,
            createdAt: createdAt
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

    // 대댓글 컴포넌트
    const ReComment = ({ props }) => {

        return (
            <div className={PlayBoard.recomment_list_box}>
                <div className={PlayBoard.play_recomment_profile}>
                    <span>
                        <Image src={props.writerInfo.profileImg} roundedCircle />
                    </span>
                    <span>
                        <p>{props.writerInfo.class}</p>
                        <h4>{props.writer}</h4>
                    </span>
                    <div className={PlayBoard.recomment_cancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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

                <div className={PlayBoard.comment_time_box_2}>
                    <p>{getTime(props.createdAt)}</p>
                </div>

            </div>
        )
    };

    return (
        <div className={PlayBoard.comment_list}>
            <div className={PlayBoard.play_comment_profile}>
                <span>
                    <Image src={props.writerInfo.profileImg} roundedCircle />
                </span>
                <span>
                    <p>{props.writerInfo.class}</p>
                    <h4>{props.writer}</h4>
                    <div className={PlayBoard.comment_cancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                    </div>
                </span>
                    <span className={PlayBoard.comment_choice}>
                        <button>👍  0 </button>
                    </span>
                    <span className={PlayBoard.comment_choice_2}>
                        <button> 질문자 채택 🏆 </button>
                    </span>
            </div>
            {/* ===== 댓글 내용이 들어갈 부분 시작 ===== */}
            <div>

                <p>
                    {props.content}
                </p>

            </div>
            {/* ===== 댓글 내용이 들어갈 부분 끝 ===== */}

            <div>
                <p className={PlayBoard.comment_time_box}>{getTime(props.createdAt)}</p>
            </div>
            <div className={PlayBoard.recomment_button_box} onClick={showRecommentWrite}>
                <p className={PlayBoard.recomment_button_box_2}>댓글쓰기</p>
            </div>

            {recommentVisible &&
                <form onSubmit={(event) => reCommentSubmit(event, props._id)}>
                    <div className={PlayBoard.recomment_write}>
                        <div>
                            <div>
                                <img src="#" />
                            </div>``
                            <textarea onBlur={reCommentChange} placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
                        </div>
                        <button type="submit">댓글쓰기</button>
                    </div>
                </form>
            }
            {props.reComment.map((item, index) => <ReComment key={index} props={item} />)}

        </div>
    );
}

export default QnaCommentItem
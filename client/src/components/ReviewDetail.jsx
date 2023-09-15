import React from 'react'
import styles from '../css/ReviewDetail.module.css'
import LeftContainer from './LeftContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

const ReviewDetail = () => {

    const Rank = () => (
        <span className={`${styles.tag_button} ${styles.rank}`}>
            ⭐1.0
        </span>
    );
    const Recomend = () => (
        <span className={`${styles.tag_button} ${styles.recomend}`}>
            강력추천👍
            {/* 비추천👎 */}
        </span>
    );
    const Major = () => (
        <span className={`${styles.tag_button} ${styles.major}`}>
            전공자🎓
            {/* 비전공자🎓*/}
        </span>
    );

    const CommentItem = () => (
        <div className={styles.comment_list}>
            <div className={styles.play_comment_profile}>
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
        <div className={styles.Main_container}>
            <LeftContainer />
            <div className={styles.right_container}>
                <h2>수료생후기</h2>
                <hr />
                <div className={styles.top_content}>
                    <div>
                        <div className={styles.profile_img}>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                        <div>
                            <p>데이터디자인</p>
                            <p>종강만기다림</p>
                        </div>
                        <div className={styles.tag_buttons}>
                            <Rank />
                            <Recomend />
                            <Major />
                        </div>
                    </div>
                    <div>
                        <p>1시간 전 👁‍🗨 28 💬 4</p>
                    </div>
                </div>

                <div className={styles.middle_content}>
                    <h4>제목 스인개 3개월차 솔직후기</h4>
                    <div>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                        <p>내용나올부분</p>
                    </div>
                </div>
                <div className={styles.division_line}>
                    <div>
                        <p>댓글 2</p>
                    </div>
                </div>

                <div className={styles.comment_write}>
                    <div>
                        <div>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                        <textarea placeholder="댓글을 쓰려면 로그인이 필요합니다."></textarea>
                    </div>
                    <button type="button">댓글쓰기</button>
                </div>

                <CommentItem/>

            </div>

        </div>
    )
}

export default ReviewDetail
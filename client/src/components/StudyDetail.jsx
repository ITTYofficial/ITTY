import React from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/StudyDetail.module.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

const StudyDetail = () => {


    /* 댓글 컴포넌트 */
    const Comment = () => (
        <div className={style.Detail_comment}>
            <div className={style.Comment_flex}>
                <div className={style.Profile_img_comment}>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6k4KSEWGAq157LW3wCKU2DJmvoQyrfRfcA&usqp=CAU" roundedCircle />

                </div>
                <div>
                    <p>빅데이터분석반</p>
                    <p>언제취뽀</p>
                    <p>2시간 전</p>
                </div>
            </div>
            <div className={style.Detail_comment_content}>
                <p>댓글입니다 낄낄</p>
            </div>
        </div>
    );
    /* 댓글 컴포넌트 */

    return (
        <div className={style.Main_container}>
            <LeftContainer />
            {/* 아래 쪽에 projectDetail에서 꺼내쓰는 부분은 위 State에서 꺼내는 부분입니당 */}
            <div className={style.right_container}>
                <div>
                    <div className={style.Button_margin}>
                        <Button variant="success">스터디</Button>
                        <Button variant="success">코딩테스트 대비</Button>
                        <Button variant="primary">마감</Button>
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


                    <hr />

                    <div className={style.division_line}>
                        <div>
                            <p>댓글 3</p>
                        </div>
                    </div>
                    <div className={style.Comment_flex}>
                        <div className={style.Profile_img_comment}>
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEJWYPn7R2QRCgdY9qvfJWZhyggOTcSF5bcA&usqp=CAU" roundedCircle />
                        </div>
                        <div className={style.Comment_write}>
                            <p>댓글 작성부분</p>
                        </div>
                    </div>
                    <div className={style.Comment_write_button}>
                        <Button variant="primary">작성하기</Button>
                    </div>
                    

                    {/* 댓글부분 */}
                    <Comment />
                    <Comment />
                    <Comment />
                    {/* 댓글부분 */}



                </div>
            </div>
        </div>
    )
}

export default StudyDetail

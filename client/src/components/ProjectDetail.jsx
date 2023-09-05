import React from 'react'
import LeftContainer from './LeftContainer'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../css/ProjectDetail.module.css";


const ProjectDetail = () => {
    return (

        <div className={style.Main_container}>
            <LeftContainer />

            <div className={style.right_container}>
                <h2>조회페이지</h2>
                <div>
                    <div className={style.Button_margin}>
                        <Button variant="success">프로젝트</Button>
                        <Button variant="success">스터디</Button>
                        <Button variant="primary">모집중</Button>
                    </div>
                    <div className={style.Top_container}>

                        <div>
                            <h4>공공기관 프로젝트 함께할 사람 모집중!</h4>
                            <p>💌기간 2023-09-08 ~ 2023-10-21</p>
                            <p>🥷인원 5명</p>
                        </div>

                        <div className={style.Top_right_container}>
                            <p>데이터디자인</p>
                            <p>수업중몰래롤</p>
                        </div>
                        <div className={style.Profile_img}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ZKUupoYLVbtqmNq-SpaZxNv8n0r9X1Ga5M3CCZB6Vw&s'></img>
                        </div>
                    </div>
                    <p>조회수 : 10  댓글수 : 10</p>

                    <hr />
                    <div className={style.Detail_content}>
                        <p>안녕하세요 내용이 나올 부분입니다</p>
                    </div>


                    <hr />
                    <span>댓글 2개</span>
                    <div className={style.Comment_flex}>
                        <div className={style.Profile_img_comment}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEJWYPn7R2QRCgdY9qvfJWZhyggOTcSF5bcA&usqp=CAU'></img>
                        </div>
                        <div className={style.Comment_write}>
                            <p>댓글 작성부분</p>
                        </div>
                    </div>
                    <div className={style.Comment_write_button}>
                    <Button variant="primary">작성하기</Button>
                    </div>
                    <hr />
                    {/* 댓글 반복 시작 */}
                    <div className={style.Detail_comment}>
                        <div className={style.Comment_flex}>
                            <div className={style.Profile_img_comment}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6k4KSEWGAq157LW3wCKU2DJmvoQyrfRfcA&usqp=CAU'></img>
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
                    {/* 댓글 반복 끝 */}
                    <div className={style.Detail_comment}>
                        <div className={style.Comment_flex}>
                            <div className={style.Profile_img_comment}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6k4KSEWGAq157LW3wCKU2DJmvoQyrfRfcA&usqp=CAU'></img>
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

                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
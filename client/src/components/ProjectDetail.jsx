import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../css/ProjectDetail.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ProjectDetail = () => {

    // 특정 게시글 조회하기 위한 id값 가져오기
    const { id } = useParams();

    // 게시글정보 저장할 State
    const [projectDetail, setProjectDetail] = useState([]);

    // 게시글 조회함수
    // 작성자 정보는 아직 없어서 나중에 추가할 것
    const updateData = async () => {
        // projectRouter랑 통신해서 response에 결과값 저장
        const response = await axios.get(`http://localhost:8088/project/projectDetail/${id}`);
        // respnse에서 데이터 꺼내서 State에 저장
        setProjectDetail(response.data.detailProject[0]);
    };

    // 페이지 렌더링시 조회함수 실행
    useEffect(() => {
        updateData();
    }, []);

    return (

        <div className={style.Main_container}>
            <LeftContainer />
            {/* 아래 쪽에 projectDetail에서 꺼내쓰는 부분은 위 State에서 꺼내는 부분입니당 */}
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
                            <h4>{projectDetail.title}</h4>
                            <p>모집기간 : 💌{projectDetail.periodStart}~{projectDetail.periodEnd}</p>
                            <p>모집인원 : {projectDetail.recruit}명</p>
                        </div>

                        <div className={style.Top_right_container}>
                            <p>데이터디자인</p>
                            <p>수업중몰래롤</p>
                        </div>
                        <div className={style.Profile_img}>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ZKUupoYLVbtqmNq-SpaZxNv8n0r9X1Ga5M3CCZB6Vw&s'></img>
                        </div>
                    </div>
                    <p>조회수 : {projectDetail.views}  댓글수 : 10</p>

                    <hr />
                    <div className={style.Detail_content}>
                        <p dangerouslySetInnerHTML={{__html: projectDetail.content}}></p>
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
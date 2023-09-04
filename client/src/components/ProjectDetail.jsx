import React from 'react'
import LeftContainer from './LeftContainer'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "../css/ProjectDetail.module.css";
import style_test from "../css/test.module.css";


const ProjectDetail = () => {
    return (

        <div className={style.Main_container}>
            <LeftContainer />
            
            <div className={style.right_container}>
                <h2>조회페이지</h2>
                <div>
                    
                    <div className={style_test.Button_margin}>
                        <Button variant="success">프로젝트</Button>
                        <Button variant="success">스터디</Button>
                        <Button variant="primary">모집중</Button>
                    </div>
                    <h4>공공기관 프로젝트 함께할 사람 모집중!</h4>
                    <p>💌기간 2023-09-08 ~ 2023-10-21</p>
                    <p></p>

                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
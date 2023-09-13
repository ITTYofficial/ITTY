import React from 'react'
import style from "../css/PortDetail.module.css";
import LeftContainer from './LeftContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

const PortDetail = () => {
    return (
        <div className={style.Main_container}>
            <LeftContainer />
            <div className={style.right_container}>
                <h4>제목</h4>
                <div className={style.top_container}>
                    <div className={style.top_container_sub}>
                        <div className={style.profile_img}>
                            프사
                        </div>
                        <div>
                            <p>소속</p>
                            <p>아이디</p>
                        </div>
                    </div>
                    <div>
                        2
                    </div>
                    

                </div>
            </div>


        </div>
    )
}

export default PortDetail
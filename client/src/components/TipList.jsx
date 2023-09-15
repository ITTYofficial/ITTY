import React, { useEffect, useState } from "react";
import axios from 'axios'
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import styles from "../css/Community.module.css";
import style from "../css/TipList.module.css"

const TipList = () => {

    // 게시글 리스트 담을 State
    const [tipList, setTipList] = useState([]);

    // 페이지 렌더링시 조회함수 실행
    useEffect(() => {
        readTipList();
    }, []);

    //게시글 조회 함수
    const readTipList = async () => {
        await axios
            .get("http://localhost:8088/tipList")
            .then((res) => {
                console.log(res);
                setTipList(res.data.tip);
            })
            .catch((err) => {
                alert("통신에 실패했습니다.");
                console.log(err);
            });
    };



    const TipItem = () => (
        <div>안녕</div>
    );




    return (
        <div className={styles.Main_container}>
            <LeftContainer />
            <div className={styles.right_container}>
                <div className={styles.Main_container_banner}></div>
                <div className={styles.right_container_button}>
                    <h2>Tip 🥇</h2>
                    <Link to={"/tipWrite"}>
                        <p>작성하기</p>
                    </Link>
                </div>


                <div className={styles.Main_container_list}>
                    {/* 글 반복 시작 */}
                    {tipList.map((item) => (
                        <TipItem />
                    ))}


                    {tipList.map((item) => (
                        <div className={styles.Main_container_list_detail}>
                            <div>
                                <p className={styles.b_date}>{item.createdAt}</p>
                                <Link to={`/tipDetail/${item._id}`}>
                                    <h4>{item.title}</h4>
                                </Link>
                                <p>{item.content}</p>
                            </div>


                            <div className={styles.Main_grid_profile}>
                                <span className={styles.profile_text}>
                                    <p>데이터 디자인</p>
                                    <h4>{item.writer}</h4>
                                </span>
                                <span className={styles.profile_pic}>
                                    <img src="#" />
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* 글 반복 끝 */}
                </div>
            </div>
        </div>
    )
}

export default TipList
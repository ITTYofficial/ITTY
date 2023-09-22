import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import styles from '../css/PortList.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PortList = () => {
    // 포트폴리오 리스트 담을 State
    const [portList, setPortList] = useState([]);

    // 포트폴리오 리스트 조회 함수
    const readPortList = async () => {
        await axios
            .get("http://localhost:8088/port/portList")
            .then((res) => {
                const sortedPort = res.data.port.sort((a, b) => {
                    // 게시글 데이터 작성 일자별 내림차순 정렬
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setPortList(sortedPort);
            })
            .catch((err) => {
                alert("통신에 실패했습니다.");
                console.log(err);
            });
    };

    // 페이지 렌더링시 조회 함수 실행
    useEffect(() => {
        readPortList();
    }, []);

    // 날짜를 "몇 시간 전" 형식으로 변환하는 함수
    const getTimeAgoString = (dateString) => {
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

    const PortItem = ({ props }) => (
        <div className={styles.port_content}>
            <div className={styles.port_content_img}>
                <Link to={`/portDetail/${props._id}`}>
                    <img src={props.imgPath}></img>
                    {/* <img src='https://i.ibb.co/dDnhbM9/image.png'></img> */}
                </Link>
            </div>
            <div className={styles.port_content_bottom}>
                <div>
                    <h4>{props.title}</h4>
                </div>
                <div>
                    <div className={styles.port_content_bottom2}>
                        <div className={styles.profile_img}>
                            <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />
                        </div>
                        <div>
                            <p className={styles.little_p}>데이터디자인</p>
                            <p className={styles.large_p}>종강만기다림</p>
                        </div>
                    </div>
                    <div>
                        <p className={styles.little_p}>{getTimeAgoString(props.createdAt)} 👁‍🗨 {props.views} 💬 4</p>
                    </div>
                </div>
            </div>
        </div>

    );


    return (
        <div className={styles.Main_container}>
            <LeftContainer />
            <div className={styles.right_container}>
                <h2>포트폴리오</h2>
                <dvi className={styles.little_title}>
                    <h4>포트폴리오</h4>
                    <Link to={"/portWrite"}>
                        <p>작성하기</p>
                    </Link>
                </dvi>

                <div className={styles.port_list}>

                    {portList.map((item) => <PortItem key={item._id} props={item} />)}
                </div>


            </div>

        </div>
    )
}

export default PortList

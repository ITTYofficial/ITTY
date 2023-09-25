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
            .then(async(res) => {
                        // 회원정보조회-지홍
        console.log("1. writer :", res.data.port[0].writer);
        let memberPromises = res.data.port.map((port) => {
          const nickname = port.writer;
          const id = port.id

          return axios.get(
            `http://localhost:8088/member/memberSearching?id=${id}`
          );
        });

        let memberResponses = await Promise.all(memberPromises);
        let member = memberResponses.map((response) => ({
          member: response.data.member,
        }));

        console.log("member 내용물 : ", member.member);
        let fusion = member.map((item, index) => {
          return { ...item, ...res.data.port[index] };
        });
        console.log("퓨전", fusion);
                const sortedPort =fusion.sort((a, b) => {
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
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(hoursDifference / 24);
    
        if (minutesDifference === 0) {
          return "방금 전";
        } else if (minutesDifference < 60) {
          return `${minutesDifference}분 전`;
        } else if (hoursDifference < 24) {
          return `${hoursDifference}시간 전`;
        } else {
          return `${daysDifference}일 전`;
        }
      };

    const PortItem = ({ props }) => (
        <div className={styles.port_content}>
            <div className={styles.port_content_img}>
                <Link to={`/portDetail/${props._id}?id=${props.member.id}`}>
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
                            <Image src={props.member.profileImg} roundedCircle />
                        </div>
                        <div>
                            <p className={styles.little_p}>{props.member.class}</p>
                            <p className={styles.large_p}>{props.writer}</p>
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

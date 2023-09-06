import React, { useEffect, useState } from "react";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import axios from 'axios';
// import "../css/Community.css";
import styles from "../css/Community.module.css";

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);

  // 게시글 리스트 조회함수
  // 작성자 정보는 아직 없어서 나중에 추가할 것
  const updateData = async () => {
    const response = await axios.get("http://localhost:8088/project/projectList");
    console.log('response 어떻게오는지 확인', response);
    setProjectList(response.data.project);
  };

  // 페이지 렌더링시 조회함수 실행
  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className={styles.Main_container}>
      <LeftContainer />

      <div className={styles.right_container}>
        <div className={styles.Main_container_banner}>banner</div>
        <h2>Communaty</h2>

        <div className={styles.Main_container_list}>
          {/* 글 반복 시작 */}
          {projectList.map((item) => (
            <div className={styles.Main_container_list_detail}>
              <div>
                <p className={styles.b_date}>{item.createdAt}</p>
                <Link to={`/projectDetail/${item._id}`}>
                  <h4>{item.title}</h4>
                </Link>
                <p>
                  {item.content}
                </p>
              </div>

              <div>
                <div>
                  <p className={styles.b_date}>데이터 디자인</p>
                  <h4>{item.writer}</h4>
                </div>
                <img src="#" />
              </div>
            </div>
          ))}
          {/* 글 반복 끝 */}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

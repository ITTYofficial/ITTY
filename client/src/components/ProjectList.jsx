import React from "react";
import LeftContainer from "./LeftContainer";

const ProjectList = () => {
  return (
    <div className="Main_container">
      <LeftContainer />

      <div className="right_container">
        <div className="Main_container_banner">banner</div>
        <h2>Communaty</h2>

        <div className="Main_container_list">
          <div className="Main_container_list_detail">
            <div>
              <p className="b_date">1일 전</p>
              <h4>공공기관 프로젝트 함께 진행할 사람 모집중!</h4>
              <p>
                데이터디자인반 2명, 앱 개발 가능자 1명, 데이터관리 1명 총 4명...
              </p>
            </div>

            <div>
              <div>
                <p className="b_date">데이터 디자인</p>
                <h4>수업중 몰래롤</h4>
              </div>
              <img src="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

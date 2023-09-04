import React from 'react'
import { Link } from 'react-router-dom'

const ProjectList = () => {
    return (
        <div id='Main_container'>
            <div className='left_container'>
                <div className='left_container_box1'>
                    <h3>반이름</h3>
                    <h3>포트폴리오</h3>
                    <div>
                        <span>포트폴리오 이미지삽입</span>
                    </div>
                </div>
                <div className='left_container_box2'>
                    <h3>이달의 투표</h3>
                    <h3>스인재 주변 최고맛집은</h3>
                </div>
                <div className='left_container_box3'>
                    <h3>Best Ranking</h3>
                </div>
            </div>

            <div className='right_container'>
                <div className='Main_container_banner'>
                    banner
                </div>
                <h2>Communaty</h2>
                <div className='Main_container_list'>

                    <div className='Main_container_list_detail'>
                        <div>
                            <p className='b_date'>1일 전</p>
                            <Link to={'/projectDetail'}>
                                <h4>공공기관 프로젝트 함께 진행할 사람 모집중!</h4>
                            </Link>
                            <p>데이터디자인반 2명, 앱 개발 가능자 1명, 데이터관리 1명 총 4명...</p>
                        </div>
                        <div>
                            <div>
                                <p className='b_date'>데이터 디자인</p>
                                <h4>수업중 몰래롤</h4>
                            </div>
                            <img src='#' />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProjectList
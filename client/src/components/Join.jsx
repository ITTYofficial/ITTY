import React from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Join.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';



const Join = () => {


  return (



    <div>
      <div className={style.Join_content_box1}>
        <div className={style.Join_content_box2}>
          <div>
            <div>
              <Link to={"/"}>
                <img src="img/logo.png" alt="Logo" width='100px' />
              </Link>
            </div>
          </div>


          <div className={style.Join_content_box_font}>
            <h2>회원가입</h2>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">아이디</label>
              <input className="form-control" type="text" name="id" id="id" placeholder='4~15자 이내로 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pwd">비밀번호</label>
              <input className="form-control" type="password" name="pwd" id="pwd" placeholder='비밀번호를 입력해주세요(8자리 이상)' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">아이디</label>
              <input className="form-control" type="text" name="id" id="id" placeholder='비림번호를 한번 더 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">이름</label>
              <input className="form-control" type="text" name="name" id="name" placeholder='이름을 입력해주세요' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">닉네임</label>
              <input className="form-control" type="text" name="nickname" id="nicknam" placeholder='닉네임을 입력해주세요' />
            </div>


            {/* 소속 */}
            <div className="mb-3">
              <label className="form-label" htmlFor="itclass">소속</label>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  소속 선택
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" href="#">데이터디자인반</a></li>
                  <li><a className="dropdown-item" href="#">빅데이터분석반</a></li>
                  <li><a className="dropdown-item" href="#">풀스택반</a></li>
                </ul>
              </div>
            </div>

            {/* 성별 선택 */}
            <label className="form-label" htmlFor="gender">성별</label>
            <div className="mb-3">

              <div className="form-check" className={style.Join_radio_box}>
                <label className="form-check-label" for="flexRadioDefault2">
                  남
                </label>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              </div>
              <div className={style.Join_radio_box2}></div>
              <div className="form-check" className={style.Join_radio_box}>
                <label className="form-check-label" for="flexRadioDefault2">
                  여
                </label>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              </div>
            </div>




            <button className="btn btn-primary btn-ml" type="submit">회원가입</button>
          </form>
        </div>
      </div>

    </div>

  )
}

export default Join
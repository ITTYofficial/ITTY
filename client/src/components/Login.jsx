import React from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Join.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';


const Login = () => {
  return (

    <div>
      <div className={style.Join_content_box1}>
        <div className={style.Join_content_box2}>
          <div>
            <div className={style.Join_content_box_font}>
              <Link to={"/"}>
                <img src="img/logo.png" alt="Logo" width='100px' />
              </Link>
            </div>
          </div>


          <div className={style.Join_content_box_font}>
            <h2>로그인</h2>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input className="form-control" type="text" name="id" id="id" placeholder='아이디를 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input className="form-control" type="password" name="pw" id="pw" placeholder='비밀번호를 입력해주세요' />
            </div>




            <div className="mb-3">
              <button className="btn btn-primary btn-ml" type="submit" style = {{ width: '100%' }}>로그인</button>
            </div>

            <div>
            <div className="mb-3">
              <div className={style.Join.font_box}>아직 회원이 아니시라구요? <a href='/Join'>회원가입하기</a></div>
            </div>

            <div className="mb-3">
              <div className={style.Join.font_box}>SNS 간편 로그인</div>
            </div>
            </div>
            <img src=''></img>
            <img src=''></img>
            <img src=''></img>

          </form>
        </div>
      </div>

    </div>

  )
}

export default Login
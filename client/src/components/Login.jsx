import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Join.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';


const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };
  const onPwHandler = (e) => {
    setPw(e.target.value);
  };

const loginMember =async (e) => {
  e.preventDefault()

  const member = {
    id: id,
    pw: pw
  };
  
  try {
    // 로그인 라우트로 POST 요청 보내기
    const response = await axios.post('http://localhost:8088/member/login', member);
    if (response.data.loginSuccess) {
      // 로그인 성공: memberId를 콘솔에 출력하고 로그인 페이지로 이동
      console.log('로그인 성공:', response.data.memberId);
      window.location.href = '/';
    } else {
      // 로그인 실패: 서버에서 받은 메시지를 알림으로 표시
      alert(response.data.message);
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }



  }


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

          <form onSubmit={loginMember}>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input className="form-control" type="text" name="id" id="id" value={id} onChange={onIdHandler} placeholder='아이디를 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input className="form-control" type="password" name="pw" id="pw" value={pw} onChange={onPwHandler} placeholder='비밀번호를 입력해주세요' />
            </div>




            <div className="mb-3">
              <button className="btn btn-primary btn-ml" type="submit" style={{ width: '100%' }}>로그인</button>
            </div>


            <div className="mb-3">
              <div className={style.Join_font_box}>아직 회원이 아니시라구요? <a href='/Join'>회원가입하기</a></div>
            </div>

            <div className={style.Join_font_box2}>
            <div className={style.Join_font_box4}>SNS 간편 로그인</div>
              <img className={style.Join_font_box3} src='img/naverlogo.png'></img>
              <img src='img/kakaologo.png' className={style.Join_font_box3} ></img>
            </div>


          </form>
        </div>
      </div>

    </div >

  )
}

export default Login
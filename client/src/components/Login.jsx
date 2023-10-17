import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/Join.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login = () => {

  // 배포용 URL
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };
  const onPwHandler = (e) => {
    setPw(e.target.value);
  };

  const loginMember = async (e) => {
    e.preventDefault();

    const member = {
      id: id,
      pw: pw,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/member/login`,
        member
      );
      if (response.data.loginSuccess) {
        sessionStorage.setItem("memberId", response.data.memberId);
        sessionStorage.setItem("memberNickname", response.data.memberNickname);
        window.location.href = "/";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div>
      <div className={style.Join_content_box3}>
        <div className={style.Join_content_box2}>
          <div>
            <div className={style.Join_content_box_font}>
              <Link to={"/"}>
                <img src="img/logo.png" alt="Logo" width="100px" />
              </Link>
            </div>
          </div>

          <div className={style.Join_content_box_font}>
            <h2>로그인</h2>
          </div>

          <form onSubmit={loginMember}>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                value={id}
                onChange={onIdHandler}
                placeholder="아이디를 입력해주세요."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input
                className="form-control"
                type="password"
                name="pw"
                id="pw"
                value={pw}
                onChange={onPwHandler}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>

            <div className="mb-3">
              <button
                className="btn btn-primary btn-ml"
                type="submit"
                style={{ width: "100%" }}
              >
                로그인
              </button>
            </div>

            <div className="mb-3">
              <div className={style.Join_font_box}>
                아직 회원이 아니시라구요? <Link to={"/join"}>회원가입하기</Link>
              </div>
            </div>

            <div className={style.Login_kakao_box}>
              <button
                className={style.Join_kakao_box}
                type="submit"
              >
                카카오 로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

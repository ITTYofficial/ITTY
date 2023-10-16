import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../css/Join.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import KaKaoLogin from "react-kakao-login";

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

  // const responseKaKao = (response) => {
  //   if (response.profile) {
  //     // 카카오 로그인 성공
  //     console.log(response.profile);
  //     // 서버로 카카오로부터 받은 정보를 전송하고 사용자 인증을 처리
  //     // ...
  //   } else {
  //     // 카카오 로그인 실패
  //     console.error("카카오 로그인 실패");
  //   }
  // };

  const loginMember = async (e) => {
    e.preventDefault();

    const member = {
      id: id,
      pw: pw,
    };

    try {
      // 로그인 라우트로 POST 요청 보내기
      const response = await axios.post(
        `${baseUrl}/member/login`,
        member
      );
      if (response.data.loginSuccess) {
        // 로그인 성공: memberId를 콘솔에 출력하고 로그인 페이지로 이동
        // console.log('로그인 성공 아이디:', response.data.memberId);
        // console.log('로그인 성공 닉네임:', response.data.memberNickname);
        sessionStorage.setItem("memberId", response.data.memberId);
        sessionStorage.setItem("memberNickname", response.data.memberNickname);
        window.location.href = "/";
      } else {
        // 로그인 실패: 서버에서 받은 메시지를 알림으로 표시
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
              {/* <KaKaoLogin 
                token={"099aa0e936256b3cc87375787f141a4f"}
                onSuccess={responseKaKao}
                onFail={(error) => console.error("카카오 로그인 실패", error)}>
              <img src='img/kakaologo.png' className={style.Join_font_box3} ></img>
              </KaKaoLogin> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

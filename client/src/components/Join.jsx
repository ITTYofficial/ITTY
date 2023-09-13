import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Join.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "bootstrap/js/dist/dropdown";
import axios from 'axios';


/* 
회원가입 form태그 

아이디:id // 비밀번호:pw // 비밀번호확인 pw_check
이름: name // 닉네임: nickname

라디오버튼: 남 male  //여 female
드롭다운 박스 : 데이터디자인반 datadesign, 빅데이터분석 bigdata, 풀스택반 full stack

*/

const Join = () => {

  // 회원가입 '소속선택' 드롭다운 useState 관리
  const [selectedValue, setSelectedValue] = useState(null);

  const handleDropdownClick = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [gender, setGender] = useState("");
  
  
  const onIdHandler = (e) => {
    setId(e.target.value);
  };
  const onNameHandler = (e) => {
    setName(e.target.value);
  };
  const onPwHandler = (e) => {
    setPw(e.target.value);
  };
  const onCheckPwHandler = (e) => {
    setCheckPw(e.target.value);
  };
  const onRole =(e) =>{
    setRole(e.target.value);
  }
  const onNicknameHandler =(e) =>{
    setNickname(e.target.value);
  }
  
  const onGenderHandler =(e) =>{
    setGender(e.target.value);
  }
  const onSkill =(e) =>{
    setSkill(e.target.value);
  }
// ****************************
// 아이디 중복체크 + 영문숫자 조합확인
const engNum =  /^[A-Za-z0-9]{5,}$/; // 영문-숫자 + 5글자이상으로 제한

const idCheck = async(e) => {
  e.preventDefault();
  if(engNum.test(id)){
    alert("올바른 양식입니다");
  }else {
    alert("아이디는 영문, 숫자 조합입니다");
  }
  const idChecking ={id:id};
  try {
    //  라우트로 POST 요청 보내기
    const response = await axios.post('http://localhost:8088/member/idCheck', idChecking);
    if (response.data.idCheckingSuccess) {
      // 중복체크 중복: memberId를 콘솔에 출력하고 로그인 페이지로 이동
      console.log('아이디 중복체크 성공:', response.data.idCheckingId);
    } else {
      // 중복체크 중복x: 서버에서 받은 메시지를 알림으로 표시
      alert(response.data.message);
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
}


  // ******************************************************** 
  // 회원가입 함수

  const joinMember = async (e) => {
    e.preventDefault();
if (pw !== checkPw) {
  return alert("비밀번호가 일치하지 않습니다..");
}
let member = {
  id: id,
  name: name,
  pw: pw,
  gender: gender,
  nickname: nickname,
  role: role,
  skill: skill,
};
    try {
      console.log('제발 들어와주라', member);
      const response = await axios.post("http://localhost:8088/member/join", member); // 경로 테스트 중...
      if (response.data.message === "회원가입이 완료되었습니다.") {
        // 성공적으로 삽입되면 리다이렉트 또는 다른 작업 수행
        window.location.href = '/login'
        
        
      } else {
        // 오류 처리
        console.error("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }

  };

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
            <h2>회원가입</h2>
          </div>

          {/* 회원가입 양식 form태그 부트스트랩 양식으로 여백 조정 */}
          <form onSubmit={joinMember}>
            <div className="mb-3">
              <label className="form-label" htmlFor="id">아이디</label>
              <input className="form-control" type="text" name="id" value={id} id="id" onChange={onIdHandler} placeholder='4~15자 이내로 입력해주세요.' />
              <button onClick={idCheck}>중복체크</button>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pw">비밀번호</label>
              <input className="form-control" type="password" name="pw" id="pw" value={pw} onChange={onPwHandler} placeholder='비밀번호를 입력해주세요(8자리 이상)' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pw_check">비밀번호 확인</label>
              <input className="form-control" type="password" name="pw_check" id="pw_check" value={checkPw} onChange={onCheckPwHandler} placeholder='비림번호를 한번 더 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">이름</label>
              <input className="form-control" type="text" name="name" id="name" value={name} onChange={onNameHandler} placeholder='이름을 입력해주세요' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="nickname">닉네임</label>
              <input className="form-control" type="text" name="nickname" id="nickname" value={nickname} onChange={onNicknameHandler} placeholder='닉네임을 입력해주세요' />
            </div>

            {/* 역할 */}
            <div className="mb-3">
              <div className="mb-3">
                <h2 className={style.Join_font_box5}>포지션</h2>
              </div>
              <select className="form-control" style={{backgroundColor:"rgb(229, 229, 229)"}} name="role" >
               <option value="none">포지션을 선택해주세요</option>
                <option value="back">Back-End 백앤드</option>
                <option value="front">Front-End 프론트엔드</option>
                <option value="full">Full-Stack 풀스택</option>
                <option value="db">DB 데이터베이스</option>
                <option value="design">UI/UX 디자인</option>
              </select>
            </div>

            {/* 스킬 */}
            <div className="mb-3">
              <div className="mb-3">
                <h2 className={style.Join_font_box5}>스킬</h2>
                <h5 className={style.Join_font_box6}>*선택사항입니다</h5>
              </div>
              <select className="form-control" style={{backgroundColor:"rgb(229, 229, 229)"}} name="skill" >
              <option value="none">스킬을 선택해주세요</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="htmlcss">HTML/CSS</option>
                <option value="jquery">jquery</option>
                <option value="spring">spring</option>

              </select>
            </div>



            {/* 성별 선택 */}
            <label className="form-label" htmlFor="gender">
              성별
            </label>
            <div className="mb-3">
              <div className={style.Join_radio_box}>
                <label className="form-check-label">
                  남
                </label>
                <div className={style.Join_radio_box3}></div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={onGenderHandler}
                />
              </div>
              <div className={style.Join_radio_box2}></div>
              <div className={style.Join_radio_box}>
                <label className="form-check-label">
                  여
                </label>
                <div className={style.Join_radio_box3}></div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={onGenderHandler} 
                />
              </div>
            </div>

            <button className="btn btn-primary active btn-ml" type="submit" style={{ width: '100%' }}>회원가입</button>
          </form>
        </div>
      </div>

    </div>

  )
}

export default Join
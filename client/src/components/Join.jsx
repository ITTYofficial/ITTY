import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from "../css/Join.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from "bootstrap/js/dist/dropdown";
import axios from 'axios';

/* 지홍 작업 09.11 */


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
  
  
  
  // 라디오 버튼값 관리 useState
  // const [gender, setGender] = useState("");
  // const handleGenderChange = (e) => {
  //   setGender(e.target.value);
  // };
 
  // DB에 보낼 회원정보 관리 useState
    const [member, setMember] = useState({
      id: '',
      pw: '',
      gender: '',
      nickname: '',
      name: '',
      role: '',
      skill: '',
      profileImg:'',

    });
  
    const { id, pw, gender, name, nickname ,role, skill, profileImg,  } = member; // 변수를 추출하여 사용
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMember({ ...member, [name]: value });
    };
  
 // ******************************************************** 
    // 회원가입 함수
    const joinMember = async (e) => {
      e.preventDefault();
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
// ***************************************************


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
              <input className="form-control" type="text" name="id" value={member.id} id="id" onChange={handleChange} placeholder='4~15자 이내로 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pw">비밀번호</label>
              <input className="form-control" type="password" name="pw" id="pw" value={member.pw} onChange={handleChange} placeholder='비밀번호를 입력해주세요(8자리 이상)' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="pw_check">비밀번호 확인</label>
              <input className="form-control" type="text" name="pw_check" id="pw_check" placeholder='비림번호를 한번 더 입력해주세요.' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">이름</label>
              <input className="form-control" type="text" name="name" id="name" value={member.name} onChange={handleChange} placeholder='이름을 입력해주세요' />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="nickname">닉네임</label>
              <input className="form-control" type="text" name="nickname" id="nickname" value={member.nickname} onChange={handleChange} placeholder='닉네임을 입력해주세요' />
            </div>


            {/* 소속 */}
            <div className="mb-3">
              <label className="form-label" htmlFor="classname">소속</label>
              <div className="dropdown">
                <button style={{ width: '100%' }} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {selectedValue || '소속 선택'} {/* 선택한 값 또는 초기 텍스트를 버튼 안에 표시 */}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li onClick={() => handleDropdownClick("데이터디자인반")} className="dropdown-item">데이터디자인반</li>
                  <li onClick={() => handleDropdownClick("빅데이터반")} className="dropdown-item">빅데이터분석반</li>
                  <li onClick={() => handleDropdownClick("풀스택반")} className="dropdown-item">풀스택반</li>
                </ul>
              </div>
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
                  onChange={handleChange}//{handleGenderChange}
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
                  onChange={handleChange} //{handleGenderChange}
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
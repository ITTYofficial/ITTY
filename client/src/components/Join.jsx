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
    profileImg: '',

  });

  const { id, pw, gender, name, nickname, role, skill, profileImg, } = member; // 변수를 추출하여 사용

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


            {/* 역할 */}
            <div className="mb-3">
              <div className="mb-3">
                <h2 className={style.Join_font_box5}>포지션</h2>
              </div>
              <select className="form-control" style={{backgroundColor:"rgb(229, 229, 229)"}}>
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
              <select className="form-control" style={{backgroundColor:"rgb(229, 229, 229)"}} name="skill">
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
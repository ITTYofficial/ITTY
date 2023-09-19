import React, { useEffect, useState } from "react";
import PlayBoard from "../css/PlayBoardList.module.css";
import LeftContainer from "./LeftContainer";
import { Link } from "react-router-dom";
import axios from "axios";

const PlayBoardList = () => {
  // 장터리스트 담을 State
  const [playList, setPlayList] = useState([]);
  const [memberInfo, setMemberInfo] =useState({});
  const [nickname, setNickname] =useState("");
  console.log("member정보 그냥 맨앞:",memberInfo);
  // 회원정보 조회 함수 -> 09:44 member값을 찾지 못함 -> 09:18 props에 값이 없음 => props의 원천지를 모르겠음(광영이한테 묻기!)
  // const memberSearching = async(nickname) => {
  //   try{
  //   console.log("props:",props.writer);
  //   console.log("nickname",nickname);
  //    const res= await axios
  //     .get(`http://localhost:8088/member/memberSearching?nickname=${nickname}`)

  //       console.log(res);
  //       setMemberInfo(res.data.member)
      
  //   }
  //   catch(err){
  //     alert("통신에 실패했습니다.");
  //     console.log(err);
  //   };
  // };

  // 장터 리스트 조회 함수
  const readPlayList = async (props) => {
  
    await axios
      .get("http://localhost:8088/play/playList")
      .then(async (res) => {
        console.log(res);
        setPlayList(res.data.play);
        
        // 각 writer 값에 대해 순차적으로 요청을 보냄.
        for (let play of res.data.play) {
            setNickname(play.writer);
            console.log('확인용', play.writer);

            // 회원 정보 조회
            try{
              
                const res= await axios
                    .get(`http://localhost:8088/member/memberSearching?nickname=${play.writer}`)
                console.log('res',res);

                console.log('***res.data.member:',res.data.member);
             

                setMemberInfo(res.data.member)
                console.log('***멤바요:',memberInfo);

            }
            catch(err){
                alert("통신에 실패했습니다.");
                console.log(err);
            };
        }
      })
      .catch((err) => {
        alert("통신에 실패했습니다.");
        console.log(err);
      });
};

  // 페이지 렌더링시 조회 함수 실행
  useEffect(() => {
    readPlayList();

  },[]); 

  const PlayItem = ({ props }) =>(
    
    // 회원 정보 조회
    // const memberSearching = async() => {
    //       // 각 writer 값에 대해 순차적으로 요청을 보냄.
    //       // for (let play of playList) {
    //         setNickname(play.writer);
    //         console.log('확인용', play.writer);

    //         try{
              
    //             const res= await axios
    //                 .get(`http://localhost:8088/member/memberSearching?nickname=${play.writer}`)
    //             console.log('res',res);
    //             console.log('***res.data.member:',res.data.member);
             

    //             setMemberInfo(res.data.member)
    //             console.log('***멤바요:',memberInfo);

    //         }
    //         catch(err){
    //             alert("통신에 실패했습니다.");
    //             console.log(err);
    //         };
    //       //}
    //     };
    //       useEffect(() => {
    //         memberSearching();
        
    //       },[]); 
    

  
    
  <div className={PlayBoard.Main_container_list_detail}>
      <div>
        <p className={PlayBoard.b_date}>{props.createdAt}</p>
        <Link to={`/playboardDetail/${props._id}`}>
          <h4>{props.title}</h4>
        </Link>
        {/* <p>글 내용 영역</p> */}
        <p>👁‍🗨{props.views} 💬4</p>
      </div>

      <div className={PlayBoard.Main_grid_profile}>
        <span className={PlayBoard.profile_text}>
          {/* <p>데이터 디자인</p> */}
          <p>{memberInfo.class? memberInfo.class:'미인증 회원'}</p>
          <h4>{props.writer}</h4>
        </span>
        <span className={PlayBoard.profile_pic}>
          <img src={memberInfo.profileImg} />
        </span>
      </div>
    </div>
  );
console.log("member정보 실행할 위치 뒤:",memberInfo);
  return (


    <div className={PlayBoard.Main_container}>
      <LeftContainer />
      <div className={PlayBoard.right_container}>
        <div className={PlayBoard.Main_container_banner}></div>
        <div className={PlayBoard.right_container_button}>
          <h2>자유게시판⚽</h2>
          <a href="/playBoardWrite">작성하기</a>
        </div>

        <div className={PlayBoard.Main_container_list}>
          {/* 글 반복 시작 */}
          {playList.map((item) => (
            <PlayItem key={item._id} props={item} />
          ))}
          {/* 글 반복 끝 */}
        </div>
      </div>
    </div>
  );
};

export default PlayBoardList;

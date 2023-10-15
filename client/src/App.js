import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import PlayBoardList from "./components/PlayBoardList";
import PlayBoardDetail from "./components/PlayBoardDetail";
import "./css/reset.css";
import MarketList from "./components/MarketList";
import MarketDetail from "./components/MarketDetail";
import StudyList from "./components/StudyList";
import Join from "./components/Join";
import Login from "./components/Login";
import QuillTest from "./components/QuillTest";
import PlayBoardWrite from "./components/PlayBoardWrite";
import { QuillContext } from "./context/QuillContext";
import { useEffect, useState } from "react";
import TestPage from "./components/TestPage";
import ProjectWrite from "./components/ProjectWrite";
import MarketWrite from "./components/MarketWrite";
import StudyWrite from "./components/StudyWrite";

import ReviewList from "./components/ReviewList";
import TipList from "./components/TipList";
import TipDetail from "./components/TipDetail";
import TipWrite from "./components/TipWrite";
import StudyDetail from "./components/StudyDetail";
import PortDetail from "./components/PortDetail";
import PortList from "./components/PortList";
import ReviewDetail from "./components/ReviewDetail";
import ReviewWrite from "./components/ReviewWrite";

import QnaDetail from "./components/QnaDetail";
import QnaList from "./components/QnaList";
import QnaWrite from "./components/QnaWrite";
import PortWrite from "./components/PortWrite";
import MyPage_profile from "./components/MyPage_profile";
import MyPage_message from "./components/MyPage_message";
import CropperTest from "./components/CropperTest";

import AnonymityList from "./components/AnonymityList"
import AnonymityWrite from "./components/AnonymityWrite"
import AnonymityDetail from "./components/AnonymityDetail"

import "./css/quill_content_font_style.css"
import "./css/Paging.css"
import axios from "axios";
import SearchResult from "./components/SearchResult";

function App() {
  // 회원가입과 로그인부분 헤더/푸터 렌더링 유무 함수


  const location = useLocation();

  const RenderHeaderAndFooter = () => {
    return location.pathname !== "/join" && location.pathname !== "/login";
  };

  // 게시판 작성 데이터를 전역적 사용하기 위한, 작성된 글 데이터를 담을 State
  const [value, setValue] = useState("");
  // 댓글 작성 데이터
  const [coValue, setCoValue] = useState("");
  // 대댓글 작성 데이터
  const [reCoValue, setReCoValue] = useState("");

  // 댓글 데이터를 전역적으로 사용하기 위한 State
  const [commentList, setCommentList] = useState([]);
  const [anonyCommentList, setAnonyCommentList] = useState([]);

  // 쪽지 데이터 컨텍스트 용 스테이트
  const [messageInfo, setMessageInfo] = useState({})

  const [memberInfo, setMemberInfo] = useState({})

  const memberSearching = async () => {
    const id = sessionStorage.getItem('memberId')
    if(id){

      await axios
      .get(`http://localhost:8088/member/memberSearching?id=${id}`)
      .then((res) => {
        setMemberInfo(res.data.member);
      })
      .catch((err) => {
        console.log('err :', err);
      })
    }
};

  // 댓글 조회 함수
  const getComment = (id) => {
    console.log('조회함수 진입');
    console.time('소요시간');
    axios.get(`http://localhost:8088/comment/commentList?postId=${id}`)
      .then((res) => {
        console.log('확인!', res.data);
        setCommentList(res.data.comments)
        console.timeEnd('소요시간');
      })
  }


  // 댓글 삭제 함수
  // 미사용중, 대댓글에는 삭제기능 적용안됨, 구조 변경 필요
  const deleteComment = (commentId, postId, boardType) => {
    alert('댓글 삭제');
    let obj = {
      commentId: commentId,
      postId: postId,
      boardType: boardType
    }
    axios.post(`http://localhost:8088/comment/delete`, obj)
      .then((res) => {
        getComment(postId);
        alert('삭제 완료')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 대댓글 삭제 함수
  const deleteReComment = (commentId, postId, index, boardType) => {
    console.log('볼타 확인', boardType);
    alert('대댓글 삭제');
    let obj = {
      commentId: commentId,
      postId: postId,
      index: index,
      boardType: boardType
    }
    axios.post(`http://localhost:8088/comment/deleteReComment`, obj)
      .then((res) => {
        getComment(postId);
        alert('삭제 완료')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 익명 댓글 조회 함수
  const getAnonyComment = (id) => {
    console.log('id 받아옴?', id);
    axios.get(`http://localhost:8088/anony/anonyCommentList?postId=${id}`)
      .then((res) => {
        console.log('확인!', res.data);
        setAnonyCommentList(res.data.anonyComment)
      })
  }

  // 익명 댓글 삭제 함수
  const deleteAnonyComment = (commentId, postId) => {
    alert('댓글 삭제');
    let obj = {
      commentId: commentId,
      postId: postId
    }
    axios.post(`http://localhost:8088/anony/commentdelete`, obj)
      .then((res) => {
        getAnonyComment(postId);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // 익명 대댓글 삭제 함수
  const deleteAnonyReComment = (commentId, postId, index) => {
    alert('대댓글 삭제');
    let obj = {
      commentId: commentId,
      postId: postId,
      index: index
    }
    axios.post(`http://localhost:8088/anony/deleteReComment`, obj)
      .then((res) => {
        getAnonyComment(postId);
      })
      .catch((err) => {
        console.log(err);
      })
  }




  // // 새창을 열었을 로그인이 풀리는 문제 해결하기위한 코드
  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 실행할 코드 작성
  //   const localKey = 'protect-memberId';
  //   const sessionKey = 'protect-nickname';

  //   const handleStorageChange = (event) => {
  //     if (!event.newValue) return;

  //     // 세션 스토리지에 값이 있을 때, 로컬 스토리지에 데이터를 저장하고 삭제
  //     if (event.key === sessionKey && sessionStorage.getItem('memberId')) {
  //       localStorage.setItem(localKey, event.newValue);
  //       localStorage.removeItem(localKey);
  //     } else if (
  //       (event.key === localKey || event.key === sessionKey) &&
  //       (!sessionStorage.getItem('memberId') || !sessionStorage.getItem('nickname'))
  //     ) {
  //       // 로그인 상태가 아니라면 로컬 스토리지에서 세션 스토리지로 데이터를 옮김
  //       const memberId = event.key === localKey ? event.newValue : sessionStorage.getItem('memberId');
  //       const nickname = event.key === sessionKey ? event.newValue : sessionStorage.getItem('nickname');
  //       sessionStorage.setItem('memberId', memberId);
  //       sessionStorage.setItem('nickname', nickname);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   // 세션 스토리지에 데이터가 없을 경우 로컬 스토리지에서 데이터 가져오기
  //   if (!sessionStorage.getItem('memberId') || !sessionStorage.getItem('nickname')) {
  //     localStorage.setItem('protect-temp', '1');
  //     localStorage.removeItem('protect-temp');
  //   }

  //   // 컴포넌트가 언마운트될 때 실행할 코드 작성
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  // QuillContext에 담길 데이터들
  const inQuillContext = {
    // 게시판 Quill 
    value: value,
    setValue: setValue,
    // 댓글 Quill
    coValue: coValue,
    setCoValue: setCoValue,
    reCoValue: reCoValue,
    setReCoValue: setReCoValue,
    // 댓글 관리
    commentList: commentList,
    anonyCommentList: anonyCommentList,
    setCommentList: setCommentList,
    getComment: getComment,
    deleteComment: deleteComment,
    deleteReComment: deleteReComment,
    // 익명 댓글
    getAnonyComment: getAnonyComment,
    setAnonyCommentList: setAnonyCommentList,
    deleteAnonyComment: deleteAnonyComment,
    deleteAnonyReComment: deleteAnonyReComment,

    // 쪽지 정보
    messageInfo:messageInfo,
    setMessageInfo:setMessageInfo,

    // 회원 정보
    memberInfo:memberInfo,
    setMemberInfo:setMemberInfo
  }

  return (
    <div className="Container">
      <QuillContext.Provider value={inQuillContext}>
        {RenderHeaderAndFooter() && <Header />}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/playboardList" element={<PlayBoardList />}></Route>
          <Route path="/playBoardWrite" element={<PlayBoardWrite />}></Route>
          <Route path="/playboardDetail/:id" element={<PlayBoardDetail />}></Route>

          <Route path="/studyList" element={<StudyList />}></Route>
          <Route path="/studyWrite" element={<StudyWrite />}></Route>
          <Route path="/studyDetail/:id" element={<StudyDetail />}></Route>

          <Route path="/projectList" element={<ProjectList />}></Route>
          <Route path="/projectWrite" element={<ProjectWrite />}></Route>
          <Route path="/projectDetail/:id" element={<ProjectDetail />}></Route>

          <Route path="/marketList" element={<MarketList />}></Route>
          <Route path="/marketWrite" element={<MarketWrite />}></Route>
          <Route path="/marketDetail/:id" element={<MarketDetail />}></Route>

          <Route path="/quillTest" element={<QuillTest />}></Route>
          <Route path="/testPage" element={<TestPage />}></Route>

          <Route path="/tipList" element={<TipList />}></Route>
          <Route path="/tipWrite" element={<TipWrite />}></Route>
          <Route path="/tipDetail/:id" element={<TipDetail />}></Route>

          <Route path="/portList" element={<PortList />}></Route>
          <Route path="/portWrite" element={<PortWrite />}></Route>
          <Route path="/portDetail/:id" element={<PortDetail />}></Route>

          <Route path="/reviewList" element={<ReviewList />}></Route>
          <Route path="/reviewWrite" element={<ReviewWrite />}></Route>
          <Route path="/reviewDetail/:id" element={<ReviewDetail />}></Route>

          <Route path="/qnaList" element={<QnaList />}></Route>
          <Route path="/qnaWrite" element={<QnaWrite />}></Route>
          <Route path="/qnaDetail/:id" element={<QnaDetail />}></Route>

          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/myPage/profile" element={<MyPage_profile />}></Route>
          <Route path="/myPage/message" element={<MyPage_message />}></Route>
          <Route path="/cropperTest" element={<CropperTest />}></Route>

          <Route path="/searchResult/:searchTerm" element={<SearchResult />}></Route>

          <Route path="/anonymityList" element={<AnonymityList />}></Route>
          <Route path="/anonymityWrite" element={<AnonymityWrite />}></Route>
          <Route path="/anonymityDetail/:id" element={<AnonymityDetail />}></Route>




        </Routes>
        {RenderHeaderAndFooter() && <Footer />}
      </QuillContext.Provider>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import styles from "../css/SearchResult.module.css";
import LeftContainer from "./LeftContainer";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Study');
  

  const categoryButtons = [
    { label: "스터디🐣", value: "Study" },
    { label: "프로젝트🛵", value: "Project" },
    { label: "교환장터🥕", value: "Market" },
    { label: "자유게시판⚽", value: "Play" },
    { label: "Tip🧷", value: "Tip" },
    { label: "QnA💡", value: "QnA" },
  ];

  useEffect(() => {
    console.time("걸린시간");
    // 서버로 searchTerm을 보내고 결과를 받아오는 함수
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/board/searchBoard?searchTerm=${searchTerm}`
        );
        const data = await response.json();
        setSearchResults(data.allBoards);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      console.timeEnd("걸린시간");
    };

    fetchSearchResults();
  }, [searchTerm]);

  console.log("받아온 값 확인", searchResults);

  // 검색한 값 하이라이트
  const boldSearchTerm = (text, searchTerm) => {
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, (match) => `<span class="${styles.boldText}">${match}</span>`);
  };

  //   const [studyDiv, setStudyDiv] = useState(false);
  //   const [projectDiv, setProjectDiv] = useState(false);
  //   const [marketDiv, setMarketDiv] = useState(false);
  //   const [playDiv, setPlayDiv] = useState(false);
  //   const [tipDiv, setTipDiv] = useState(false);
  //   const [qnaDiv, setQnaDiv] = useState(false);

  //   const visibleStudy = () => {
  //     setStudyDiv(true);
  //   };
  //   const visibleProject = () => {
  //     setProjectDiv(true);
  //     setStudyDiv(false);
  //   };
  //   const visibleMarket = () => {
  //     setMarketDiv(true);
  //     setStudyDiv(false);
  //     setProjectDiv(false);
  //   };
  //   const visiblePlay = () => {
  //     setPlayDiv(true);
  //   };
  //   const visibleTip = () => {
  //     setTipDiv(true);
  //   };
  //   const visibleQna = () => {
  //     setQnaDiv(true);
  //   };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div>
          <h2 className={styles.list_title}>
            <span>{searchTerm}</span> 에 대한 검색 결과🔍
          </h2>
          <div className={styles.search_Cate}>
            {/* <span>
              <button onClick={() => handleCategoryClick("Study")}>
                스터디🐣
              </button>
              <button onClick={() => handleCategoryClick("Project")}>
                프로젝트🛵
              </button>
              <button onClick={() => handleCategoryClick("Market")}>
                교환장터🥕
              </button>
              <button onClick={() => handleCategoryClick("Play")}>
                자유게시판⚽
              </button>
            </span>
            <span>
              <button onClick={() => handleCategoryClick("Tip")}>Tip🧷</button>
              <button onClick={() => handleCategoryClick("QnA")}>QnA💡</button>
            </span> */}
            <span>
              {categoryButtons.map((button) => (
                <button
                  key={button.value}
                  onClick={() => handleCategoryClick(button.value)}
                  className={
                    activeCategory === button.value ? styles.activeButton : ""
                  }
                >
                  {button.label}
                </button>
              ))}
            </span>
          </div>
        </div>

        {/* 스터디 */}
        {activeCategory && (
          <div>
            {searchResults
              .find((result) => result.boardType === activeCategory)
              ?.posts.map((item) => (
                <div className={styles.search_wrap_list}>
                  <div>
                    <div className={styles.search_detail}>
                      <span>
                        <p>{item.createdAt}</p>
                        <h4>
                          <div dangerouslySetInnerHTML={{ __html: boldSearchTerm(item.title, searchTerm) }} />
                        </h4>
                      </span>
                      <span>
                        <h5>{item.writer}</h5>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* {searchResults.map((item) => (
          <div className={styles.search_wrap_list}>
            <div>
              <h2>{item.boardType}</h2>
              {item.posts.map((board) => (
                <div className={styles.search_detail}>
                  <span>
                    <p>{board.createdAt}</p>
                    <h4>{board.title}</h4>
                  </span>
                  <span>
                    <h5>{board.writer}</h5>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default SearchResult;

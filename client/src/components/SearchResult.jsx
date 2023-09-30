import React, { useEffect, useState } from "react";
import styles from "../css/SearchResult.module.css";
import LeftContainer from "./LeftContainer";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Pagination from "react-js-pagination";

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Study");
  const [maxPage, setMaxPage] = useState();

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
        console.log("쳌", data.allBoards);
        setMaxPage(data.allBoards[6].posts.length);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      console.timeEnd("걸린시간");
    };

    fetchSearchResults();
  }, [searchTerm]);

  console.log("받아온 값 확인", searchResults);
  console.log("길이 확인", maxPage);

  // 검색한 값 하이라이트
  const boldSearchTerm = (text, searchTerm) => {
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(
      regex,
      (match) => `<span class="${styles.boldText}">${match}</span>`
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // 페이징 부분
    // 클릭된 카테고리의 결과 배열의 길이를 계산하여 maxPage 업데이트
    const categoryResults = searchResults.find(
      (result) => result.boardType === category
    );
    if (categoryResults) {
      setMaxPage(categoryResults.posts.length);
      setPage(1); // 클릭된 카테고리가 바뀌었으므로 페이지를 1로 초기화
    }
    // 페이징 부분
  };

  // 페이징 부분
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    console.log("페이지 확인", page);
  };

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // 페이징 부분

  console.log(
    "화긴",
    searchResults.find((result) => result.boardType === "Play")
  );

  return (
    <div className={styles.Main_container}>
      <LeftContainer />
      <div className={styles.right_container}>
        <div>
          <h2 className={styles.list_title}>
            <span>{searchTerm}</span> 에 대한 검색 결과🔍
          </h2>
          <div className={styles.search_Cate}>
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

        {searchResults.length === 0 && (
          <div className={styles.spinner_container}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* 스터디 */}
        {activeCategory && (
          <div>
            {searchResults
              .find((result) => result.boardType === activeCategory)
              ?.posts.slice(startIndex, endIndex) // 현재 페이지의 결과만
              .map((item) => (
                <div className={styles.search_wrap_list}>
                  <div>
                    <div className={styles.search_detail}>
                      <span>
                        <p>{item.createdAt}</p>
                        <h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: boldSearchTerm(item.title, searchTerm),
                            }}
                          />
                        </h4>
                      </span>
                      <span>
                        <h5>{item.writer}</h5>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {searchResults
              .find((result) => result.boardType === activeCategory)
              ?.posts.slice(startIndex, endIndex).length === 0 && (
                <div className={styles.search_wrap_list}>
                  <div>
                    <div className={styles.search_detail}>
                      <span className={styles.search_none}>
                        <h1>검색된 결과가 없습니다.</h1>
                      </span>
                    </div>
                  </div>
                </div>
              )}

            <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={maxPage}
              pageRangeDisplayed={10}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

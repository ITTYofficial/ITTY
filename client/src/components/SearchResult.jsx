import React, { useEffect, useState } from 'react'
import styles from '../css/SearchResult.module.css'
import LeftContainer from './LeftContainer'
import { useParams } from 'react-router-dom'

const SearchResult = () => {
    const { searchTerm } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.time('걸린시간');
        // 서버로 searchTerm을 보내고 결과를 받아오는 함수
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8088/board/searchBoard?searchTerm=${searchTerm}`);
                const data = await response.json();
                setSearchResults(data.allBoards);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            console.timeEnd('걸린시간');
        };

        fetchSearchResults();
    }, [searchTerm]);

    console.log('받아온 값 확인', searchResults);

    return (
        <div className={styles.Main_container}>
            <LeftContainer />
            <div className={styles.right_container}>
                <h2>검색결과 : {searchTerm}</h2>
                <hr></hr>
                {searchResults.map((item) =>
                    <div>
                        <div>
                            게시판 타입 : {item.boardType}
                            {item.posts.map((board) =>
                                <div>
                                    <div>
                                        제목 : {board.title}
                                    </div>
                                    <div>
                                        작성자 : {board.writer}
                                    </div>
                                </div>)}
                            <hr></hr>
                        </div>
                    </div>)}
            </div>

        </div>
    )
}

export default SearchResult
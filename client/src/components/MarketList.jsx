import React, { useEffect, useState } from 'react'
import LeftContainer from './LeftContainer'
import style from '../css/MarketList.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

const MarketList = () => {

    // 장터리스트 담을 State
    const [marketList, setMarketList] = useState([]);

    // 장터 리스트 조회 함수
    const readMarketList = async () => {
        await axios.get('http://localhost:8088/market/marketList')
            .then((res) => {
                console.log(res);
                setMarketList(res.data.market)
            })
            .catch((err) => {
                alert('통신에 실패했습니다.')
                console.log(err);
            })
    }

    // 임시 게시글 등록 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8088/market/write");
        } catch (error) {
            
        }
      };

    // 페이지 렌더링시 조회 함수 실행
    useEffect(() => {
        readMarketList();
    }, [])

    // 각 장터 게시글 정보를 담을 내부 컴포넌트
    const MarketItem = () => (
        <div className={style.Market_content}>
            <div className={style.Market_content_img}>
                <Link to={'/marketDetail'}>
                    <img src='https://mblogthumb-phinf.pstatic.net/MjAyMjAyMDZfMjM4/MDAxNjQ0MTMyMjY5NTE5.9QiJKAEWRxcFEPApSkt2s2jpl_ptooODuxaGYSrcJs0g.2Rb0qjSn6xzCYYOGzaeg2dtCA3f2YdhpEApxSdGjpBQg.JPEG.hformula/SE-ba9ade28-f21a-4e39-a0b7-4aca0c9acc65.jpg?type=w800'></img>
                </Link>
                <div className={style.text1}>
                    <Link to={'/marketDetail'}>
                        <p>정보처리기사 실기책</p>
                    </Link>
                    <p>8,000원</p>
                </div>
                <div className={style.text2}>
                    <p>2시간전</p>
                    <p>조회수 30 댓글 2</p>
                </div>
            </div>

        </div>
    )


    return (

        <div className={style.Main_container}>
            <LeftContainer />
            <div>
                <h1>중고장터</h1>
                <div className={style.Market_list}>

                    <MarketItem />
                    <MarketItem />
                    <MarketItem />
                    <MarketItem />
                    <MarketItem />
                    <MarketItem />


                </div>
            </div>
        </div>
    )
}

export default MarketList
import React from 'react'
import LeftContainer from './LeftContainer'
import style from "../css/MarketDetail.module.css";


const MarketDetail = () => {
  return (
    <div className={style.Main_container}>
      <LeftContainer/>

      <div className={style.right_container}>
      <img src='https://www.ilovepc.co.kr/news/photo/202207/44037_107077_5412.jpg'/>
      <img src='https://m.locknlockmall.com/data/goods/1/2021/05/68766_tmp_d41d8cd98f00b204e9800998ecf8427e8167large.jpeg'/>
      <img src='https://blog.kakaocdn.net/dn/JG1wO/btrxwYJmjk8/PMA5CkoMv0HgXJq3kHS5HK/img.png'/>

      </div>

    </div>
  )
}

export default MarketDetail
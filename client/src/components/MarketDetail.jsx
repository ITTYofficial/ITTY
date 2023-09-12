import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LeftContainer from './LeftContainer';
import style from "../css/MarketDetail.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const MarketDetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={style.Main_container}>
      <LeftContainer />

      <div className={style.right_container}>
        <div className={style.Img_slide}>
          <Slider {...settings}>
            <div>
              <img src='https://www.ilovepc.co.kr/news/photo/202207/44037_107077_5412.jpg' alt="Slide 1" />
            </div>
            <div>
              <img src='https://m.locknlockmall.com/data/goods/1/2021/05/68766_tmp_d41d8cd98f00b204e9800998ecf8427e8167large.jpeg' alt="Slide 2" />
            </div>
            <div>
              <img src='https://blog.kakaocdn.net/dn/JG1wO/btrxwYJmjk8/PMA5CkoMv0HgXJq3kHS5HK/img.png' alt="Slide 3" />
            </div>
          </Slider>
        </div>

        <div className={style.right_middle_container}>
          <div>
            <div>
              <img src='data:image/png;base64,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'></img>
            </div>
            <div>
              <p>데이터디자인</p>
              <p>데이터디자인</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#F0F0F0' }}>
            <p>👁‍🗨 28 💬 4</p>
            <p>2 일전</p>
            <p>14,000 원</p>
          </div>
        </div>
        <hr />
        <div className={style.sub_content}>
          <p>제목나올부분</p>
          <p>내용나올부분</p>
        </div>

        <div className={style.division_line}>
          <div>
            <p>댓글 2</p>
          </div>
        </div>
        <div className={style.sub_comment}>
          <div className={style.Comment_flex}>
            <div className={style.Profile_img_comment}>
              <Image src="https://i1.ruliweb.com/img/22/07/28/18242f82cc7547de2.png" roundedCircle />

            </div>
            <div className={style.Comment_write}>
              <p>댓글 작성부분</p>
            </div>
          </div>
          <div className={style.Comment_write_button}>
            <Button variant="primary">작성하기</Button>
          </div>
          <hr />
          {/* 댓글 반복 시작 */}
          <div className={style.Detail_comment}>
            <div className={style.Comment_flex}>
              <div className={style.Profile_img_comment}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6k4KSEWGAq157LW3wCKU2DJmvoQyrfRfcA&usqp=CAU'></img>
              </div>
              <div>
                <p>빅데이터분석반</p>
                <p>언제취뽀</p>
                <p>2시간 전</p>
              </div>
            </div>
            <div className={style.Detail_comment_content}>
              <p>댓글입니다 낄낄</p>
            </div>
          </div>
          {/* 댓글 반복 끝 */}

        </div>
      </div>

    </div>
  )
}

export default MarketDetail;

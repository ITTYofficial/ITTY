const express = require('express')
const router = express.Router()
const Market = require('../../schemas/community/market')


// 글 작성
router.post('/write', async (req, res) => {
    try {
        let obj;

        obj = {
            writer: "허허",
            title: "무선 키보드 팝니다",
            content: "편해요. 그냥 편함 ㅋㅋ",

            // 페이지 만들어지면 수정할 것
            // 글 번호는 어떤식으로 생성할 건지, 이미지 주소는 어떻게 줄일 건지 방법 찾기
            // 글 수정과 함께 동작할 수 있도록 작성할 것

            postNum: 6,
            createdAt: "2023-09-08 12:50",
            views: 0,
            
            itemCategory: "문구류",
            imgPath: "https://www.ilovepc.co.kr/news/photo/202207/44037_107077_5412.jpg",
            price: 20000

        };
        const market = new Market(obj);
        await Market.insertMany(market);
        res.json({ message: "게시글이 업로드 되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
});

// 글 리스트 조회
router.get('/marketList', async (req, res) => {
    try {
        const market = await Market.find();
        res.json({ market })
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
})

module.exports = router;
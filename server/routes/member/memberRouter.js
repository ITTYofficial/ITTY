const express = require('express')
const router = express.Router()
const Member = require('../../schemas/member/member')

// 회원가입
router.post('/join', async (req, res) => {
    console.log('Member 회원가입');
    try {
        let obj;

        obj = {
            id: req.body.id,
            pw: req.body.pw,
            sex: req.body.sex,
            name: req.body.name,
            role: req.body.role,
            skill: req.body.skill,
            point: req.body.point,
            profileImg: req.body.profileImg
        };
        
        const member = new Member(obj);
        await Study.insertMany(obj);
        res.json({ message: "회원가입이 완료되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
})

// 밑으로 로그인,수정, 탈퇴 등등 작성할 것

module.exports = router
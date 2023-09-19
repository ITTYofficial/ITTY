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
            gender: req.body.gender,
            name: req.body.name,
            nickname:req.body.nickname,
            role: req.body.role,
            skill: req.body.skill,
            point: req.body.point,
            profileImg: req.body.profileImg
        };
        
        const member = new Member(obj);
        await Member.insertMany(member);
        res.json({ message: "회원가입이 완료되었습니다." });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
})
//아이디 중복체크
router.post('/idCheck',async(req,res)=>{
  try { 
  // 요청된 아이디를 데이터베이스에서 찾는다.
    const idChecking = await Member.findOne({ id: req.body.id });
    if (!idChecking) {
      return res.json({
        idCheckingSuccess: true,
        message: '사용가능한 아이디입니다.',
      });
    }else{
      return res.json({
        idCheckingfail: false,
        message: '아이디가 중복됩니다.',
      });
    }
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
});

router.post('/nicknameCheck',async(req,res)=>{
  try { 
    // 닉네임이 null값일 때 출력할 말
    if (req.body.nickname === '') {
      return res.json({
        nicknameCheckingfail : false,
        message: '닉네임을 입력해주세요.',
      });
    }
  // 요청된 아이디를 데이터베이스에서 찾는다.
    const nicknameChecking = await Member.findOne({ nickname: req.body.nickname });

    if (!nicknameChecking ) {
      return res.json({
        nicknameCheckingSuccess: true,
        message: '사용가능한 닉네임입니다.',
      });
    }else{
      return res.json({
        nicknameCheckingfail: false,
        message: '닉네임이 중복됩니다.',
      });
    }
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
});

// 닉네임 값으로 특정 회원 조회
router.get('/memberSearching',async (req, res) => {
  try {
    const nickname = req.query.nickname;
    console.log( '2. nickname',nickname);
    const member = await Member.findOne({nickname:nickname});
     console.log('3. class :',member.class);
    if (member) {
      res.json( {member
                // nickname:member.nickname,
                // profileImg : member.profileImg,
                // class:member.class           
        });
    } else {
      res.status(200).json({ member: '값을 찾지 못함' }); // 찾지 못한 경우 null을 반환하거나 다른 처리를 할 수 있습니다.
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
}
  );

// 닉네임 값으로 특정 회원 조회 -> 위에꺼 안되서 시도
router.get('/findMember', async (req, res) => {
  try {
    const nickname = req.query.nickname;
    const member = await Member.find({nickname:nickname});    
    res.json({ member })
   
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
})


//로그인(토큰화 x 버전)
router.post('/login', async (req, res) => {
  try {
    // 요청된 아이디를 데이터베이스에서 찾는다.
    const member = await Member.findOne({ id: req.body.id });
    if (!member) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    console.log("db속 비밀번호 :",member.pw);
    console.log("페이지 입력한 비밀번호 :",req.body.pw);
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인.
    if (member.pw !== req.body.pw) {
      return res.json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }

    // 비밀번호까지 맞다면 로그인 성공
    res.status(200).json({ loginSuccess: true, memberId: member.id, memberNickname:member.nickname });

  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});



// 로그인( 토큰화 버전)
// router.post("/login", (req, res) => {
//   //1. 요청된 이메일이 데이터베이스에 있는 지 찾는다.
//   Member.findOne({ id: req.body.id }, (err, member) => {
//     if (!member) {
//       return res.json({
//         loginSuccess: false,
//         message: "이메일에 해당하는 유저가 없습니다.",
//       });
//     }
//     //2. 1조건 충족 시, 비번 맞는 지 확인
//     member.comparePw(req.body.pw, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: "비밀번호가 틀렸습니다.",
//         });
//       //3. 2조건 충족 시, 토큰 생성
//       member.makeToken((err, member) => {
//         if (err) return res.status(400).send(err);
//         //토큰을 저장한다. where? 쿠키 OR 로컬 스토리지 OR 세션스토리지
//         //쿠키 name : value
//         res
//           .cookie("x_auth", member.token)
//           .status(200)
//           .json({ loginSuccess: true, id: member.id });
//       });
//     });
//   });
// });

// 커밋

// 로그아웃
// router.get("/logout", auth, (req, res) => {
//   Member.findOneAndUpdate({ _id: req.member._id }, { token: "" }, (err, member) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });


// 밑으로 로그인,수정, 탈퇴 등등 작성할 것
//Authentication 자격 (관리자화면, 비회원화면)


//auth는 미들웨어
// app.get("/member/auth", auth, (req, res) => {
//   //여기까지 오면 미들웨어를 통과했다는 거임
//   //그렇다면 Auth가 True라는 뜻
//   res.status(200).json({
//     _id: req.member._id,
//     // 0> 일반 유저 ^ 나머지 관리자
//     isAdmin: req.member.role === 0 ? false : true,
//     isAuth: true,
//     id: req.member.email,
//     name: req.member.name,
//     lastname: req.member.lastname,
//     role: req.member.role,
//     image: req.member.image,
//   });
// });

// //LogOut
// app.get("/api/users/logout", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });



module.exports = router
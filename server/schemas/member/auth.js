const { Member } = require("./member");

// middleware 파트인데 작업 편의를 위해 member.js와 같은 폴더에 넣었음
let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  //1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  //2. 토큰을 복호화한다 > 유저를 찾는다.
  Member.findByToken(token, (err, member) => {
    if (err) throw err;
    if (!member) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.member = member;
    next();
  });
  //3. 2조건 만족시 Okay

  //4. 2조건 불만족시 NO
};

module.exports = { auth };
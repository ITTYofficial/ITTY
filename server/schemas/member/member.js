const mongoose = require("mongoose");
// board스키마 정의(컬렉션 구조) DTO와 비슷함
const { Schema } = mongoose;

const {
  Types: { ObjectId }
} = Schema;

const memberSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique : true
    // ref: "User"
  },
  pw: {
    type: String,
    required: true
  },
  gender: { // <성별> 
    type: String,
    required: true,
    enum : ['male', 'female']  // 둘중 하나만 들어가게 끔 하는 코드인데 저장하는 txt는 추후 변경해도 될듯
  },
  name: { // <이름>  -> 근데 닉네임은 필요없나..?
    type: String,
    required: true    
  },
  nickname : {
    type: String,
    required: true,
    unique : true
  },
  role: { // <분야> : 백엔드, 프론트엔드, DBM ...
    type: String,
    // enum : ['back-end', 'front-end' ...., 'Other'] //-> 쓸까말까 고민 프론트 단에서 choice하게 제한 둬도 상관없어서 + 내가 임의로 모든 것을 기입할 순 없으니 기타 같은거 만들고 유저가 추가가능하게 해야될듯
  },
  skill: { // <기술> : 자바 , 파이썬 , C, 자바스크립트 , ....
    type: String,
   // enum : ['Java', 'JavaScript' ...., 'Other'] //-> 위와 동
  },
  point: { // <포인트> : 랭킹에 쓸 포인트
    type: Number,
   
  },
  profileImg : { // 프로필이미지
    type: String,
    default : 'ITTY\client\public\img\기본프로필사진.PNG' // 유저가 이미지 안 넣었을 때 쓸 이미지 주소
 
  },
  class :{ // 소속 : 일단은 넣어 뒀는데 어떻게할지는 나중에 봐야알듯 -> routes에는 추가 x (추후 검증절차같아서리...)
    type: String 
    
  },
  date:{// 가입 날짜 
    type: Date,
    default: Date.now   
  },
  tokenExp:{ //토큰 만료기한
    type: Number,
  },


});

// ************************************* 로그인 ㄱ ************************

//비밀번호를 암호화 하는 코드;; 어렵당
//mongoose 기능 pre -> save 전에 function을 한다
memberSchema.pre("save", function (next) {
  var member = this;
  if (member.isModified("pw")) {
    //비밀번호 암호화 bcrypt
    //salt 생성 (saltRounds= 10)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(member.pw, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return next(err);
        member.pw = hash;
        next();
      });
    });
  } else {
    next();
  }
});

memberSchema.methods.comparePw = function (plainPw, cb) {
  // plainPassword : 123456 / 암호화된 비번 : #!@#1241@$1~!asd
  //plainPassword 암호화 해서 비교한다
  bcrypt.compare(plainPw, this.pw, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

memberSchema.methods.makeToken = function (cb) {
  var member = this;
  //jsonwebToken을 이용하여 토큰 생성 user._id는 mongo id
  // user._id + 'secretToken' = token
  //jwt.sign(payload, secretKey)이 기대값
  //user_.id는 문자열이 아니기 때문에 .toHexString으로 24바이트 16진수 문자열로 바꿔줌?
  var token = jwt.sign(member._id.toHexString(), "secretToken");
  member.token = token;
  member.save(function (err, member) {
    if (err) return cb(err);
    cb(null, user);
  });
};

memberSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //token decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는지 확인
    member.findOne({ _id: decoded, token: token }, function (err, member) {
      if (err) return cb(err);
      cb(null, member);
    });
  });
};

//const Member = mongoose.model("Member", memberSchema);


module.exports = mongoose.model("Member", memberSchema,"Member");
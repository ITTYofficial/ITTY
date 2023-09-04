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
  sex: { // <성별> 
    type: String,
    required: true,
    enum : ['Male', 'Female']  // 둘중 하나만 들어가게 끔 하는 코드인데 저장하는 txt는 추후 변경해도 될듯
  },
  name: { // <이름>  -> 근데 닉네임은 필요없나..?
    type: String,
    required: true    
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
    default : '기본이미지경로' // 유저가 이미지 안 넣었을 때 쓸 이미지 주소
 
  }


});

module.exports = mongoose.model("Member", memberSchema,"Member");
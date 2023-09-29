const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas");
const path = require("path");

connect();

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); // 내부 url 파서 사용
app.use(express.static(path.join(__dirname + '/public'))); // 정적 파일 위치 설정

app.use("/board", require("./routes/boardRouter"));
app.use("/main", require("./routes/community/mainRouter"));
app.use("/study", require("./routes/community/studyRouter"));
app.use("/project", require("./routes/community/projectRouter"));
app.use("/market", require("./routes/community/marketRouter"));
app.use("/play", require("./routes/community/playRouter"));
app.use("/comment", require("./routes/community/commentRouter"));
app.use("/member", require("./routes/member/memberRouter"));
app.use("/save", require("./routes/community/imgUpload"));
app.use("/port", require("./routes/community/portRouter"));
app.use("/review", require("./routes/community/reviewRouter"));
app.use("/tip", require("./routes/community/tipRouter"));
app.use("/qna", require("./routes/community/qnaRouter"));
// app.use("/kakao", require("./routes/member/kakaoLoginRouter"));
app.use("/board", require("./routes/community/boardSearchRouter"));
app.use("/anony", require("./routes/community/anonyRouter"));
app.use("/anonyComment", require("./routes/community/anonyCommentRouter"));
app.use("/total", require("./routes/member/totalRouter"));
// app.use("/message", require("./routes/messageRouter"));



app.listen(8088, () => {
    console.log("8088 진입");
});
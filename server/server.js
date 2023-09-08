const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas");
const path = require("path");
const multer = require("multer")

connect();

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); // 내부 url 파서 사용
app.use(express.static(path.join(__dirname + '/public'))); // 정적 파일 위치 설정

app.use("/board", require("./routes/boardRouter"));
app.use("/study", require("./routes/community/studyRouter"));
app.use("/project", require("./routes/community/projectRouter"));

// multer 설정
const upload = multer({
    storage: multer.diskStorage({
        // 저장할 장소
        destination(req, file, cb) {
            cb(null, 'public/uploads');
        },
        // 저장할 이미지의 파일명
        filename(req, file, cb) {
            const ext = path.extname(file.originalname); // 파일의 확장자
            console.log('file.originalname', file.originalname);
            // 파일명이 절대 겹치지 않도록 해줘야한다.
            // 파일이름 + 현재시간밀리초 + 파일확장자명
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});

// 하나의 이미지 파일만 가져온다.
app.post('/img', upload.single('img'), (req, res) => {
    // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
    // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
    console.log('전달받은 파일', req.file);
    console.log('저장된 파일의 이름', req.file.filename);

    // 파일이 저장된 경로를 클라이언트에게 반환해준다.
    const IMG_URL = `http://localhost:8088/uploads/${req.file.filename}`;
    console.log(IMG_URL);
    res.json({ url: IMG_URL });
});


app.listen(8088, () => {
    console.log("8088 진입");
});
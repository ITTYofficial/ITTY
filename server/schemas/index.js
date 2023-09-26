const mongoose = require("mongoose");
// 몽고DB랑 연결하는 곳 (-> myBatis-config랑 유사)

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", false);
        }

        mongoose
            .connect("mongodb+srv://hr:1234@cluster0.bjwmlof.mongodb.net/test_data", {
                dbName: "test_data",
                useNewUrlParser: true, 
                useUnifiedTopology: true, // 아직 무슨옵션인지 모름..
            })
            .then(() => {
                console.log("몽고디비 연결 성공");
            })
            .catch((error) => {
                console.log("몽고디비 연결 에러", error);
            });
    };

    connect();

    mongoose.connection.on("error", (error) => {
        console.log("몽고디비 연결 에러", error);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
        connect();
    });

    //require("./user");
    require("./board");
    require("./community/study");
    require("./community/project");
    require("./community/market");
    require("./community/comment");
    require("./community/port");
    require("./community/review");
    require("./community/tip");
    require("./community/qna");
    require("./community/anony");
    require("./community/anonyComment");
    require("./member/member");
};
const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
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
};
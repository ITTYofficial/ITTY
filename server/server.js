const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas");

connect();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/board", require("./routes/boardRouter"));
app.use("/study", require("./routes/community/studyRouter"));
app.use("/project", require("./routes/community/projectRouter"));
app.use("/market", require("./routes/community/marketRouter"))

app.listen(8088, () => {
    console.log("8088 진입");
});
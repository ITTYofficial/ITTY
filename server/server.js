const express = require("express");
const app = express();
const connect = require("./schemas");

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/board", require("./routes/boardRouter"));

app.listen(8088, () => {
    console.log("8088 진입");
});
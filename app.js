require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());


app.use("/api/users", userRouter);
app.listen(process.env.app_port, () => {
    console.log("server up in : ",process.env.app_port);
})
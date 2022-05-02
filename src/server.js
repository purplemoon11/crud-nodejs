const express = require("express")
const app = express()
const env = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const mongoose = require("mongoose")

//dotenv
env.config()

//morgan
app.use(morgan("tiny"));

//parsing
app.use(express.json())

//routes
const router = require('./routes/router')

//load routes
app.use('/', router)

//connecting to ejs
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

//loading assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

//mongoose connection
mongoose.connect(
    `mongodb+srv://crud:${process.env.MONGODB_PW}@cluster0.6ajkm.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
    ).then(()=>{
        console.log("Database connected.")
    })
//connecting to port
app.listen(process.env.PORT, ()=>{
    console.log(`The server is running at port ${process.env.PORT}`)
})
const express = require("express");
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const uri = "mongodb+srv://joe_san:joesan2021@cluster0.akicx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected Database")
    }).catch((err)=>{console.log(err)})
var WallPapers = new mongoose.Schema({
    img: String,
    desc: String,
    likes: Number
})
var WallPaper = mongoose.model("WallPapper",WallPapers)
app.use(cors({
    origin: "*",
    methods: ['GET','POST']
}))
app.use(bodyParser.urlencoded({extended: false}))

app.post("/uploadImg",(req,res)=>{
    var img = req.body.img;
    var tags = req.body.tags;
    var resp = new WallPaper({
        img: img,
        desc: tags,
        likes: 0
    })
    resp.save(()=>{
        console.log("created record")
        res.send("done")
    })
})
app.get("/imgs",async(req,res)=>{
    var resp = await WallPaper.find({}).lean()
    res.send(resp)
})
app.get("/search",async(req,res)=>{
    var tags = req.query.tags;
    var resp = await WallPaper.find({desc: {$regex: ".*"+tags+".*"}});
    res.send(resp)
})


app.listen(process.env.PORT||8080,()=>{
    console.log("server Running on 8080")
})

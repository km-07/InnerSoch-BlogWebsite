import express from "express";


const app = express();
app.use(express.urlencoded())
app.use(express.static("public"))

let dataArr = [];

app.get("/", (req, res) =>{
    res.render("index.ejs", {dataArr: dataArr});
});

app.get("/postAdd", (req, res) =>{
    res.render("postAdd.ejs");
}); 

app.get("/postEdit", (req, res) =>{
    res.render("postEdit.ejs");
});

app.post("/submitPost", (req, res) => {
    dataArr.push(req.body);
    res.render("index.ejs", {dataArr: dataArr});
})

app.post("/submitEdit", (req, res) => {
    if(req.body.blogPassword === dataArr[req.body.blogNumber - 1].password){
    dataArr[req.body.blogNumber - 1].title = req.body.newTitle;
    dataArr[req.body.blogNumber - 1].content = req.body.newContent;
    res.render("index.ejs", {dataArr: dataArr});
    }
    else{
        res.send("<h1>Password does not match!</h1>")
    }
})
 
app.post("/submitDelete", (req, res) => {
    if(req.body.blogPassword === dataArr[req.body.blogNumber - 1].password){
        if(req.body.blogNumber == 1) {
            dataArr.shift(); }
        else { dataArr.splice(req.body.blogNumber - 1, req.body.blogNumber - 1); }

        res.render("index.ejs", {dataArr: dataArr});
    }
    else { res.send("<h1>Password does not match!</h1>") }
}) 

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
}); 
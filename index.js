import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(morgan(":date[web] :method :url :status :res[content-length] - :response-time ms"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req, res)=> {
    res.render("home.ejs");
})
app.post("/authenticate", (req, res)=>{
    res.locals.heading = "Enter the authorized credentials to create blogs 😄";
    res.render("authenticate.ejs");
})
app.post("/authenticate/verified", (req, res)=> {
    if (req.body["name"].trim()==="Mukund" && req.body["password"].trim()==="Madhav310107"){
        console.log(req.body);
        res.render("verified.ejs");
    }
    else{
        res.locals.heading = "Wrong credentials!(Try again)"
        console.log(req.body);
        res.render("authenticate.ejs");
    }
})
app.post("/authenticate/verified/readPost", (req, res)=>{
    res.locals=req.body;
    res.render("readPost.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
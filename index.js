
const express = require("express");

const app = express();
const mongooose = require("mongoose");
const AuthRoute = require("./routes/auth");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const userPost = require("./routes/posts");
const categoriesRoute = require("./routes/categories");


dotenv.config();

mongooose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,

}).then(console.log("Connected to MONGODB")).catch((err)=> console.log(err));

app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/user",userRouter);
app.use("/api/posts",userPost);
app.use("/api/categories",categoriesRoute);


app.use('/',(req,res) => {
    console.log("Hey We're using nodejs");
})



app.listen( "5000", () =>  {
     console.log("Backend is running")
})
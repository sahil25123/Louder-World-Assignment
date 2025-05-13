import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();


const app = express();
const port= 9000;

const connection = async () =>{
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected")

}
catch(e){
    console.log(e.message);
}

}
connection();

app.get("/" , (req,res)=>{
    res.send("1st route")
})
app.listen(port,()=>{
    console.log(`server is listning on port ${port}`)

})
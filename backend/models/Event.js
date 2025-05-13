import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        require: true,
        type:String,

    },
    date:String, 
    location:String,
    image:String,
    link:{
        type:String, 
        require:true
    },
    desctiption :String, 
},
{
    timestamps:true
});

const Event = mongoose.model("Event" ,eventSchema );

export default Event;

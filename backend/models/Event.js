import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        required: true,
        type:String,

    },
    date:String, 
    location:String,
    image:String,
    link:{
        type:String, 
        required:true
    },
    description :String, 
    subscribers: [{
        email: {
            type: String,
            required: true
        },
        subscribedAt: {
            type: Date,
            default: Date.now
        }
    }]
},
{
    timestamps:true
});

const Event = mongoose.model("Event" ,eventSchema );

export default Event;

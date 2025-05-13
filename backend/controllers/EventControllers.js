import Event from "../models/Event.js";


// GET all events
 export const getEventController =  async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    }
    catch(e){
        res.status(500).json({message:e.message});


    }
    
};

// POST a new event
 export const postEventController = async(req, res) => {
    const {title, date, location, image, link, description} = req.body;
    const newEvent = new Event ({
        title, 
        date,
        location,
        image,
        link, 
        description
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(200).json({savedEvent});
    }
    catch(e){
        res.status(500).json({message:e.message})

    }

};



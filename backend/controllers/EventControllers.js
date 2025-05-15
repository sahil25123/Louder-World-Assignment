import Event from "../models/Event.js";


// GET all events
export const getEventController = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    }
    catch(e) {
        res.status(500).json({message: e.message});
    }
};

// POST a new event
export const postEventController = async(req, res) => {
    const {title, date, location, image, link, description} = req.body;
    const newEvent = new Event({
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
    catch(e) {
        res.status(500).json({message: e.message});
    }
};

// Subscribe to an event
export const subscribeToEventController = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if email already subscribed
        const alreadySubscribed = event.subscribers.some(sub => sub.email === email);
        if (alreadySubscribed) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        // Add subscriber
        event.subscribers.push({ email });
        await event.save();

        res.status(200).json({ 
            success: true,
            redirectUrl: event.link
        });
    } catch(e) {
        res.status(500).json({ message: e.message });
    }
};



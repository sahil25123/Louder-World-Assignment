import express from "express";
import { getEventController, postEventController, subscribeToEventController } from "../controllers/EventControllers.js";
import scrapeEvents from "../scraper/scrapeEvents.js";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/events", getEventController);
router.post("/events", postEventController);
router.post("/events/:id/subscribe", subscribeToEventController);

router.get("/scrape", async (req, res) => {
    try {
        const scrapedData = await scrapeEvents();

        // Optional: clear old events before inserting
        await Event.deleteMany();

        const inserted = await Event.insertMany(scrapedData);
        res.status(200).json({ message: "Scraped and saved", inserted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
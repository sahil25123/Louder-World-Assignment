import path from "path";
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes.js"
import scrapeEvents from "./scraper/scrapeEvents.js"
import Event from "./models/Event.js"
import cors from "cors";

import { contains } from "cheerio";

const app = express();
const port = 9000;

const _dirname = path.resolve();

dotenv.config();

const allowedOrigns = [
    "https://louder-world-assignment-ffto.onrender.com/" 
    ,"http://localhost:3000"
];

// Enable CORS for all routes
app.use(cors({
    origin: allowedOrigns, // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
            retryWrites: true,
            retryReads: true
        });
        console.log("MongoDB Connected")
    }
    catch(e) {
        console.error("MongoDB connection error:", e.message);
        process.exit(1); // Exit if cannot connect to database
    }
}

// Call connection before starting the server
connection();

// Function to perform scraping
const performScraping = async () => {
    try {
        console.log("Starting scheduled scraping...");
        const scrapedData = await scrapeEvents();
        
        // Use transactions for atomic operations
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await Event.deleteMany({}, { session });
            await Event.insertMany(scrapedData, { session });
        });
        await session.endSession();
        
        console.log("Scraping completed successfully");
    } catch (error) {
        console.error("Scraping failed:", error.message);
    }
};

// Schedule scraping every 6 hours
setInterval(performScraping, 6 * 60 * 60 * 1000);

// Initial scraping
performScraping();

app.use(express.json());


app.use("/api", routes);

app.use(express.static(path.join(_dirname , "/frontend/dist")))
app.get("/*path", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
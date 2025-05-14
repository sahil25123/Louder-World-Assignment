import axios from "axios";
import * as cheerio from "cheerio";

const scrapeEvents = async () => {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        };

        console.log("Fetching data from Timeout Sydney...");
        const { data } = await axios.get("https://www.timeout.com/sydney/things-to-do", { headers });
        console.log("Data fetched successfully");

        const $ = cheerio.load(data);
        const events = [];

        // Updated selectors based on Timeout's current structure
        $('article').each((i, el) => {
            const title = $(el).find('h3').text().trim();
            const description = $(el).find('p').first().text().trim();
            const link = $(el).find('a').first().attr('href');
            const image = $(el).find('img').first().attr('src');

            if (title && link) {
                events.push({
                    title,
                    description,
                    link: link.startsWith('http') ? link : `https://www.timeout.com${link}`,
                    image,
                    date: "TBA",
                    location: "Sydney"
                });
            }
        });

        console.log(`Found ${events.length} events`);
        if (events.length === 0) {
            console.log("HTML content received:", data.substring(0, 500) + "..."); // Log first 500 chars of HTML
        }

        return events;
    } catch (error) {
        console.error("Scraping failed with error:", error.message);
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        }
        return [];
    }
};

export default scrapeEvents;

import axios from "axios";
import cheerio from "cheerio";

const scrapeEvents = async () => {
    try {
        const { data } = await axios.get("https://www.timeout.com/sydney/things-to-do");
        const $ = cheerio.load(data);

        const events = [];

        $(".card-content").each((i, el) => {
            const title = $(el).find("h3.card-title").text().trim();
            const description = $(el).find(".card-description").text().trim();
            const link = $(el).find("a").attr("href");
            const image = $(el).parent().find("img").attr("src");

            if (title && link) {
                events.push({
                    title,
                    description,
                    link: `https://www.timeout.com${link}`,
                    image,
                    date: "TBA", // Not always available
                    location: "Sydney"
                });
            }
        });

        return events;
    } catch (error) {
        console.error("Scraping failed:", error.message);
        return [];
    }
};

export default scrapeEvents;

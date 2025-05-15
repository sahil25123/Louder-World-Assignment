# Sydney Events Platform

A full-stack web application that aggregates and displays events in Sydney, allowing users to browse events and subscribe to receive ticket information.

## Features

- 🎫 Real-time event listings from Sydney
- 📧 Email subscription system for event tickets
- 🔄 Automatic event updates every 6 hours
- 📱 Responsive Material-UI design
- 🔍 Event categorization and filtering
- 🔗 Direct links to original event sources

## Tech Stack

### Frontend
- React 18
- Vite
- Material-UI
- Axios
- date-fns

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cheerio (for web scraping)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sydney-events.git
cd sydney-events
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=9000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:9000

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Add a new event
- `POST /api/events/:id/subscribe` - Subscribe to an event with email

### Scraping
- `GET /api/scrape` - Manually trigger event scraping

## Project Structure

```
sydney-events/
├── backend/
│   ├── controllers/
│   │   └── EventControllers.js
│   │   
│   ├── models/
│   │   └── Event.js
│   │   
│   ├── routes/
│   │   └── routes.js
│   │   
│   ├── scraper/
│   │   └── scrapeEvents.js
│   │   
│   └── index.js
│   
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventCard.jsx
│   │   │   └── EmailModal.jsx
│   │   │   
│   │   ├── App.jsx
│   │   └── main.jsx
│   │   
│   ├── public/
│   │   └── index.html
│   │   
│   └── package.json
│   
└── README.md 
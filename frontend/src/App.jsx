import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  AppBar, 
  Toolbar,
  CircularProgress,
  Box
} from '@mui/material';
import EventCard from './components/EventCard';
import EmailModal from './components/EmailModal';
import axios from 'axios';

const API_URL = 'https://louder-world-assignment-ffto.onrender.com/api';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSubscribe = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/events/${selectedEvent._id}/subscribe`, { email });
      if (response.data.success) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to subscribe');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Sydney Events
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard 
                event={event} 
                onGetTickets={() => handleGetTickets(event)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <EmailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubscribe}
        eventTitle={selectedEvent?.title}
      />
    </>
  );
}

export default App;

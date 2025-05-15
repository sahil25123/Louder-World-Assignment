import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';

const EventCard = ({ event, onGetTickets }) => {
  // Safely format the date
  const formatDate = (dateString) => {
    if (!dateString || dateString === "TBA") return dateString;
    
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMMM d, yyyy') : dateString;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={event.image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={event.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {event.title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {formatDate(event.date)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {event.categories?.map((category) => (
            <Chip 
              key={category} 
              label={category} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          ))}
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={onGetTickets}
        >
          Get Tickets
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard; 
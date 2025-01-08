// src/components/ShowPersonList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, CircularProgress, Box } from '@mui/material';
import { Grid } from '@mui/material';


import PersonCard from './PersonCard';

function ShowPersonList() {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get(`https://diettracker-1zc0.onrender.com/api/diets`)
      
      .then((res) => {
        setPerson(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log('Error from ShowPersonList ->', err);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to right,rgb(159, 100, 231),rgb(82, 151, 214))', // Subtle blue gradient
        borderRadius: 10,
        boxShadow: 6,
      }}
    >
      {/* Card-like Box for Title and Button */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 700,
          padding: 4,
          borderRadius: 6,
          backgroundColor: '#ffffff',
          boxShadow: 6,
          textAlign: 'center',
          zIndex: 1,
          position: 'relative',
          mb: 4, // Adds margin below the title box
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          sx={{
            fontWeight: 700,
            letterSpacing: 1.5,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 2,
          }}
        >
          Person List
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            fontSize: 18,
            fontStyle: 'italic',
            marginBottom: 4,
            fontWeight: '300',
          }}
        >
          View, manage, and add new persons
        </Typography>

        {/* Floating Add Button */}
        <Button
          component={Link}
          to="/person-create"
          variant="contained"
          color="secondary"
          sx={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '15px 35px',
            fontSize: '1.2rem',
            fontWeight: 600,
            borderRadius: '50px',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#ff4081', // Coral hover effect
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)',
              transform: 'translateX(-50%) scale(1.1)',
            },
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          Add New Person
        </Button>
      </Box>



      {loading ? (
        // Show a loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
        <Grid container spacing={3}>
          {person.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary">
                No Persons found!
              </Typography>
            </Grid>
          ) : (
            person.map((person, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <PersonCard person={person} />
              </Grid>
            ))
          )}
        </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ShowPersonList;
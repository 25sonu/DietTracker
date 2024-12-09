// src/components/ShowBookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Grid CircularProgress, Box } from '@mui/material';

import PersonCard from './PersonCard';

function ShowPersonList() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get(`/api/persons`)
      .then((res) => {
        setPersons(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log('Error from ShowPersonList ->', err);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Persons List
      </Typography>

      <Button
        component={Link}
        to="/create-person"
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add New Person
      </Button>

      {loading ? (
        // Show a loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {books.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary">
                No persons found!
              </Typography>
            </Grid>
          ) : (
            books.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BookCard book={book} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default ShowBookList;
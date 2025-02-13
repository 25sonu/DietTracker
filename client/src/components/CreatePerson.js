import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Slide,
  ToastContainer,
  toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';

// const URL = process.env.REACT_APP_URL;

const CreatePerson = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: '',
    age: '',
    contact_number: '',
    weight: '',
    bmi: '',
  });

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`https://diettracker-1zc0.onrender.com/api/diets`, person)
      .then(() => {
        setPerson({
          name: '',
          age: '',
          contact_number: '',
          weight: '',
          bmi: '',
        });

        toast.success('Person added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Slide,
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(() => {
        toast.error('Something went wrong, try again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Slide,
        });
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <ToastContainer theme="dark" />
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'background.paper', color: 'text.primary' }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Add Person
        </Typography>
        <Typography variant="body1" textAlign="center" mb={3} color="text.secondary">
          Fill in the details to create a new person.
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={person.name}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                variant="outlined"
                type="number"
                value={person.age}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Weight"
                name="weight"
                variant="outlined"
                type="number"
                value={person.weight}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="BMI"
                name="bmi"
                variant="outlined"
                type="number"
                value={person.bmi}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact_number"
                variant="outlined"
                type="tel"
                value={person.contact_number}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  component={Link}
                  to="/person-list"
                  variant="outlined"
                  color="secondary"
                >
                  Back to List
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePerson;

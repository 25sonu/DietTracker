import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePersonInfo = () => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
    weight: "",
    bmi: "",
    contact_number: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://diettracker-1zc0.onrender.com/api/diets/${id}`)
      .then((res) => setPerson(res.data))
      .catch(() => toast.error("Failed to fetch person details!", { theme: "dark" }));
  }, [id]);

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://diettracker-1zc0.onrender.com/api/diets/${id}`, person)
      .then(() => {
        toast.success("Person updated successfully!", { theme: "dark" });
        setTimeout(() => navigate(`/detail/${id}`), 2000);
      })
      .catch(() => toast.error("Failed to update person!", { theme: "dark" }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <ToastContainer theme="dark" />
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Update Person
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={person.name}
                onChange={onChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                value={person.age}
                onChange={onChange}
                fullWidth
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Weight"
                name="weight"
                value={person.weight}
                onChange={onChange}
                fullWidth
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="BMI"
                name="bmi"
                value={person.bmi}
                onChange={onChange}
                fullWidth
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                name="contact_number"
                value={person.contact_number}
                onChange={onChange}
                fullWidth
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Back to List
        </Button>
      </Box>
    </Container>
  );
};

export default UpdatePersonInfo;

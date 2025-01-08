import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
 
  Grid,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack"; // Import the useSnackbar hook

//const URL = process.env.REACT_APP_API_URL; // Access environment variable

function UpdatePersonInfo() {
  const [person, setPerson] = useState({
   name: "",
    age: "",
    weight:"",
    bmi:"",
    contact_number: "",
    // admit_Date: "",
    // previous_admit: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Initialize the notification hook


  useEffect(() => {
    axios
      .get(`https://diettracker-1zc0.onrender.com/api/diets/${id}`)
      .then((res) => {
        setPerson(res.data);
      })
      .catch((err) => {
        console.error("Error from UpdatePerson GET request", err);
        enqueueSnackbar("Failed to fetch person details.", { variant: "error" });
      });
  }, [id, enqueueSnackbar]); // Remove 'URL' from the dependency array because it is a stable constant.
  // React expects 'URL' to be in the dependency array, but since it doesn't change, it can be safely excluded.

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://diettracker-1zc0.onrender.com/api/diets/${id}`, person)
      .then(() => {
        enqueueSnackbar("Person updated successfully!", { variant: "success" });
        navigate(`/detail/${id}`);
      })
      .catch((err) => {
        console.error("Error in UpdatePerson PUT request", err);
        enqueueSnackbar("Failed to update person details. Please try again.", { variant: "error" });
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Person
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Update Person's Information
        </Typography>
      </Box>

      <Box mb={2}>
        <Button
          component={Link}
          to="/list"
          variant="outlined"
          color="secondary"
          fullWidth
        >
          Show Persons List
        </Button>
      </Box>

      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={person.name}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Age"
              type="Number"
              name="age"
              value={person.age}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="weight"
              type="Number"
              name="weight"
              value={person.weight}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="bmi"
              name="bmi"
              value={person.bmi}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>

          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Admit Date"
              type="date"
              name="admit_Date"
              value={patient.admit_Date}
              onChange={onChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid> */}

<Grid item xs={12}>
            <TextField
              fullWidth
              label="contact_number"
              type="Number"
              name="contact_number"
              value={person.contact_number}
              onChange={onChange}
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
              Update Person
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default UpdatePersonInfo;
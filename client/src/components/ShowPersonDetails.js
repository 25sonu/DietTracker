import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = process.env.REACT_APP_URL;

const ShowPersonDetails = () => {
  const [person, setPerson] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://diettracker-1zc0.onrender.com/api/diets/${id}`)
      .then((res) => setPerson(res.data))
      .catch((err) => toast.error("Failed to fetch person details!", { theme: "dark" }));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://diettracker-1zc0.onrender.com/api/diets/${id}`)
      .then(() => {
        toast.success("Person deleted successfully!", { theme: "dark" });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => toast.error("Error deleting person!", { theme: "dark" }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <ToastContainer theme="dark" />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={
                  person.image ||
                  "https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2017/05/1140-calorie-counting-app.imgcache.rev62ecd194605c05dfff72b7963164dd1d.jpg"
                } // Use person's image or a placeholder
                alt={person.name || "Person Image"}
              />
            </Card>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {person.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Age: {person.age}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" paragraph>
                <strong>Contact Number:</strong> {person.contact_number}
              </Typography>
              <Typography variant="body1">
                <strong>BMI:</strong> {person.bmi}
              </Typography>
              <Typography variant="body1">
                <strong>Weight:</strong> {person.weight}
              </Typography>
              {/* <Typography variant="body1">
                <strong>Admit Date:</strong> {person.admit_Date || "N/A"}
              </Typography> */}
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/edit-person/${id}`}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="text"
            component={Link}
            to="/person-list"
            sx={{ ml: "auto" }}
          >
            Back to List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowPersonDetails;

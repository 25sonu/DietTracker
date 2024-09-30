const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController'); // Ensure this path is correct

// Define the routes
router.post('/clinics', clinicController.createClinic);
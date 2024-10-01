const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController'); // Ensure this path is correct

// Define the routes
router.post('/diet', dietController.createDiet);
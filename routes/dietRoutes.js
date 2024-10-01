const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController.js'); // Ensure this path is correct

// Define the routes
router.post('/diets', dietController.createDiet);
router.get('/diets', dietController.getAllDiets);

module.exports = router;
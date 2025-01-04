const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController.js'); // Ensure this path is correct

// Define the routes
// router.get ('/test', (req,res)=>{
//     res.status(200).send('test route is working');
// })
router.post('/diets', dietController.createDiet);
router.get('/diets', dietController.getAllDiet);
router.get('/diets/:id', dietController.getDietById);
router.put('/diets/:id', dietController.updateDiet);   
router.delete('/diets/:id', dietController.deleteDiet);

module.exports = router;
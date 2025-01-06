const DietModel = require('../models/dietModel');

exports.createDiet= async (req, res) => {
    try {
        let singleDiet= new DietModel({
            name: req.body.name,
            age: req.body.age,
            weight:req.body.weight,
            BMI:req.body.BMI,
            contact_number: req.body.contact_number
        });
        singleDiet = await singleDiet.save();
        res.send(singleDiet);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getAllDiet= async (req, res) => {
    try {
        const allDiets = await DietModel.find();
        res.send(allDiets);
    } catch (err) {
        res.status(400).send(err.message);
    }
    //console.log(dietController);
};

exports.getDietById = async (req, res) => {
    try {
        const dietById = await DietModel.findById(req.params.id);
        if (!dietById) return res.status(404).send('Diet not found in database');
        res.send(dietById);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateDiet = async (req, res) => {
    try {
        const updatedDiet = await DietModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: req.body.age,
            weight:req.body.weight,
            BMI:req.body.BMI,
            contact_number: req.body.contact_number
        }, { new: true }); 

        if (!updatedDiet) return res.status(404).send('Diet not found in database'); 
        res.send(updatedDiet); 
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

// Delete a room by ID
exports.deleteDiet = async (req, res) => {
    try {
        const dietById = await DietModel.findByIdAndDelete(req.params.id); // Find room by ID and delete it
        if (!dietById) return res.status(404).send('Room not found in database'); // If room is not found, return 404
        res.send("Diet deleted successfully"); // Send success message
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};


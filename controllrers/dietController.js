const DietModel = require('../models/dietModel');

exports.createDiet= async (req, res) => {
    try {
        let singleDiet= new DietModel({
            name: req.body.name,
            age: req.body.age,
            contact_number: req.body.contact_number
        });
        singleDiet = await singleDiet.save();
        res.send(singleDiet);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getAllDiets = async (req, res) => {
    try {
        const allDiets = await DietModel.find();
        res.send(allDiets);
    } catch (err) {
        res.status(400).send(err.message);
    }
};


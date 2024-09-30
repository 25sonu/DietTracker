const DietModel = require('../models/bookModel');

exports.createDiet= async (req, res) => {
    try {
        let singleDiet= new DietModel({ title: req.body.title, author: req.body.author });
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

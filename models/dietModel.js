const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const dietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
        // unique: true // Uncomment if you want to enforce uniqueness on age
    },
   contact_number:{
    type:Number,
    required: true
   },
   admit_Date:{
    type: Date,
    required:true
   },
   BMI:{
    type:Number,
    required:true
   },
   availability:{
    type:Boolean,
    required:true
   }
 
});

const DietModel = mongoose.model('Diet', dietSchema);
module.exports = DietModel; // Corrected here
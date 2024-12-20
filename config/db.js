// const mongoose = require ('mongoose');

// const connectDB = async () => {
//     try {
//         mongoose.set("strictQuery", true)
//         await mongoose.connect( 'mongodb+srv ://diet_tracker_admin:diet_tracker_admin@diet-tracker.xvfvs.mongodb.net/?retryWrites=true&w=majority&appName=diet-tracker');
//         console.log('Connected to MongoDB');
//     }

//      catch (err) {
//         console.error(err.message)
//         console.log("FIX THE DB CONNECTIVITY CODE OR MONGODB URL/USERNAME/PASSWORD!!")
//        // process.exit(1);
//     }
// };

// module.exports = connectDB;



const mongoose = require ('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://diet_tracker_admin:diet_tracker_admin@diet-tracker.xvfvs.mongodb.net/?retryWrites=true&w=majority&appName=diet-tracker'
           );
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB
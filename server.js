const express = require('express');
const connectDB = require('./config/db');
 const dietRoutes = require('./routes/dietRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("HomePage Of The App");
});

app.use('/api', dietRoutes); // Use diet routes with prefix '/api'

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
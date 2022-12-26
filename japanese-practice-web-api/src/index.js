const express = require('express');
const path = require('path');
const router = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const port = 9000;

app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to MongoDB
try{
    mongoose.connect('mongodb://127.0.0.1:27017/japra', {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("connect success");
}catch{
    console.log("error connect to db")
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Initialize routes
router.routes(app);

// Log for app init
app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
})
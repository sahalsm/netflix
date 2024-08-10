const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'*',
}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/netflix-backend");

const content_route = require('./routes/contentRoute');
const user_route = require('./routes/userRoute');

// Mount routes
app.use('/api/content', content_route);
app.use('/api/user', user_route);


app.listen(8000, function(){
    console.log("server is running");
})


// nodemon ./index.js

//start from update user
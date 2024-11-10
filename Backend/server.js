require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RenderRooms = require('./Routes/RenderingRoomRoutes')

const app = express();

 mongoose.connect(process.env.dbURI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
            console.log('Connected to the Database');

        })    
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));


app.use((req,res,next) => {
    console.log(req.path, req.method);
    next()
})

//Routes Usage
app.use(RenderRooms);

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})


process.env
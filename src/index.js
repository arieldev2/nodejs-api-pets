const express = require('express');

const app = express();

//database
const { mongoose } = require('../database');

//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(express.json());

//routes
app.use('/api/user', require('./routes/auth'));
app.use('/api/pets', require('./routes/pet'));

//start server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
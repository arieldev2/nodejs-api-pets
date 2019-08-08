const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pets_db',
    { useNewUrlParser: true })
    .then(res => console.log('DB CONNECTED'))
    .catch(err => console.log(err));

module.exports = mongoose;
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie-api')

    mongoose.connection.on('open', () => {
        console.log("mongodb connected");
    });
    mongoose.Promise = global.Promise;
};

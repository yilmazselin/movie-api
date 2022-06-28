const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({

    title: {
        director_id: Schema.Types.ObjectId,
        type: String
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('movie', MovieSchema);
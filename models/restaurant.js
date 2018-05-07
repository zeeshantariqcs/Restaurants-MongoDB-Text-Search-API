const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    cuisine: String,
    borough: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    address: {
        building: String,
        street: String,
        zipcode: String,
        coord: [Number]
    }
}, {
    timestamps: false
});

//schema.index({'$**': 'text'});
schema.index({name: 'text',cuisine:'text'});
module.exports = mongoose.model('Restaurant', schema, 'restaurants');



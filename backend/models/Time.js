const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    },
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    }
}, {
    timestamps: true

});

module.exports = mongoose.model('Time', timeSchema)
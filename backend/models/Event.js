const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    },
    date: {
        type: Date,
        required: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
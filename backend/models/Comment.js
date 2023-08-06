const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true

});

module.exports = mongoose.model('Comment', trackSchema)
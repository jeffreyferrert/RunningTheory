const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    miles: {
        type: Number,
        required: true,
        float: true
    },
    description: {
        type: String,
        required: true
    },
    startAddress: {
        type: String,
    },
    endAddress: {
        type: String,
    }
}, {
    timestamps: true

});

module.exports = mongoose.model('Track', trackSchema)
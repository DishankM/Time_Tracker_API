const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    isPaused: {
        type: Boolean,
        default: false,
    },
    pauseTime: {
        type: Date
    },
    totalPauseDuration:{
        type: Number,
        default: 0
    },
    tag: {
        type: String
    }
});

module.exports = mongoose.model("Session", sessionSchema);
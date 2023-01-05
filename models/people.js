const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

const peopleSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    mood: [moodSchema]
}, {
timestamps: true
});

module.exports = mongoose.model('People', peopleSchema);
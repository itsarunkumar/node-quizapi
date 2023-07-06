const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0 },
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
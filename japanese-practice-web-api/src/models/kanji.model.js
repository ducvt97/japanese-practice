const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({
    kanji: { type: String, require: true, unique: true },
    vnPronounciation: { type: String, require: true },
    meaning: { type: String, require: true },
    on: { type: String, require: false },
    kun: { type: String, require: false },
    words: { type: String, require: false },
    level: { type: String, require: false },
});

exports.Kanji = mongoose.model('Kanji', kanjiSchema);
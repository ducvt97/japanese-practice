const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({
    kanji: { type: String, require: true, unique: true },
    vnSound: { type: String, require: true },
    meaning: { type: String, require: true },
    onSound: { type: String, require: false },
    kunSound: { type: String, require: false },
    words: { type: String, require: false },
    level: { type: String, require: false },
});

exports.Kanji = mongoose.model('Kanji', kanjiSchema, 'Kanji');
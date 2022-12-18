const kanjiModel = require('../models/kanji.model');

exports.getAll = (req, res, next) => {
    kanjiModel.Kanji.find({}, (err, kanji) => {
        err ? res.json({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}

exports.getByLevel = (req, res, next) => {
    kanjiModel.Kanji.find({ level: req.body.level }, (err, kanji) => {
        err ? res.json({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}

exports.getByKanji = (req, res, next) => {
    kanjiModel.Kanji.findOne({ kanji: req.query.kanji }, (err, kanji) => {
        err ? res.json({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}

exports.add = (req, res, next) => {
    const newKanji = new kanjiModel.Kanji(req.body);
    newKanji.save()
        .then(doc => res.json({status: 200, message: "Success"}))
        .catch(err => res.json({status: 404, message: err}));
}
const kanjiRouter = require('./kanji.route');

exports.routes = (app) => {
    app.use("/kanji", kanjiRouter);
}
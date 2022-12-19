const express = require('express');
const router = express.Router();
const kanjiControlller = require('../controllers/kanji.controller');

router.get("/get-all", kanjiControlller.getAll);
router.post("/get-by-level", kanjiControlller.getByLevel);
router.post("/get-by-kanji", kanjiControlller.getByKanji);
router.post("/add", kanjiControlller.add);

module.exports = router;
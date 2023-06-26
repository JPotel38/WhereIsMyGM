const express = require('express');
const router = express.Router();
const GameModel = require('../models/games');

router.get('/listgames', async function (req, res) {

    let games = await GameModel.find();

    res.send(games)
});

router.get(`/cardsgamesbytitle`, async function (req, res) {

    let gamesCardsByTitle = await GameModel.find(req.query);

    res.send(gamesCardsByTitle)
});

router.get(`/cardsgamesbygenre`, async function (req, res) {

    let gamesCardsGenre = await GameModel.find(req.query);

    res.send(gamesCardsGenre)
});

router.get(`/cardsgamesbyid/:gameId`, async function (req, res) {

    const gameById = await GameModel.findById(req.params.gameId);

    res.send(gameById)
});

module.exports = router;

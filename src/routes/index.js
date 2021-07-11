const express = require('express');
const router = express.Router();
let GameModel = require('../models/games');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('/');
});

router.get('/listgames', async function (req, res) {

    let games = await GameModel.find();

    res.send(games)
});

router.get(`/cardsgamesbytitle`, async function (req, res) {

    let gamesCardsByTitle = await GameModel.find(req.query);

    res.send(gamesCardsByTitle)
});

router.get(`/cardsgamesbygenre`, async function (req, res) {

    let gamesCardsByStyle = await GameModel.find(req.query);

    res.send(gamesCardsByStyle)
});

router.get(`/cardsgamesbyid`, async function (req, res) {

    let gamesCardsByStyle = await GameModel.find(req.query);

    res.send(gamesCardsByStyle)
});

module.exports = router;

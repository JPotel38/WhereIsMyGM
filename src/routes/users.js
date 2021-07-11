const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

router.get('/listusers', async function (req, res) {

    const users = await UserModel.find().populate('games');
    res.send(users)
});

// router.get(`/gamesbyuser`, async function (req, res, next) {
//
//
//
//     console.log(games);
//
//     res.send(games)
// });
//
// router.get(`/cardsgamesbygenre`, async function (req, res, next) {
//
//     let gamesCardsByStyle = await GameModel.find(req.query);
//
//     res.send(gamesCardsByStyle)
// });
//
// router.get(`/cardsgamesbyid`, async function (req, res, next) {
//
//     let gamesCardsByStyle = await GameModel.find(req.query);
//
//     res.send(gamesCardsByStyle)
// });

module.exports = router;

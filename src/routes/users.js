const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

router.get('/listusers', async function (req, res) {

    const users = await UserModel.find().populate('games');
    res.send(users)
});

router.get('/gamesbyuser/:id', async function (req, res) {
    try {
        const user = await UserModel.findById(req.params.id).populate('listGames');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
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

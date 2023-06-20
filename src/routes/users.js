const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

router.get('/listusers', async function (req, res) {

    const users = await UserModel.find().populate('listGames');
    res.send(users)
});

router.get('/gamesbyuser/:id', async function (req, res) {
    try {
        const userGames = await UserModel.findById(req.params.id).populate('listGames');
        res.json(userGames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/deletegame/:userId/:gameId', async function (req, res) {
    try {
        const user = await UserModel.findByIdAndUpdate(
            req.params.userId,
            { $pull: { listGames: req.params.gameId } },
            { new: true }
        ).exec();

        res.json(user.listGames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addgame/:userId/:gameId', async function (req, res) {
    try {
        const userId = req.params.userId;
        const gameId = req.params.gameId;

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { listGames: gameId } },
            { new: true }
        ).exec();

        res.json(user.listGames);
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

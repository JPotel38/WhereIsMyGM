const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');

router.get('/listusers', async function (req, res) {

    const users = await UserModel.find().populate('listGames');
    res.send(users)
});

router.get('/gamesbyuser/:userId', async function (req, res) {
    try {
        const userGames = await UserModel.findById(req.params.userId).populate('listGames');
        res.json(userGames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/listusersbygame/:gameId', async function (req, res) {
    try {
        const userGames = await UserModel.find({listGames: {$in: req.params.gameId}}).exec()
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
            {$pull: {listGames: req.params.gameId}},
            {new: true}
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
            {$addToSet: {listGames: gameId}},
            {new: true}
        ).exec();

        res.json(user.listGames);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/adress/:userId', async function (req, res) {
    try {
        const userId = req.params.userId;
        const {city, departement, postalCode, region, country} = req.body
        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'address.city': city,
                    'address.departement': departement,
                    'address.postalCode': postalCode,
                    'address.region': region,
                    'address.country': country
                }
            },
            {new: true}
        ).exec();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

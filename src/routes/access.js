const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const UserModel = require('../models/users');
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.post('/signup', async function (req, res) {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const token = uuidv4();

        const newUser = {
            _id: uuidv4(),
            lastName: req.body.lastname,
            firstName: req.body.firstname,
            userPseudo: req.body.userpseudo,
            dateInscription: Date.now(),
            email: req.body.email,
            emailStatus: 'Valid',
            password: SHA256(req.body.password + salt).toString(encBase64),
            salt,
            profilePicture: '',
            token
        };

        // In mock mode we just return the new user (not persisted between restarts)
        res.json({ result: true, user: newUser, token });
    } catch (e) {
        console.log('Signup error:', e);
        res.status(500).json({ result: false, error: 'Signup failed' });
    }
});

router.post('/login', async function (req, res) {
    let result = false;
    let error = [];
    let token = [];
    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
        let hash = SHA256(req.body.password + user.salt).toString(encBase64);
        if (hash === user.password) {
            result = true;
            let jwtSecretKey = process.env.JWT_SECRET_KEY || 'mock_secret_key';
            token.push(jwt.sign({ time: Date() }, jwtSecretKey));
        } else {
            error.push("Invalid password.");
            user = null;
        }
    } else if (!user && req.body.email !== '') {
        error.push("This email doesn't exist.");
    }

    res.json({ result, error, token, user });
});

router.post('/viewpicture', async function (req, res) {
    res.json({ result: true });
});

module.exports = router;

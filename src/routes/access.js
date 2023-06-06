const express = require('express');
const router = express.Router();
const uid2 = require("uid2");
const UserModel = require('../models/users');
const {cloudinary} = require('../utils/cloudinary');
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const salt = uid2(32);
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

router.post('/inscription', async function (req) {
    let uploadResponse;
    let newUser;
    // try {
    //     uploadResponse = await cloudinary.uploader.upload(req.body.profilePicture,
    //         {folder: "whereismygm/users"});
    // } catch (e) {
    //     console.log('Cloudinary error:', e)
    // }

    try {
        newUser = await new UserModel({
            lastName: req.body.lastname,
            firstName: req.body.firstname,
            userPseudo: req.body.userpseudo,
            dateInscription: Date.now(),
            email: req.body.email,
            emailStatus: 'Pending',
            password: SHA256(req.body.password + salt).toString(encBase64),
            salt: salt,
            token: uid2(32)
        });
        await newUser.save();
    } catch (e) {
        console.log('Saved new user error:', e)
    }

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.USER,
    //         pass: process.env.PASSWORD
    //     }
    // });
    //
    // const mailOptions = {
    //     from: 'whereismygm@gmail.com',
    //     to: req.body.email,
    //     subject: 'Test super app',
    //     text: 'Sent from My RPG APP!'
    // };
    //
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //         newUser.emailStatus = 'Rejected'
    //     } else {
    //         if (info.accepted.length > 0) {
    //             console.log(info);
    //             newUser.emailStatus = 'Valid'
    //         }
    //     }
    //
    // });

    // if (user.token) {
    //     console.log("Token ok")
    // }
    // if (user) {
    //     res.send(user);
    // } else {
    //     res.send('User not saved');
    // }
});

router.post('/connexion', async function (req, res) {
    let result = false;
    let error = [];
    let token = [];
    let user = await UserModel.findOne({email: req.body.email});

    if (user) {
        let hash = SHA256(req.body.password + user.salt).toString(encBase64);
        if (hash === user.password) {
            result = true;
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date()
            }
            token.push(jwt.sign(data, jwtSecretKey))
        } else {
            error.push("Invalid password.")
            user = null;
        }
    } else if (!user && req.body.email !== '') {
        error.push("This email doesn'\t exist.");
    }
    res.json({result, error, token, user});
});

router.post('/viewpicture', async function (req, res) {
    res.json();
});

module.exports = router;

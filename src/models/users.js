const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: String,
    departement: String,
    postalCode: String,
    region: String,
    country: String
});

const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    userPseudo: String,
    password: String,
    profilePicture: String,
    bannerPicture: String,
    email: String,
    emailStatus: String,
    address: addressSchema,
    isGameMaster: Boolean,
    smallDescription: String,
    listGames: [{type: mongoose.Schema.Types.ObjectId, ref: 'games'}],
    dateInscription: Date,
    dateLastCo: Date,
    salt: String
});


const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address: String,
    postalCode: String,
    city: String,
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
    address: AddressSchema,
    isGameMaster: Boolean,
    smallDescription: String,
    listGames: [{type: mongoose.Schema.Types.ObjectId, ref: 'games'}],
    dateInscription: Date,
    dateLastCo: Date,
    salt: String
});


const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;

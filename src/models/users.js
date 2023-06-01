const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    address: String,
    postalCode: String,
    city: String,
    country: String
});

const userSchema = mongoose.Schema({
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
    salt: String,
    token: String
});


const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;

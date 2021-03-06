const mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    id: Number,
    title: String,
    genre: String,
    description: String,
    time: Number,
    complexity: String,
    accessories: String,
    date: String,
    edition: String,
    author: String,
    editor: String,
    country: String,
    price: Number
   });


   const GameModel = new mongoose.model('games', gameSchema);

   module.exports = GameModel;
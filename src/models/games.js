const games = require('../data/games');

// Mimics Mongoose model API so routes don't need to change
const GameModel = {
    find: async (query = {}) => {
        if (!query || Object.keys(query).length === 0) {
            return games;
        }
        return games.filter(game => {
            return Object.entries(query).every(([key, value]) => {
                if (typeof value === 'string') {
                    return game[key]?.toLowerCase().includes(value.toLowerCase());
                }
                return game[key] === value;
            });
        });
    },

    findById: async (id) => {
        return games.find(game => game._id === id) || null;
    }
};

module.exports = GameModel;

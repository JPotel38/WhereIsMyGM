const usersData = require('../data/users');
const gamesData = require('../data/games');

// Deep clone to allow mutations during the session
let users = JSON.parse(JSON.stringify(usersData));

// Mimics Mongoose .populate('listGames') behaviour
const populateGames = (user) => {
    if (!user) return null;
    return {
        ...user,
        listGames: user.listGames.map(id =>
            gamesData.find(g => g._id === id) || id
        )
    };
};

const UserModel = {
    find: async (query = {}) => {
        let result = [...users];

        if (query.listGames?.$in) {
            result = result.filter(u => u.listGames.includes(query.listGames.$in));
        }

        return result;
    },

    findById: async (id) => {
        return users.find(u => u._id === id) || null;
    },

    findOne: async (query = {}) => {
        if (query.email) {
            return users.find(u => u.email === query.email) || null;
        }
        return null;
    },

    findByIdAndUpdate: async (id, update, options = {}) => {
        const index = users.findIndex(u => u._id === id);
        if (index === -1) return null;

        const user = { ...users[index] };

        // Handle $pull (remove from array)
        if (update.$pull) {
            Object.entries(update.$pull).forEach(([key, value]) => {
                user[key] = user[key].filter(item => item !== value);
            });
        }

        // Handle $addToSet (add to array if not present)
        if (update.$addToSet) {
            Object.entries(update.$addToSet).forEach(([key, value]) => {
                if (!user[key].includes(value)) {
                    user[key] = [...user[key], value];
                }
            });
        }

        // Handle $set (update fields)
        if (update.$set) {
            Object.entries(update.$set).forEach(([key, value]) => {
                // Handle nested keys like 'address.city'
                if (key.includes('.')) {
                    const [parent, child] = key.split('.');
                    user[parent] = { ...user[parent], [child]: value };
                } else {
                    user[key] = value;
                }
            });
        }

        users[index] = user;
        return options.new ? user : users[index];
    },

    // Chainable .populate() — returns the user with games populated
    findById_populate: async (id) => {
        const user = users.find(u => u._id === id) || null;
        return populateGames(user);
    },

    find_populate: async () => {
        return users.map(populateGames);
    }
};

module.exports = UserModel;

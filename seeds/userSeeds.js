const { User } = require('../models');

const userData = [
    {
        name: "Ash Parihar",
        email: "ash@testing.com"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
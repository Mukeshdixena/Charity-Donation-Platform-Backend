const { Sequelize } = require('sequelize');

const sequelize = require('../util/database.js');

const Donation = sequelize.define(
    'Donation',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        amountDonated: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    }
);
module.exports = Donation;

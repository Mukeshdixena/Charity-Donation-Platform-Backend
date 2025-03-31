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
        paymentId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amountDonated: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        charityOrgId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

    }
);
module.exports = Donation;

const { Sequelize } = require('sequelize');

const sequelize = require('../util/database.js');

const CharityOrg = sequelize.define(
    'CharityOrg',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        requiredAmount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },

    }
);
module.exports = CharityOrg;

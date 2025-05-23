const CharityOrg = require('../models/charityOrg.js');
const { Sequelize } = require('sequelize');

exports.getCharityOrgs = async (req, res, next) => {
    const thisCharityOrgs = await CharityOrg.findAll()
    if (!thisCharityOrgs) {
        return res.status(404).json({ message: 'CharityOrg not found' });
    }
    res.status(200).json(thisCharityOrgs);
};


exports.getCharityOrgById = async (req, res, next) => {
    const { charityOrgId } = req.params;
    console.log("charity by id : ", charityOrgId);
    const thisCharityOrg = await CharityOrg.findByPk(charityOrgId)

    if (!thisCharityOrg) {
        return res.status(404).json({ message: 'CharityOrg not found' });
    }
    res.status(200).json(thisCharityOrg);

};

exports.postCharityOrg = async (req, res, next) => {
    try {

        const { name, description, requiredAmount, category, location } = req.body;


        const newCharityOrg = await CharityOrg.create({
            name, description, requiredAmount, category, location
        });
        res.status(201).json(newCharityOrg);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
exports.postCharityOrgVerified = async (req, res, next) => {
    try {
        const { charityOrgId } = req.params;

        console.log(charityOrgId)


        if (!charityOrgId) {
            return res.status(400).json({ message: 'not found' });
        }

        const charityOrgRecord = await CharityOrg.findByPk(charityOrgId);
        if (!charityOrgRecord) {
            return res.status(404).json({ message: 'charityOrg not found' });
        }

        const updatedCharityOrg = await charityOrgRecord.update({ isVerified: true });
        res.status(200).json(updatedCharityOrg);
    } catch (err) {
        res.status(500).json({ message: 'Error updating charityOrg', error: err });
    }
};



exports.deleteCharityOrg = async (req, res, next) => {
    try {
        const { CharityOrgId } = req.params;

        if (!CharityOrgId) {
            return res.status(400).json({ message: 'CharityOrgId is required' });
        }

        const charityOrgRecord = await CharityOrg.findByPk(CharityOrgId);
        if (!charityOrgRecord) {
            return res.status(404).json({ message: 'charityOrg not found' });
        }

        await charityOrgRecord.destroy();
        res.status(200).json({ message: 'charityOrg deleted successfully' });
    } catch (err) {
        console.error('Error deleting charityOrg:', err);
        res.status(500).json({ message: 'Error deleting charityOrg', error: err });
    }
};

exports.editCharityOrg = async (req, res, next) => {
    try {
        const { CharityOrgId } = req.params;
        const { name, description, requiredAmount, category, location } = req.body;

        if (!CharityOrgId) {
            return res.status(400).json({ message: 'not found' });
        }

        const charityOrgRecord = await CharityOrg.findByPk(CharityOrgId);
        if (!charityOrgRecord) {
            return res.status(404).json({ message: 'charityOrg not found' });
        }

        const updatedCharityOrg = await charityOrgRecord.update({ name, description, requiredAmount, category, location });
        res.status(200).json(updatedCharityOrg);
    } catch (err) {
        res.status(500).json({ message: 'Error updating charityOrg', error: err });
    }
};

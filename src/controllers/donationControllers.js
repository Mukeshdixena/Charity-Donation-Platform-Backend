const donation = require('../models/donation.js');
const { Sequelize } = require('sequelize');

exports.getDonations = async (req, res, next) => {
    const thisDonations = await donation.findAll()
    if (!thisDonations) {
        return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(thisDonations);
};


exports.getDonationById = async (req, res, next) => {
    const { donationId } = req.params;
    const thisDonation = await donation.findByPk(donationId)

    if (!thisDonation) {
        return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(thisDonation);

};

exports.getDonationByUser = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const thisDonation = await donation.findAll({
            where: { userId: userId }
        });

        if (thisDonation.length === 0) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json(thisDonation);
    } catch (error) {
        next(error);
    }
};

exports.getDonationByUser = async (req, res, next) => {
    const charityOrgId = req.params;

    try {
        const thisDonation = await donation.findAll({
            where: { charityOrgId: charityOrgId }
        });

        if (thisDonation.length === 0) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json(thisDonation);
    } catch (error) {
        next(error);
    }
};


exports.postDonation = async (req, res, next) => {
    try {

        const userId = req.user.id;

        const { amountDonated, charityOrgId } = req.body;

        const newDonation = await donation.create({
            amountDonated, charityOrgId, userId
        });
        res.status(201).json(newDonation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};


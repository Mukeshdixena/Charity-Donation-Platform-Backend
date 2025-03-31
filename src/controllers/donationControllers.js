const CharityOrg = require('../models/charityOrg.js');
const donation = require('../models/donation.js');
const { Sequelize } = require('sequelize');

const { uploadToS3 } = require('../service/awsS3Service');

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

        res.status(200).json(thisDonation);
    } catch (error) {
        next(error);
    }
};

exports.getDonationByCharityOrg = async (req, res, next) => {
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
        const { paymentId, amountDonated, charityOrgId } = req.body;

        const charityOrg = await CharityOrg.findByPk(charityOrgId);

        if (!charityOrg) {
            return res.status(404).json({ message: 'Charity organization not found!' });
        }

        const newDonation = await donation.create({
            paymentId,
            amountDonated,
            charityOrgId,
            userId
        });

        charityOrg.requiredAmount -= amountDonated;
        await charityOrg.save();
        res.status(201).json(newDonation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

exports.getDonationFile = async (req, res, next) => {
    try {
        const donations = await donation.findAll({ where: { UserId: req.user.id } });

        if (!donations.length) {
            return res.status(404).json({ message: 'No donations found', success: false });
        }

        const stringifiedExpenses = JSON.stringify(donations, null, 2);
        const userId = req.user.id;
        const fileName = `Donation_${userId}_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;

        const fileUrl = await uploadToS3(stringifiedExpenses, fileName);
        if (!fileUrl) throw new Error("Failed to upload file to S3");

        console.log({ FileUrl: fileUrl, UserId: userId });

        res.status(200).json({ fileUrl, success: true });
    } catch (error) {
        console.error("Error generating expense file:", error);
        res.status(500).json({ message: 'Something went wrong!', success: false });
    }
};

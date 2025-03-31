const User = require('../models/user.js');
const Password = require('../models/passwords');
const { Sequelize } = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
function generateAccestoken(id, name) {
    return jwt.sign({ UserId: id, name: name }, process.env.PRIVET_KEY)
}
exports.getUser = async (req, res, next) => {
    const thisUsers = await User.findAll()
    if (!thisUsers) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisUsers);
};


exports.getUserById = async (req, res, next) => {
    const thisUser = await User.findByPk(req.user.id)

    if (!thisUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(thisUser);

};

exports.postUser = async (req, res, next) => {
    try {
        const { username, email, contact, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            contact,
            password: hashedPassword
        });

        await Password.create({ hashedPassword, UserId: newUser.id });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};



exports.deleteUser = (req, res, next) => {
    const { UserId } = req.params;

    if (!UserId) {
        return res.status(400).json({ message: 'UserId is required' });
    }


    User.findByPk(UserId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            return user.destroy();
        })
        .then(() => {
            res.status(200).json({ message: 'user deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ message: 'Error deleting user', error: err });
        });
};

exports.editUser = async (req, res, next) => {
    try {
        const { username, email, contact } = req.body;



        if (!req.user.id) {
            return res.status(400).json({ message: 'not found' });
        }

        const userRecord = await User.findByPk(req.user.id);
        if (!userRecord) {
            return res.status(404).json({ message: 'user not found' });
        }

        const updatedUser = await userRecord.update({ username, email, contact });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const currUser = await User.findOne({ where: { email } });
        if (!currUser) {
            return res.json({ success: false, message: 'Email not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, currUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect password' });
        }

        res.json({ success: true, message: 'Login successful', token: generateAccestoken(currUser.id, currUser.name) });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



exports.postUserPass = async (req, res, next) => {
    try {
        const { emailId, newPassword } = req.body;

        console.log(emailId, newPassword);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const currUser = await User.findOne({ where: { email: emailId } });

        if (!currUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currUserPass = await Password.findAll({ where: { UserId: currUser.id } });

        for (const currPass of currUserPass) {
            const isMatch = await bcrypt.compare(newPassword, currPass.hashedPassword);
            if (isMatch) {
                return res.json({ success: false, message: 'This password already exists, please choose another' });
            }
        }

        await Password.create({ hashedPassword, UserId: currUser.id });
        await currUser.update({ password: hashedPassword });

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

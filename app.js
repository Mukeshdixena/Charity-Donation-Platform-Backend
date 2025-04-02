require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./src/models/user.js')
const CharityOrg = require('./src/models/charityOrg.js')
const Donation = require('./src/models/donation.js')
const Passwords = require('./src/models/passwords.js')

const sequelize = require('./src/util/database.js');

const userRouter = require('./src/router/userRouter.js');
const charityOrgRouter = require('./src/router/charityOrgRouter.js');
const paymentService = require('./src/router/paymentService.js');
const donationRouter = require('./src/router/donationRouter.js');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


app.use(userRouter);
app.use(donationRouter);
app.use(paymentService);
app.use(charityOrgRouter);


User.hasMany(Passwords);
Passwords.belongsTo(User);

app.get("/", (req, res) => {
    res.send("jenkins Development, Express!");
});

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));

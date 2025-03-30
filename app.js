const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const User = require('./src/models/user.js')
const CharityOrg = require('./src/models/charityOrg.js')
const Donation = require('./src/models/donation.js')


require('dotenv').config();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const sequelize = require('./src/util/database.js');

const userRouter = require('./src/router/userRouter.js');
const charityOrgRouter = require('./src/router/charityOrgRouter.js');
const paymentService = require('./src/router/paymentService.js');

app.use(userRouter);
app.use(paymentService);
app.use(charityOrgRouter);

User.belongsToMany(CharityOrg, { through: Donation });
CharityOrg.belongsToMany(User, { through: Donation });



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

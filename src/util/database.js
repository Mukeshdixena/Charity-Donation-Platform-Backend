const { Sequelize } = require('sequelize');

const mysql = require('mysql2/promise');

require('dotenv').config();

async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\`;`);
    console.log(`Database '${process.env.DATABASE_NAME}' is ready.`);
    await connection.end();
}

(async () => {
    await createDatabase();
})();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Connected to the database.'))
    .catch(err => console.error('Database connection failed:', err));

module.exports = sequelize;

const Pool = require("pg").Pool;
// Establish a connection to the database with required parameters.
const pool = new Pool({
    user:"postgres",
    password:"qwe123",
    database:"cooking",
    host:"localhost",
    port:"5432"
});

module.exports = pool;
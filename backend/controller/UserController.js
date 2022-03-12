const pool = require("../configuration/database");
const bcrypt = require('bcrypt');
// Contains all the logic for users needed to get, update or delete the correct data from the database.
// getAllUsers gets all the users data from the database.
exports.getAllUsers = async (req, res, next) => {
    try {
        const getAllUsers = await pool.query(
            "SELECT * FROM users"
        );
        res.json(getAllUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
};
// getSpecificUser gets the specific user data from the database based on the user ID.
exports.getSpecificUser = async (req, res, next) => {
    try {
        const getSpecificUser = await pool.query(
            "SELECT * FROM users WHERE id = $1", [req.params.id],
        );
        res.json(getSpecificUser.rows)
    } catch (err) {
        console.error(err.message);
    }
};
// postNewUser inserts a new user into the database.
// Before inserting a new user into the database, the uniqueUser check has been made, to check if the database already has a user email like that.
// If the user data is new, then the password will be encrypted with Bcrypt and the user will be inserted into the database.
exports.postNewUser = async (req, res, next) => {
    const { f_name, l_name, email, password, role } = req.body;
    try {
        const uniqueUser = await pool.query("SELECT * FROM users where email =$1", [email]);
        if (uniqueUser.rows.length > 0) {
            return res.status(401).json("User allready exists");
        }
        var bcryptPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users(f_name, l_name, email, password, role)VALUES($1, $2, $3, $4, $5) RETURNING *",
            [f_name, l_name, email, bcryptPassword, role]
        );
        return res.json({ newUser });

    } catch (err) {
        console.error(err.message);
    }
};
// login checks if the user exist email exists in the database and compares the inserted password to the one that is in the database.
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email],
        );
        if (user.rows.length === 0) {
            return res.status(401).json('Wrong email');
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        
        const accountrole = user.rows[0].role
        if (!validPassword) {
            return res.status(401).json('something is broken')
        }
        return res.json({ accountrole })
    } catch (err) {
        console.error(err.message)
    }
};
// editUser updates an existing user with new values, that will be coming the frontend.
exports.editUser = async (req, res) => {
    const { f_name, l_name, email, password } = req.body;
    var bcryptPassword = await bcrypt.hash(password, 10);
    try {
        const editUser = await pool.query(
            "UPDATE users SET f_name = $2, l_name = $3, email= $4, password = $5 WHERE id = $1",
            [req.params.id, f_name, l_name, email, bcryptPassword]
        );
        res.json(editUser.rows)
    } catch (err) {
        console.error(err.message);
    }
};
// deleteUser deletes an existing article based on the ID of the user.
exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await pool.query(
            "DELETE FROM users WHERE id = $1",
            [req.params.id]
        );
        res.json(deleteUser.rows)
    } catch (err) {
        console.error(err.message);
    }
};
// getLoggedInUserData gets the data of the user based on the email of the user.
exports.getLoggedInUserData = async (req, res) => {
    try {
        const getUser = await pool.query(
            "SELECT * FROM users WHERE email = $1", [req.params.email]
        );
        res.json(getUser.rows)
    } catch (err) {
        console.error(err.message);
    }
};

exports.getSpecificPetForUser = async (req, res) => {
    try {
        const getSpecificPetForUser = await pool.query(
            "SELECT * FROM users WHERE email = $1", [req.params.email]
        );
        const information = getSpecificPetForUser.rows[0].f_pet_id
        try{
            const getPetInformation = await pool.query("SELECT * FROM pets WHERE pet_id = $1", [information]
            );
            res.json(getPetInformation.rows)
        } catch(err){
            console.error(err.message)
        }
    } catch (err) {
        console.error(err.message);
    }
};
const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// userRoutes, contains all the routes for the user functions.
router.get('/getall', controller.getAllUsers);
router.get('/user/:id', cors(), controller.getSpecificUser);
router.post('/newuser', cors(), controller.postNewUser);
router.post('/login', cors(), controller.login);
router.put('/edit/:id', cors(), controller.editUser);
router.delete('/delete/:id', cors(), controller.deleteUser);
router.get('/user/login/:email', cors(), controller.getLoggedInUserData);
module.exports = router;

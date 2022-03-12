const express = require('express');
const router = express.Router();
const controller = require('../controller/RecipesController');
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// userRoutes, contains all the routes for the user functions.
router.get('/all', cors(), controller.getAllRecipes);
router.post('/newrecipe', cors(), controller.postNewRecipe);

module.exports = router;

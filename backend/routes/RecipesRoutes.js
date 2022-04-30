const express = require('express');
const router = express.Router();
const controller = require('../controller/RecipesController');
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

router.get('/all', cors(), controller.getAllRecipes);
router.post('/newrecipe', cors(), controller.postNewRecipe);
router.post('/items', cors(), controller.specificRecipeItems);
router.post('/basket/yes', cors(), controller.gettingBasketItems);
router.post('/basket/savetohistory', cors(), controller.newHistory);
router.post('/basket/gethistory', cors(), controller.getHistory);

module.exports = router;

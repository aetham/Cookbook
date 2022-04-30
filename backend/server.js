const express = require("express");
const cors = require("cors");
const pool = require("./configuration/database");
const users = require("./routes/UserRoutes");
const recipes = require("./routes/RecipesRoutes");
const ingredients = require("./routes/IngredientsRoutes");
const { json } = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Enable for all cors requests.
// Look up for more info https://github.com/expressjs/cors
// The routes and business logic has been divided into three parts.
// It has been made so, that more routes and logic could be more easily managed.
app.use(cors())
app.use('/users', users);
app.use('/recipes', recipes);
app.use('/ingredients', ingredients);

//For testing.
app.get('/test', function (req, res) {
  res.send('testing')
})

app.listen(port, () => {
  console.log('Server is running on port:' + port);
})

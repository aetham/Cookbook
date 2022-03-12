const pool = require("../configuration/database");

exports.getAllRecipes = async (res) => {
    try {
        const getAllRecipes = await pool.query(
            "SELECT * FROM recipes"
        );
        res.json(getAllRecipes.rows);
    } catch (err) {
        console.error(err.message);
    }
};

exports.postNewRecipe = async (req, res, next) => {
    const { id, name, price, description } = req.body;
    try {
        const NewRecipe = await pool.query(
            "INSERT INTO recipes(id, name, price, description) VALUES($1, $2, $3, $4) RETURNING *",
            [id, name, price, description]
        );
        return res.json({ NewRecipe });
    } catch (err) {
        console.error(err.message);
    }
};


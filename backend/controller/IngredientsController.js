const pool = require("../configuration/database");

exports.getAllIngredients = async (req, res, next) => {
    try {
        const getAllIngredients = await pool.query(
            "SELECT * FROM ingredients"
        );
        res.json(getAllIngredients.rows);
    } catch (err) {
        console.error(err.message);
    }
};

exports.postNewIngredient = async (req, res, next) => {
    const { name, price, image, category, weight, weighttype} = req.body
        try {
        const postNewIngredient = await pool.query(
            "INSERT INTO ingredients(name, price, image, category, weight, weighttype)VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, price, image, category, weight, weighttype]
        );
        res.json({ postNewIngredient });
    } catch (err) {
        console.error(err.message);
    }
};

const pool = require("../configuration/database");


exports.getAllRecipes = async (req, res, next) => {
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
    const { name, description, price, secondprice} = req.body;
    var arr = req.body.array
    try {
        const newRecipe = await pool.query(
            "INSERT INTO recipes(name, description, price, secondprice) VALUES($1, $2, $3, $4) RETURNING *",
            [name, description, price, secondprice]
        );
        const recipe_id = newRecipe.rows[0].id
        for (let i = 0; i < arr.length; i++) {
            await pool.query(
                "INSERT INTO recipes_ingredients(food_id, recipes_id) VALUES($1, $2) RETURNING *",
                [arr[i].food_id, recipe_id]
            );
        }
        res.json('done');
    } catch (err) {
        console.error(err.message);
    }
};

exports.specificRecipeItems = async (req, res, next) => {
    const { id } = req.body;
    var results = []
    try {
        const getRecipeItems = await pool.query(
            "SELECT * FROM recipes_ingredients WHERE recipes_id = $1",
            [id]
        );
        for (let i = 0; i < getRecipeItems.rows.length; i++) {
            const newRecipeIngredients = await pool.query(
                "SELECT * FROM ingredients where id=$1",
                [getRecipeItems.rows[i].food_id]
            );
            results.push(newRecipeIngredients.rows)
            if (i == getRecipeItems.rows.length - 1) {
                res.json(results)
            }
        }
    } catch (err) {
        console.error(err.message);
    }
};

exports.gettingBasketItems = async (req, res, next) => {
    var arr = []
    var food = []
    try {
        for (let i = 0; i < req.body.array.length; i++) {
            const gettingBasketItems = await pool.query(
                "SELECT * FROM recipes_ingredients WHERE recipes_id = $1", [req.body.array[i].recipe_id]
            );
            arr.push(gettingBasketItems.rows)
        }
        for (let i = 0; i < arr.length; i++) {
            var cube = arr[i]
            for (let b = 0; b < cube.length; b++) {
                const getIngredients = await pool.query(
                    "SELECT * FROM ingredients WHERE id =$1", [cube[b].food_id]
                )
                food.push(getIngredients.rows[0])
            }
        }
        res.json(food)
    } catch (err) {
        console.error(err.message);
    }
};

exports.newHistory = async (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    try {
        const getUserID = await pool.query(
            "SELECT id FROM users WHERE email = $1", [req.body.email]
        )
        var userID = getUserID.rows[0].id
        for (let i = 0; i < req.body.array.length; i++) {
            await pool.query(
                "INSERT INTO basket(food_id, user_id, date) VALUES($1, $2, $3)",
                [req.body.array[i].id, userID, today]
            );
        }
        res.json('done')
    } catch (err) {
        console.log(err)
    }

};
exports.getHistory = async (req, res, next) => {
    var arr = []
    var alldates = []
    var superarray = []
    try {
        const getUserId = await pool.query(
            "SELECT * FROm users where email = $1",
            [req.body.name]
        )
        var userId = getUserId.rows[0].id

        const getHistory = await pool.query(
            "SELECT * FROM basket WHERE user_id = $1",
            [userId]
        )
        var foodId = getHistory.rows

        for (let i = 0; i < foodId.length; i++) {
            const getDates = await pool.query(
                "SELECT * FROM basket WHERE user_id = $1",
                [userId]
            )
            alldates.push(getDates.rows[i].date)
        }

        for (let i = 0; i < foodId.length; i++) {
            const getFood = await pool.query(
                "SELECT * FROM ingredients where id =$1 ", [foodId[i].food_id]
            )
            arr.push(getFood.rows[0])
        }

        for (let c = 0; c < arr.length; c++) {
            const testing = {
                id: arr[c].id,
                name: arr[c].name,
                price: arr[c].price,
                image: arr[c].image,
                category: arr[c].category,
                weight: arr[c].weight,
                weighttype: arr[c].weighttype,
                date: alldates[c]
            }
            superarray.push(testing)
        }
        const payload = {
            array: superarray
        }

        res.json(payload)
    } catch (err) {
        console.log(err)
    }
}
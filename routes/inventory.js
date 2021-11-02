const express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.use(express.json());

//View inventory
router.get("/inventory", (req, response) => {
    sql =
    'SELECT `Ingredients` FROM `Recipe_Ingredient`';
  
    con.query(sql.replace("\n", " "), (err, res) => {
      if (err) {
        response.status(400);
        response.send(err);
      } else {
        response.send(res);
      }
    });
  });


//Add Inventory
router.post("/inventory", (req, response) => {
    var reqBody = req.body;
    const ingredient = reqBody.Ingredient;
  
    var sql =
        'INSERT INTO `Inventory` \
    (Ingredient) \
    VALUES \
    (' + con.escape(ingredient) + ')';
  
    con.query(sql, function (err, result) {
        if (err) {
            response.send("Did not successfully add ingredient to database");
        } else {
            response.send("Successfully added ingredient into database");
        }
    });
  });

module.exports = router;

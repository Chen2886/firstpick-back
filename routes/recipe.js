var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.get("/recipes", (req, response) => {
    sql =
      "SELECT * FROM `Recipe` JOIN `Recipe_Ingredient` \
    ON `Recipe`.Recipe_ID = `Recipe_Ingredient`.Recipe_ID"; 
    
  
    con.query(sql.replace("\n", " "), (err, res) => {
      if (err) {
        response.status(400);
        response.send(err);
      } else {
        response.send(res);
      }
    });
  });

  //ADD

  router.post("/recipes", (req, response) => {
    var reqBody = req.body;
    const id = reqBody.Recipe_ID;
    const price = reqBody.Price;
    const name = reqBody.Name;

    var sql =
        'INSERT INTO `Recipe` \
    (Recipe_ID, Price, Name) \
    VALUES \
    (' + con.escape(id) + ', \
    ' + con.escape(price) + ', \
    ' + con.escape(name) + ')';

    con.query(sql, function (err, result) {
        if (err) {
            response.send("sad uwu");
        } else {
            response.send("happy uwu");
        }
    });
});

//DELETE

/*router.post("/recipes", (req, response) => {
    var reqBody = req.body;
    const id = reqBody.Recipe_ID;
    const price = reqBody.Price;
    const name = reqBody.Name;

    var sql =
        'INSERT INTO `Recipe` \
    (Recipe_ID, Price, Name) \
    VALUES \
    (' + con.escape(id) + ', \
    ' + con.escape(price) + ', \
    ' + con.escape(name) + ')';

    con.query(sql, function (err, result) {
        if (err) {
            response.send("sad uwu");
        } else {
            response.send("happy uwu");
        }
    });
});*/
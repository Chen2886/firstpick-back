var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.get("/recipe", (req, response) => {

    var sql =
        "SELECT B.Name, B.Price, B.Recipe_ID \
      FROM Recipe B";

    con.query(sql.replace("\n", " "), (err, res) => {
        if (err) {
            response.status(400);
            response.send(err);
        } else {
            response.send(res);
        }
    });
});


router.get("/ingredient", (req, response) => {
    var sql = "SELECT A.Ingredients FROM Recipe_Ingredient A WHERE A.Recipe_ID = ?";
    //console.log("recipe id being passed in: " + req.query.Recipe_ID);
    con.query(sql, [req.query.Recipe_ID], (err, res) =>
        sendPacket(err, res, response)
    );
});



//ADD

router.post("/recipe", (req, response) => {
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

//UPDATE

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

sendPacket = (err, res, response) => {
    if (err) {
        response.status(400);
        response.send(err);
    } else {
        response.send(res);
    }
};

module.exports = router;
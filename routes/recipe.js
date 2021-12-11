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

router.get("/allIngredients", (req, response) => {
    var sql = "SELECT DISTINCT A.Ingredients FROM Recipe_Ingredient A";
    con.query(sql.replace("\n", " "), (err, res) => {
        sendPacket(err, res, response)
    });
});

router.get("/numRecipes", (req, response) => {
    var sql = "SELECT COUNT(*) AS c FROM Recipe";
    con.query(sql.replace("\n", " "), (err, res) => {
        sendPacket(err, res, response)
    });
});

router.get("/numIngredients", (req, response) => {
    var sql = "SELECT COUNT(*) AS c FROM Recipe_Ingredient";
    con.query(sql.replace("\n", " "), (err, res) => {
        sendPacket(err, res, response)
    });
});



//ADD

/*router.post("/recipe", (req, response) => {
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

    router.post("/recipe", async (req, response) => {
        //var reqBody = req.body;
        //var sql = "INSERT INTO `Recipe` (Recipe_ID, Price, Name) VALUES (?,?,?)";
        var sql =
            'INSERT INTO `Recipe` \
    (Recipe_ID, Price, Name) \
    VALUES \
    (' + con.escape(req.body.Recipe_ID) + ', \
    ' + con.escape(req.body.Price) + ', \
    ' + con.escape(req.body.Name) + ')';


        con.query(sql.replace("\n", " "), (err, res) => {
            sendPacket(err, res, response)
        });
    });
  

  router.post("/ingredient", async (req, response) => {

    /*console.log("RIID:" + req.body.Recipe_Ingredient_ID);
    console.log("RID:" + req.body.Recipe_ID);
    console.log("I:" + req.body.Ingredients);
    console.log("A:" + req.body.Amount);*/

    var sql =
      'INSERT INTO `Recipe_Ingredient` (Recipe_Ingredient_ID ,Recipe_ID, Ingredients, Amount) \
      VALUES \
      (' + con.escape(req.body.Recipe_Ingredient_ID) + ', \
    ' + con.escape(req.body.Recipe_ID) + ', \
    ' + con.escape(req.body.Ingredients) + ', \
    ' + con.escape(req.body.Amount) + ')';

    con.query(sql.replace("\n", " "), (err, res) => {
        sendPacket(err, res, response)
    });
  });

  router.delete("/recipe", (req, response) => {
      //console.log("rec id :" + req.body.Recipe_ID);
    var sql = 'DELETE FROM Recipe WHERE Recipe_ID = ' + req.body.Recipe_ID;
    con.query(sql, [req.body.Recipe_ID], (err, res) => {
        sendPacket(err, res, response);
      });
  });

  router.delete("/ingredient", (req, response) => {

  var sql = 'DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ' + req.body.Recipe_ID;
  con.query(sql, [req.body.Recipe_ID], (err, res) => {
      sendPacket(err, res, response);
    });
});

//UPDATE

router.put("/recipe", async (req, response) => {
    //console.log("rec id ingredient :" + req.body.Recipe_ID);
    /*console.log(req.body.Recipe_ID);
    console.log(req.body.Price);
    console.log(req.body.Name);*/
  var sql = 'UPDATE Recipe SET Price = ? , Name = ?  WHERE Recipe_ID = ?';

  con.query(sql, [req.body.Price, req.body.Name, req.body.Recipe_ID], (err, res) => {
    sendPacket(err, res, response);
  });
});

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
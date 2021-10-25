const express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});
router.use(express.json());
router.use(express.urlencoded());

router.get("/customers", (req, response) => {
    sql =
        'SELECT `First_Name`, `Last_Name`, `Age`, `Email`, `Phone_Number` \
    FROM `Customer`';

    con.query(sql.replace("\n", " "), (err, res) => {
        if (err) {
            response.status(400);
            response.send(err);
        } else {
            response.send(res);
        }
    });
});

router.post("/customers", (req, response) => {
    var reqBody = req.body;
    const fn = reqBody.First_Name;
    const ln = reqBody.Last_Name;
    const age = reqBody.Age;
    const email = reqBody.Email;
    const phone = reqBody.Phone_Number;

    var sql =
        'INSERT INTO `Customer` \
    (First_Name, Last_Name, Age, Email, Phone_Number) \
    VALUES \
    (' + con.escape(fn) + ', \
    ' + con.escape(ln) + ', \
    ' + con.escape(age) + ', \
    ' + con.escape(email) + ', \
    ' + con.escape(phone) + ')';

    con.query(sql, function (err, result) {
        if (err) {
            response.send("An error occurred you did bad");
        } else {
            response.send("Hooray successfully inserted into DB you're a genius");
        }
    });
});

module.exports = router;
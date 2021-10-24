var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.get("/orders", (req, response) => {
  sql =
    "SELECT * FROM `Order`, `Order_Customer`, `Customer` \
  WHERE `Order`.Order_ID = `Order_Customer`.Order_ID \
  AND `Order_Customer`.Customer_ID = `Customer`.Customer_ID";

  con.query(sql.replace("\n", " "), (err, res) => {
    if (err) {
      response.status(400);
      response.send(err);
    } else {
      response.send(res);
    }
  });
});

module.exports = router;

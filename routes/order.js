var express = require("express");
var router = express.Router();
const con = require("../sqlConnection");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

router.get("/orders", (req, response) => {
  sql =
    "SELECT  o.Order_ID, o.Date, c.First_Name, c.Last_Name, r.Name, r.Price\
  FROM `Order` o, `Order_Customer` oc, `Customer` c, `Recipe` r \
  WHERE o.Order_ID = oc.Order_ID \
  AND oc.Customer_ID = c.Customer_ID \
  AND o.Recipe_ID = r.Recipe_ID\
  ";

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
